Set-Location "$PSScriptRoot\..\backend"
if (!(Test-Path node_modules)) { npm install }
npm run seed
npm run dev
