#!/bin/bash

# Deploy script for Directus

# Function to check if .env file exists
check_env_file() {
    if [ ! -f .env ]; then
        echo "Error: .env file not found. Please create one with the required environment variables."
        exit 1
    fi
}

# Function to start Directus
start_directus() {
    echo "Starting Directus..."
    docker compose up -d
}

# Function to stop Directus
stop_directus() {
    echo "Stopping Directus..."
    docker compose down
}

# Function to restart Directus
restart_directus() {
    echo "Restarting Directus..."
    docker compose restart
}

# Function to show Directus logs
show_logs() {
    echo "Showing Directus logs..."
    docker compose logs -f
}

# Function to update Directus
update_directus() {
    echo "Updating Directus..."
    docker compose pull
    docker compose up -d
}

# Main script logic
check_env_file

case "$1" in
    start)
        start_directus
        ;;
    stop)
        stop_directus
        ;;
    restart)
        restart_directus
        ;;
    logs)
        show_logs
        ;;
    update)
        update_directus
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|logs|update}"
        exit 1
        ;;
esac

exit 0
