// Forecast estimates for Quezon City, not station observations or official alerts.
export function snapshot(forecast, now = Date.now()) {
  const meta = forecast?.properties?.meta;
  if (!meta || now - Date.parse(meta.updated_at) > 12 * 3600e3) throw new Error('Forecast feed is stale');
  const rows = forecast.properties.timeseries || [];
  const row = rows.filter(r => Date.parse(r.time) <= now).at(-1) || rows[0];
  if (!row || Math.abs(now - Date.parse(row.time)) > 90 * 60e3) throw new Error('No fresh hourly forecast');
  const details = row.data.instant.details;
  const hour = row.data.next_1_hours;
  if (!hour) throw new Error('Hourly forecast is missing');
  const temperature = details.air_temperature;
  const wind = Math.round(details.wind_speed * 3.6);
  const rain = hour.details.precipitation_amount;
  if (![temperature, wind, rain].every(Number.isFinite)) throw new Error('Incomplete weather readings');
  const symbol = String(hour.summary.symbol_code);
  const rainLevel = /thunder/.test(symbol) ? 3 : rain >= 4 ? 2 : rain >= .2 ? 1 : 0;
  return { temperature, wind, rain, rainLevel, windy: wind >= 35, hot: temperature >= 32,
    condition: rainLevel === 3 ? 'Thunderstorms' : rainLevel === 2 ? 'Heavy rain' : rainLevel === 1 ? 'Rain expected' : /fog/.test(symbol) ? 'Foggy' : /cloud/.test(symbol) ? 'Cloudy skies' : 'Clear skies',
    forecastAt: row.time, sourceUpdatedAt: meta.updated_at, checkedAt: new Date(now).toISOString() };
}
export function decide(previous, current, recent = [], candidate = null, now = Date.now()) {
  if (!previous) return { publish: true, reason: 'First forecast', candidate: null };
  // Hysteresis keeps tiny oscillations from repeatedly publishing a card.
  const hot = previous.hot ? current.temperature >= 30 : current.temperature >= 32;
  const windy = previous.windy ? current.wind >= 25 : current.wind >= 35;
  current = { ...current, hot, windy };
  const escalation = current.rainLevel > previous.rainLevel || (hot && !previous.hot) || (windy && !previous.windy);
  const sharp = recent.some(r => {
    const age = now - Date.parse(r.checkedAt);
    return age > 0 && age <= 65 * 60e3 && r.forecastAt !== current.forecastAt && Math.abs(current.temperature - r.temperature) >= 3;
  }) && Math.abs(current.temperature - previous.temperature) >= 3;
  if (escalation || sharp) return { publish: true, reason: sharp ? 'Temperature shifted' : 'Conditions changed', candidate: null, current };
  const recovery = current.rainLevel < previous.rainLevel || hot !== previous.hot || windy !== previous.windy;
  if (!recovery) return { publish: false, candidate: null, current };
  const key = [current.rainLevel, hot, windy].join(':');
  if (candidate?.key === key && now - Date.parse(candidate.since) >= 9 * 60e3) return { publish: true, reason: 'Conditions easing', candidate: null, current };
  return { publish: false, candidate: candidate?.key === key ? candidate : { key, since: new Date(now).toISOString() }, current };
}
