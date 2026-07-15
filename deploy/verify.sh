#!/bin/bash
# Origin-side checks: does brarscribbles serve, and are the co-hosted sites unaffected?

echo "--- brarscribbles.com at origin (HTTP) ---"
curl -s -o /dev/null -w 'brarscribbles.com -> %{http_code}\n' \
  -H 'Host: brarscribbles.com' http://127.0.0.1/ --max-time 10

echo
echo "--- co-hosted sites (regression check) ---"
for h in invitemart.in divorcetalk.in availcar.com namastemandarin.com \
         property1313.com startupfundinghub.in vantroz.com.au numero.guru \
         socialstudios.in pacetalk.in bulksms.ca sixstarimpex.com; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -H "Host: $h" http://127.0.0.1/ --max-time 10)
  printf '%-28s -> %s\n' "$h" "$code"
done
