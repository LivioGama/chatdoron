# Setting up Directus

Follow the instructions in the [Directus documentation](https://docs.directus.io/self-hosted/quickstart.html) to install Directus on your VPS.

## 1. Setting up the environment variables

Create a .env file in the cloned repository in your VPS by running the following command:

```
cp apps/backend/directus/.env.example apps/backend/directus/.env
```

Then edit the .env file.

## 2. Deploying Directus

Run the following command to deploy Directus:

```
sudo chmod +x ./apps/backend/directus/deploy.sh
./apps/backend/directus/deploy.sh start
```

Directus should now be available at http://localhost:8055 or http://127.0.0.1:8055.

## 3. Setting up Nginx

You need an A record in your DNS at your registrar pointing to your VPS IP address.

Then you need to install Nginx:

```
sudo apt install nginx
```

Next, you should create a `<your-domain>.conf` file in `/etc/nginx/sites-available/`, for example with:
```
sudo nano /etc/nginx/sites-available/<your-domain>.conf
```

with the following content:

```
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
upstream directus {
    server 127.0.0.1:8055;
}
server {
    listen 80;
    server_name <PUBLIC_URL>;
    location / {
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:8055;
        proxy_set_header Upgrade $http_upgrade;
    }
}
server {
    listen 443 ssl;
    server_name <PUBLIC_URL>;
    location / {
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:8055;
        proxy_set_header Upgrade $http_upgrade;
    }
}
```

(Replace `<PUBLIC_URL>` with your public URL)

You can use a tool like Nginx UI to add the SSL
certificate to your domain with certbot though a nice UI.

Then you can run the following command to enable the site:

```
sudo ln -s /etc/nginx/sites-available/<your-domain>.conf /etc/nginx/sites-enabled/<your-domain>.conf
```

Finally, you need to restart Nginx:

```
sudo systemctl restart nginx
```

Once nginx is reloaded and running with the reverse proxy configuration pointing to the localhost Directus URL, you have a self-hosted backend running with a
public https URL.
