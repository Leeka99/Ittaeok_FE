param(
  [switch]$Install
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if ($Install) {
  if (Test-Path "package-lock.json") {
    npm ci
  } else {
    npm install
  }
}

npm run build
