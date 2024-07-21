#!/bin/bash
set -e

echo "Frontend deployment started ..."

source /var/www/soloview/data/.nvm/nvm.sh

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/money_tracker

# Pull the latest changes from the repository
echo "Pulling latest changes..."
git pull origin master

# Install dependencies
echo "Installing dependencies..."
/var/www/soloview/data/.nvm/versions/node/v20.15.1/bin/npm install

# Build the project
echo "Building the project..."
/var/www/soloview/data/.nvm/versions/node/v20.15.1/bin/npm run build

echo "Frontend deployment finished!"
