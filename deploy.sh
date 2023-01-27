#!/bin/bash

echo "Pulling the application from repository"
git pull

echo "Building the application"
docker-compose up -d --build
