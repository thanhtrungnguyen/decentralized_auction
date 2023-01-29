#!/bin/bash

echo "Pulling the application from repository"
git pull

echo "Building the application"
sudo docker-compose up -d --build
