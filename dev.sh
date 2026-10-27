#!/bin/zsh
# Local stack: Vite behind netlify dev, so /api/growth-scan (the function) works.
export PATH="$HOME/.local/node/bin:$PATH"
cd "$(dirname "$0")"
exec netlify dev --port 8899 --no-open
