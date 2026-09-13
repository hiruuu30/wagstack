// Support confirmation emails that return to the app root instead of the callback.
(() => {
  const params = new URLSearchParams(location.hash.slice(1));
  if (['access_token', 'refresh_token', 'token_hash', 'error_code', 'error_description'].some(key => params.has(key))) {
    location.replace('/auth/confirm.html' + location.hash);
  }
})();
