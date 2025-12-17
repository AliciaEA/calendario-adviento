To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## API Usage (Windows PowerShell)

PowerShell treats quotes specially and `@` is used for splatting. To send JSON reliably, use one of these approaches.

### Create gift (POST /api/calendar)

- Using a file (most reliable):
```powershell
# Create regalo.json with: {"item":"Sueter"}
curl.exe -X POST http://localhost:3000/api/calendar -H "Content-Type: application/json" --data "@regalo.json"
```

- Using a variable:
```powershell
$body = '{"item":"Sueter"}'
curl.exe -X POST http://localhost:3000/api/calendar -H "Content-Type: application/json" -d $body
```

- Escaping double quotes with backticks (PowerShell escape char):
```powershell
curl.exe -X POST http://localhost:3000/api/calendar -H "Content-Type: application/json" -d "{`"item`":`"Sueter`"}"
```

- Native PowerShell alternative:
```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/calendar -Method POST -ContentType 'application/json' -Body '{"item":"Sueter"}'
```

### View calendar (GET /api/calendar)
```powershell
curl.exe http://localhost:3000/api/calendar
```

### Open gift (PATCH /api/open/:id/open)
```powershell
curl.exe -X PATCH http://localhost:3000/api/open/1/open
```

### Delete gift (PATCH /api/calendar/:id)
```powershell
curl.exe -X PATCH http://localhost:3000/api/calendar/1
```
