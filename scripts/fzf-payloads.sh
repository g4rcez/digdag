jq '.[].title' payloads.json | \
  fzf --ansi \
  --prompt "Payload: " --cycle --preview="jq '.[] | select(.title == \"{}\")' payloads.json | jq -r '.code' | bat --color=always -l python"

