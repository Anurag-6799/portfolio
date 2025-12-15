# AWS EC2 Deployment Guide: Full Stack FastAPI + React

This guide covers deploying your portfolio to an AWS EC2 instance (Ubuntu 22.04) using Nginx as a reverse proxy.

## Prerequisites
- An AWS Account.
- A domain name (e.g., `anuragsingh.com`) - *Optional but recommended*.

---

## Phase 1: Launch Infrastructure

1.  **Go to AWS Console** -> **EC2** -> **Launch Instance**.
2.  **Name:** `Portfolio-Server`.
3.  **OS Image:** Ubuntu Server 22.04 LTS (HVM).
4.  **Instance Type:** `t2.micro` (Free Tier eligible).
5.  **Key Pair:** Create a new key pair (`portfolio-key`). **Download the .pem file and keep it safe.**
6.  **Network Settings:** Check the boxes:
    - Allow SSH traffic from Anywhere (or My IP).
    - Allow HTTP traffic from the internet.
    - Allow HTTPS traffic from the internet.
7.  **Launch Instance**.

---

## Phase 2: Connect to Server

On your local Mac terminal:
```bash
# Move key to secret folder
mv ~/Downloads/portfolio-key.pem ~/.ssh/
chmod 400 ~/.ssh/portfolio-key.pem

# Connect (Replace 1.2.3.4 with your EC2 Public IP)
ssh -i ~/.ssh/portfolio-key.pem ubuntu@1.2.3.4
```

---

## Phase 3: Install Dependencies

Once logged into the server, run:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv nginx git -y

# Install Node.js (v18)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## Phase 4: Setup Backend (FastAPI)

### 1. Clone Repository
```bash
git clone https://github.com/Anurag-6799/portfolio.git
cd portfolio/backend
```

### 2. Setup Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn uvloop httptools # Production server deps
```

### 3. Create System Service
This keeps the backend running 24/7.

```bash
sudo nano /etc/systemd/system/portfolio-backend.service
```

**Paste this (Right click to paste):**
```ini
[Unit]
Description=Gunicorn instance to serve Portfolio API
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/portfolio/backend
Environment="PATH=/home/ubuntu/portfolio/backend/venv/bin"
Environment="MAIL_USERNAME=singhanurag6799@gmail.com"
Environment="MAIL_PASSWORD=YOUR_APP_PASSWORD_HERE"
ExecStart=/home/ubuntu/portfolio/backend/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000

[Install]
WantedBy=multi-user.target
```
*Note: Replace `YOUR_APP_PASSWORD_HERE` with your real password.*

**Start the Service:**
```bash
sudo systemctl start portfolio-backend
sudo systemctl enable portfolio-backend
```

---

## Phase 5: Setup Frontend (React)

### 1. Build the App
```bash
cd ~/portfolio/frontend
npm install
npm run build
```
This creates a `dist` folder with your optimized site.

### 2. Move to Web Root
```bash
sudo mkdir -p /var/www/portfolio
sudo cp -r dist/* /var/www/portfolio/
```

---

## Phase 6: Configure Nginx (The Bridge)

Nginx will serve the frontend AND forward API requests to the backend.

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

**Paste this:**
```nginx
server {
    listen 80;
    server_name YOUR_PUBLIC_IP_OR_DOMAIN;

    location / {
        root /var/www/portfolio;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Activate it:**
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## Phase 7: Go Live! 🚀

Visit your Instance IP address (`http://1.2.3.4`) in your browser. Your portfolio should be live!

### (Optional) Add HTTPS (SSL)
If you have a domain pointing to this IP:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```
