# Website enquiry safeguards

The website forwards accepted enquiries through the configured Hostinger SMTP mailbox. These application controls take effect when the updated **server and frontend are deployed**. They do not change Hostinger mailbox filters or protect a separately hosted Nexus application.

## Controls enabled by default

- Honeypot fields on contact, newsletter, Nexus demo and assessment forms. Filled traps are acknowledged without saving an enquiry or sending mail.
- Server-side validation and rejection of header control characters, links in identity fields, active link markup, link floods, credential requests, common prize/account phishing patterns, and executable download links. Messages may contain up to two ordinary reference links. These are conservative heuristics, not a guarantee that a sender is honest.
- MongoDB-backed atomic sliding windows shared across all four forms: five submissions per IP/network per hour and three per sender per hour. IPv6 addresses are grouped by /64. Sender quotas group plus aliases and Gmail dot/googlemail aliases, while delivery preserves the submitted address.
- Duplicate contact/demo messages and identical assessment summaries from the same sender are suppressed for 24 hours, including simultaneous submissions. Reservations are released if saving the enquiry fails. Quotas count attempts; retries do not bypass them.
- At most one automatic email per recipient per hour across the contact, demo and assessment routes. Owner notifications for otherwise accepted follow-up enquiries continue. A requested assessment email that hits this cooldown returns an explicit retry message rather than claiming it was sent.
- Contact/demo acknowledgements contain fixed copy, without reflected visitor names or message bodies. Assessment emails use server-owned dimension labels; invented/duplicate dimensions are rejected.
- Notification HTML escapes visitor input, uses the configured mailbox as the sender, and marks the visitor identity as unverified. Nexus notifications include an access-review reminder. SMTP requires encryption, with connection timeouts and automatic-response headers on visitor mail.
- Public direct connections cannot spoof the client IP using forwarded headers. The direct VPS setup trusts loopback Nginx; Docker production explicitly trusts its private proxy network. Keep the Node port private and configure `TRUST_PROXY` for the actual proxy path if the hosting topology changes.
- A guard database failure stops submission processing before SMTP delivery. Counters contain hashed keys and timestamps rather than message bodies or raw email/IP addresses. A TTL index removes expired counters; enforcement checks timestamps without relying on the cleanup schedule.

The existing production API/request rate limits also remain active. Content rejections return HTTP 422; quota/duplicate rejections return HTTP 429 with retry guidance, shown in the form while preserving entered details. A bot that skips the honeypot, a distributed low-volume campaign, or a human scammer can still get through. Layered controls follow [OWASP's anti-automation guidance](https://cheatsheetseries.owasp.org/cheatsheets/Bot_Management_and_Anti-Automation_Cheat_Sheet.html).

## Specific senders

`FORM_BLOCKED_SENDERS` accepts comma-separated exact email addresses or domains, including subdomains. Set it in `server/.env` for a direct VPS installation, or the root `.env` for production Docker, then restart/recreate the server. No sender has been added without its actual address. Do not block all of Gmail simply because one suspicious request used Gmail; legitimate customers can use personal addresses.

## Nexus demo and access review

A Gmail address or a request for a demo is not proof of fraud. This website only saves enquiries and sends notifications: submitting a form does **not** create an account, issue an access token, grant permissions or invite a visitor into Nexus AOS.

Before sharing access, independently verify the organisation and the person's role, confirm the use case and arrange a supervised demo using sample data. Access to a separately hosted app should be approved manually and limited to an expiring, least-privilege account with MFA. Never share a team password, API key, customer data or production environment. Those app-level settings require access to the actual Nexus deployment; they are not represented as implemented by this website change.

## Release and verification

Deploy the frontend build and updated API together using the existing deployment workflow and restart the API. No database reseed is needed. The new counter collection/index is created by Mongoose. Existing environment credentials are preserved; the example configuration now correctly documents Hostinger.

Run `npm test -- --runInBand` in `server`, and `npm test`, `npm run lint`, `npm run build` in `client`. The `formGuard.test.js` suite uses a temporary MongoDB and mocked SMTP; it exercises parallel duplicate requests, concurrent quotas, expiry, sender aliases, rotating IPv6 addresses, content rejection, valid enquiries, assessment email safety and database failure. Do not test attack payloads against the live mailbox.

After release, monitor `[form-guard]` reason codes and legitimate-enquiry delivery. If automation continues, add a managed bot challenge such as Turnstile with server-side validation; no CAPTCHA service or keys are configured by this change.
