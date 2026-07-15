# Deploying brarscribbles.com

Target: `163.227.92.219` (nginx 1.24.0 / Ubuntu), SSH on port **22587**.
DNS is already on Cloudflare (proxied) and currently returns 404 — there is no
live site to displace.

Run these from the `deploy/` folder. Every command below is run by you, not by
an agent — the root password must not be pasted into any tooling.

---

## 0. Rebuild (only if the app changed)

```bash
cd app && npm run build
tar -czf ../deploy/brarscribbles-dist.tar.gz -C dist .
```

## 1. Upload the bundle

```bash
scp -P 22587 brarscribbles-dist.tar.gz root@163.227.92.219:/tmp/
scp -P 22587 nginx-brarscribbles.conf root@163.227.92.219:/tmp/
```

## 2. Unpack into the web root

```bash
ssh root@163.227.92.219 -p 22587

mkdir -p /var/www/brarscribbles
rm -rf /var/www/brarscribbles/*            # clears the previous release
tar -xzf /tmp/brarscribbles-dist.tar.gz -C /var/www/brarscribbles
chown -R www-data:www-data /var/www/brarscribbles
find /var/www/brarscribbles -type d -exec chmod 755 {} \;
find /var/www/brarscribbles -type f -exec chmod 644 {} \;
```

## 3. Enable the site

```bash
cp /tmp/nginx-brarscribbles.conf /etc/nginx/sites-available/brarscribbles.conf
ln -sfn /etc/nginx/sites-available/brarscribbles.conf /etc/nginx/sites-enabled/brarscribbles.conf
rm -f /etc/nginx/sites-enabled/default    # drop the stock page answering on :80
```

Do **not** reload yet — the config references certs that do not exist, so
`nginx -t` will fail until step 4.

## 4. Issue the TLS certificate

Cloudflare passes `/.well-known/acme-challenge/` through to the origin, so the
HTTP-01 challenge works with the proxy left on.

```bash
apt update && apt install -y certbot python3-certbot-nginx
certbot certonly --webroot -w /var/www/html \
  -d brarscribbles.com -d www.brarscribbles.com \
  --agree-tos -m hellopacewalk@gmail.com --non-interactive

nginx -t && systemctl reload nginx
```

Certbot installs its own renewal timer. Confirm it:

```bash
systemctl status certbot.timer
certbot renew --dry-run
```

## 5. Set Cloudflare SSL mode

In the Cloudflare dashboard: **SSL/TLS → Overview → Full (strict)**.

This matters. If it is left on *Flexible*, Cloudflare talks to your origin over
plain HTTP while showing visitors a padlock — the redirect in step 3 then loops
infinitely and the site hangs. *Full (strict)* is correct once step 4 succeeds.

Also enable **Always Use HTTPS** under SSL/TLS → Edge Certificates.

## 6. Verify

```bash
curl -sSI https://brarscribbles.com | head -5          # expect 200
curl -sS https://brarscribbles.com | grep -o '<title>.*</title>'
```

Then load it in a browser and hard-refresh (Ctrl+F5). If Cloudflare serves a
stale 404, purge cache: **Caching → Configuration → Purge Everything**.

---

## Redeploying later

```bash
cd app && npm run build && tar -czf ../deploy/brarscribbles-dist.tar.gz -C dist .
cd ../deploy && scp -P 22587 brarscribbles-dist.tar.gz root@163.227.92.219:/tmp/
ssh root@163.227.92.219 -p 22587 \
  'rm -rf /var/www/brarscribbles/* && tar -xzf /tmp/brarscribbles-dist.tar.gz -C /var/www/brarscribbles && chown -R www-data:www-data /var/www/brarscribbles'
```

Purge the Cloudflare cache afterwards so visitors pick up the new asset hashes.

---

## Server hardening (do this soon)

The root password was shared in plaintext and must be considered public.

```bash
passwd                                    # rotate it now

# Then switch to key auth and stop using the password at all:
ssh-copy-id -p 22587 root@163.227.92.219  # run from your machine first
# then, on the server, in /etc/ssh/sshd_config:
#   PasswordAuthentication no
#   PermitRootLogin prohibit-password
systemctl reload sshd                     # keep your current session open to test
```

Also worth installing `fail2ban` — the SSH port is non-standard, which slows
scanners down but does not stop them.
