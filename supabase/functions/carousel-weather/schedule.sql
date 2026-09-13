-- Secret stays in Vault; only the SHA-256 digest is accessible to the worker.
select cron.schedule('wagstack-quezon-city-weather', '7,17,27,37,47,57 * * * *', $job$
 select net.http_post(
  url := 'https://qarfgpzicxooywztgopg.supabase.co/functions/v1/carousel-weather',
  headers := jsonb_build_object('Content-Type','application/json','x-weather-job',(select decrypted_secret from vault.decrypted_secrets where name='wagstack_weather_job_token')),
  body := '{}'::jsonb, timeout_milliseconds := 30000
 );
$job$);
