# ============================================================
#  deploy-vps.ps1
#  Gera o pacote de deploy do Next.js para VPS Hostinger
#  Execute: .\deploy-vps.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$outputDir   = Join-Path $projectRoot "vps-deploy"
$zipPath     = Join-Path $projectRoot "zacda-vps.zip"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " ZACDA - Build para VPS Hostinger" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "[1/6] Instalando dependencias..." -ForegroundColor Yellow
Set-Location $projectRoot
npm install --legacy-peer-deps

Write-Host "`n[2/6] Gerando build de producao..." -ForegroundColor Yellow
npm run build

Write-Host "`n[3/6] Preparando pasta de deploy..." -ForegroundColor Yellow
if (Test-Path $outputDir) { Remove-Item $outputDir -Recurse -Force }
New-Item -ItemType Directory -Path $outputDir | Out-Null

# Copia o servidor standalone
$standaloneDir = Join-Path $projectRoot ".next\standalone"
Copy-Item -Path "$standaloneDir\*" -Destination $outputDir -Recurse -Force

# Copia os assets estaticos (obrigatorio)
$staticDest = Join-Path $outputDir ".next\static"
if (Test-Path $staticDest) { Remove-Item $staticDest -Recurse -Force }
Copy-Item -Path (Join-Path $projectRoot ".next\static") -Destination $staticDest -Recurse -Force

# Copia pasta public
$publicSrc = Join-Path $projectRoot "public"
if (Test-Path $publicSrc) {
    Copy-Item -Path $publicSrc -Destination (Join-Path $outputDir "public") -Recurse -Force
}

Write-Host "`n[4/6] Copiando arquivos de configuracao VPS..." -ForegroundColor Yellow

# Copia ecosystem.config.cjs (PM2)
$ecosystemSrc = Join-Path $projectRoot "ecosystem.config.cjs"
if (Test-Path $ecosystemSrc) {
    Copy-Item -Path $ecosystemSrc -Destination $outputDir -Force
}

# Copia .env.production se existir
$envSrc = Join-Path $projectRoot ".env.production"
if (Test-Path $envSrc) {
    Copy-Item -Path $envSrc -Destination $outputDir -Force
    Write-Host "  -> .env.production incluido no pacote" -ForegroundColor Gray
} else {
    Write-Host "  -> ATENCAO: .env.production nao encontrado. Configure as variaveis no VPS." -ForegroundColor Red
}

Write-Host "`n[5/6] Criando arquivo ZIP..." -ForegroundColor Yellow
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path "$outputDir\*" -DestinationPath $zipPath -CompressionLevel Optimal

$sizeMB = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)

Write-Host "`n[6/6] Pronto!" -ForegroundColor Green
Write-Host "  ZIP gerado : $zipPath" -ForegroundColor White
Write-Host "  Tamanho    : $sizeMB MB`n" -ForegroundColor White

Write-Host "========================================" -ForegroundColor DarkCyan
Write-Host " PROXIMO PASSO" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor DarkCyan
Write-Host @"

1. Envie o arquivo zacda-vps.zip para o VPS:
   (no PowerShell, substituindo SUA_SENHA)

   scp zacda-vps.zip root@31.97.28.108:/root/zacda-vps.zip

2. Envie tambem o script de setup:

   scp setup-vps.sh root@31.97.28.108:/root/setup-vps.sh

3. Conecte ao VPS via SSH:

   ssh root@31.97.28.108

4. No VPS, execute o script de setup:

   chmod +x /root/setup-vps.sh && bash /root/setup-vps.sh

"@ -ForegroundColor Gray

Write-Host "Build concluido com sucesso!" -ForegroundColor Green
