# Account confirmation email

Template: `confirm-signup.html`. This file is the source for Supabase's **Confirm signup** email, not an email that the frontend sends itself.

## Required hosted settings

Project: `qarfgpzicxooywztgopg`.

In Authentication → URL Configuration:

- Site URL: `https://wagstack.brickand.bond/`
- Add the exact redirect URL `https://wagstack.brickand.bond/auth/confirm.html` to the allowlist. Preserve existing required URLs.

In Authentication → Email → SMTP settings:

- Sender email: `hello@brickand.bond`
- Sender name: `WagStack by Brick & Bond`
- Use the domain's authorized SMTP provider and its securely supplied credentials. Verify the sender/domain and configure the provider's required DNS authentication. Do not put SMTP credentials in this repository or frontend.
- Disable email link tracking for authentication emails where the provider offers it.

In Authentication → Email → Confirm signup:

- Subject: `Confirm your email for WagStack`
- Body: contents of `confirm-signup.html`.
- Keep account email confirmation enabled.

The template links to the production callback with Supabase's `TokenHash` in the fragment. The page removes the fragment and only verifies after the recipient presses **Confirm email**, preventing ordinary link prefetch from consuming the one-use token. The callback also accepts Supabase's existing implicit signup responses and validates the access token against the project's `/auth/v1/user` endpoint before storing a session. Signup and resend requests explicitly set the production redirect URL.

Old emails may retain localhost links or already-expired tokens. Request a new email after applying the hosted settings. Confirm live delivery and the full flow using a recipient authorized for testing; local QA uses intercepted Auth API responses and sends no emails.

References: [Email templates](https://supabase.com/docs/guides/auth/auth-email-templates), [redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls), [custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp).
