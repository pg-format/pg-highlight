#!/usr/bin/bash
set -euo pipefail

# requires
# - skylighting
# - kate-syntax-highlighter

echo '<html><body style="background-color:#ffffff;color:#1f1c1b">' > kate.html

for pg in examples/*.pg; do
  expect=${pg%.pg}.skylighting
  ansi=${pg%.pg}.ansi

  if [[ -f "$expect" ]]; then
    tmp=${pg%.pg}.tmp
    ./skylight -f native "$pg" 2>/dev/null > "$tmp"
    # kate-syntax-highlighter -f ansi "$pg" > "$ansi"

    if  cmp -s "$tmp" "$expect" ; then
      echo "$pg - OK"
      rm "$tmp"
    else
      echo "$pg - highlighting not as expected"
      diff $tmp $expect || true
    fi
  else
    echo "$pg - created $expect"
    ./skylight -f native "$pg" 2>/dev/null > "$expect"
  fi

  echo "<b>$pg</b>" >> kate.html
  echo "</pre>" >> kate.html
  ./katelight -f html "$pg" | grep -oPz '<pre>((?s).+)</pre>' >> kate.html
done

