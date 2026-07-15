#!/bin/bash
echo "--- origin, HTTPS, SNI www.brarscribbles.com ---"
curl -s -o /dev/null -w 'code=%{http_code} redirect=%{redirect_url}\n' \
  --resolve www.brarscribbles.com:443:127.0.0.1 https://www.brarscribbles.com/ --max-time 10

echo "--- origin, HTTP, Host www.brarscribbles.com ---"
curl -s -o /dev/null -w 'code=%{http_code} redirect=%{redirect_url}\n' \
  -H 'Host: www.brarscribbles.com' http://127.0.0.1/ --max-time 10

echo
echo "--- which server block answers www over 443? ---"
curl -sI --resolve www.brarscribbles.com:443:127.0.0.1 \
  https://www.brarscribbles.com/ --max-time 10 | head -6
