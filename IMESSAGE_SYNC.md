# iMessage → Discord Sync

## Overview
Automatically syncs iMessage conversations to Discord channels every 5 minutes via cron.

## Architecture
```
iMessage DB → imsg CLI → sync.sh → openclaw message send → Discord
                                  ↕
                            state/chat_N.last_id (tracks last synced msg ID)
```

## Chat Mappings
| Person | iMessage Handle | Chat ID | Discord Channel |
|--------|----------------|---------|-----------------|
| Dr James | wangmengjames@gmail.com | 1 | #dr-james-imessage (1472495886277021875) |
| Elphy | +61429860588 | 2 | #elphy-imessage (1472495903188320290) |
| Sophie | 1409290667@qq.com | 3 | #sophie-imessage (1472495921064448174) |

## Message Format
```
📥 Dr James · 18:25
Hey, how's it going?

📤 Me · 18:26
All good!
```

## Files
- `~/.openclaw/workspace/scripts/imessage-sync/sync.sh` — main sync script
- `~/.openclaw/workspace/scripts/imessage-sync/init-state.sh` — one-time state initializer
- `~/.openclaw/workspace/scripts/imessage-sync/state/` — last-synced message IDs

## Setup
1. Initialize state (skip history): `bash init-state.sh`
2. Add cron: `*/5 * * * * bash ~/.openclaw/workspace/scripts/imessage-sync/sync.sh >> /tmp/imessage-sync.log 2>&1`

## Notes
- Uses `imsg` CLI (brew install steipete/tap/imsg)
- Requires Full Disk Access for terminal
- Rate limited with 0.5s delay between Discord sends
- Attachments shown as `[attachment]` (text only for now)
