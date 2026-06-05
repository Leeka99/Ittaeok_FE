param(
  [Parameter(Mandatory = $true)]
  [string]$Message,

  [string]$Remote = "origin",
  [string]$Branch = "",
  [switch]$SkipVerify,
  [switch]$Install
)

$ErrorActionPreference = "Stop"

function Exec {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Command)
  & $Command[0] @($Command | Select-Object -Skip 1)
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed: $($Command -join ' ')"
  }
}

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not $SkipVerify) {
  $verifyArgs = @()
  if ($Install) {
    $verifyArgs += "-Install"
  }
  Exec powershell -ExecutionPolicy Bypass -File ".\scripts\codex-verify.ps1" @verifyArgs
}

if ([string]::IsNullOrWhiteSpace($Branch)) {
  $Branch = (git branch --show-current).Trim()
}

if ([string]::IsNullOrWhiteSpace($Branch)) {
  throw "현재 브랜치를 확인할 수 없습니다. -Branch 값을 직접 전달하세요."
}

$changes = (git status --porcelain)
if ($changes) {
  Exec git add -A
  Exec git commit -m $Message
} else {
  Write-Host "커밋할 로컬 변경사항이 없습니다. 현재 브랜치를 push합니다."
}

Exec git push $Remote $Branch
Write-Host "$Branch 브랜치를 $Remote 원격 저장소에 push했습니다. 연결된 Vercel 프로젝트가 GitHub push를 기준으로 배포를 시작합니다."
