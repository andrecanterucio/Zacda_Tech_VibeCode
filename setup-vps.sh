#!/bin/bash
# ============================================================
#  setup-vps.sh
#  Instala Node.js, PM2, Nginx e sobe o Next.js no VPS
#  Execute no VPS como root: bash /root/setup-vps.sh
# ============================================================

set -e

APP_DIR="/var/www/zacda"
ZIP_FILE="/root/zacda-vps.zip"
NGINX_CONF="/etc/nginx/sites-available/zacda"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'

echo -e "\n${CYAN}========================================"
echo -e " ZACDA - Setup VPS Hostinger"
echo -e "========================================${NC}\n"

# ── 1. Atualizar sistema ──────────────────────────────────
echo -e "${YELLOW}[1/8] Atualizando sistema...${NC}"
apt-get update -qq && apt-get upgrade -y -qq

# ── 2. Instalar Node.js 20.x ─────────────────────────────
echo -e "${YELLOW}[2/8] Instalando Node.js 20.x...${NC}"
if ! command -v node &> /dev/null || [[ $(node -v | cut -d'.' -f1 | tr -d 'v') -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
echo -e "  Node.js: $(node -v) | npm: $(npm -v)"

# ── 3. Instalar PM2 ──────────────────────────────────────
echo -e "${YELLOW}[3/8] Instalando PM2...${NC}"
npm install -g pm2 --silent
echo -e "  PM2: $(pm2 -v)"

# ── 4. Instalar Nginx ────────────────────────────────────
echo -e "${YELLOW}[4/8] Instalando Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
  apt-get install -y nginx
fi
echo -e "  Nginx: $(nginx -v 2>&1)"

# ── 5. Instalar unzip ────────────────────────────────────
echo -e "${YELLOW}[5/8] Verificando unzip...${NC}"
apt-get install -y unzip -qq

# ── 6. Descompactar o app ────────────────────────────────
echo -e "${YELLOW}[6/8] Instalando o app em ${APP_DIR}...${NC}"
mkdir -p "$APP_DIR"
unzip -o "$ZIP_FILE" -d "$APP_DIR"
echo -e "  App extraido em ${APP_DIR}"

# ── Verificar .env.production ────────────────────────────
if [ ! -f "$APP_DIR/.env.production" ]; then
  echo -e "${RED}  ATENCAO: .env.production nao encontrado em ${APP_DIR}!"
  echo -e "  Crie o arquivo antes de iniciar o app.${NC}"
fi

# ── 7. Configurar Nginx ──────────────────────────────────
echo -e "${YELLOW}[7/8] Configurando Nginx...${NC}"

# Detecta dominio ou usa IP como fallback
DOMAIN="${DOMAIN:-31.97.28.108}"

cat > "$NGINX_CONF" <<NGINXEOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Limite de upload (webhook Stripe, etc.)
    client_max_body_size 10M;

    # Logs
    access_log /var/log/nginx/zacda_access.log;
    error_log  /var/log/nginx/zacda_error.log;

    # Assets estaticos servidos diretamente pelo Nginx (mais rapido)
    location /_next/static/ {
        alias ${APP_DIR}/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        alias ${APP_DIR}/public/;
        expires 30d;
    }

    # Todo o resto vai para o Next.js
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }
}
NGINXEOF

# Ativa o site
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/zacda
rm -f /etc/nginx/sites-enabled/default

# Testa e recarrega Nginx
nginx -t && systemctl reload nginx
echo -e "  Nginx configurado para: ${DOMAIN}"

# ── 8. Iniciar app com PM2 ───────────────────────────────
echo -e "${YELLOW}[8/8] Iniciando app com PM2...${NC}"
cd "$APP_DIR"

pm2 stop zacda-web 2>/dev/null || true
pm2 delete zacda-web 2>/dev/null || true

pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true
systemctl enable pm2-root 2>/dev/null || true

echo -e "\n${GREEN}========================================"
echo -e " Setup concluido com sucesso!"
echo -e "========================================${NC}"
pm2 status

echo -e "\n${CYAN}App rodando em: http://${DOMAIN}${NC}"
echo -e "${YELLOW}IMPORTANTE: Configure seu dominio apontando para 31.97.28.108${NC}"
echo -e "${YELLOW}Para SSL/HTTPS, execute:${NC}"
echo -e "  apt install certbot python3-certbot-nginx -y"
echo -e "  certbot --nginx -d seudominio.com.br -d www.seudominio.com.br\n"
echo -e "${YELLOW}Para ver os logs do app:${NC}"
echo -e "  pm2 logs zacda-web\n"
