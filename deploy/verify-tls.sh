#!/bin/bash
echo "nginx: $(systemctl is-active nginx)"
echo
echo "--- HTTPS at origin (SNI brarscribbles.com) ---"
curl -s -o /dev/null -w 'https origin -> %{http_code}\n' \
  --resolve brarscribbles.com:443:127.0.0.1 https://brarscribbles.com/ --max-time 10

echo "--- deep route (BrowserRouter fallback) ---"
for p in /shop /product/2 /checkout; do
  code=$(curl -s -o /dev/null -w '%{http_code}' \
    --resolve brarscribbles.com:443:127.0.0.1 "https://brarscribbles.com$p" --max-time 10)
  printf '%-14s -> %s\n' "$p" "$code"
done

echo "--- unknown asset should 404, not fall back to index ---"
curl -s -o /dev/null -w 'missing asset -> %{http_code}\n' \
  --resolve brarscribbles.com:443:127.0.0.1 https://brarscribbles.com/assets/nope.js --max-time 10

echo
echo "--- certificate ---"
echo | openssl s_client -connect 127.0.0.1:443 -servername brarscribbles.com 2>/dev/null \
  | openssl x509 -noout -subject -dates -issuer 2>/dev/null
