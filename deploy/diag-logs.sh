#!/bin/bash
# Did the www request from the public internet actually reach THIS server?
echo "--- access log config ---"
grep -rn 'access_log' /etc/nginx/nginx.conf | head -3
echo
echo "--- recent hits mentioning brarscribbles (any vhost log) ---"
tail -n 3000 /var/log/nginx/access.log 2>/dev/null | grep -i 'brarscribbles' | tail -10
echo
echo "--- last 10 lines of main access log ---"
tail -n 10 /var/log/nginx/access.log 2>/dev/null
