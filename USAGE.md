# USAGE

This document provides step-by-step instructions for using the Pandemic system.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the System](#running-the-system)
- [Using the API](#using-the-api)
- [Using the Frontend Interface](#using-the-frontend-interface)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Overview
The Pandemic system is designed to [brief description]. This document will guide you through the process of installing, configuring, and using the system.

## Prerequisites
Before you begin:
- Install Node.js (version 16 or higher)
- Install Python (version 3.8 or higher)
- Install Docker
- Install Terraform
- Install a modern package manager (npm or yarn)

## Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Navigate to the project directory:
   ```bash
   cd Pandemic
   ```
3. Install JavaScript dependencies:
   ```bash
   npm install
   ```
4. Install Python dependencies:
   ```bash
   pip install -r ai-service/requirements.txt
   ```
5. Build Docker images:
   ```bash
   docker-compose build
   ```

## Running the System
1. Start the system in detached mode:
   ```bash
   docker-compose up -d
   ```
2. Verify that all services are running:
   ```bash
   docker-compose ps
   ```

## Using the API
1. Access the Swagger UI at:
   ```
   http://localhost:3000/swagger
   ```
2. Use the API endpoints to interact with the system
3. The API provides endpoints for:
   - Video processing
   - AI operations
   - System monitoring

## Using the Frontend Interface
1. Access the frontend at:
   ```
   http://localhost:3000
   ```
2. Use the interface to:
   - Upload videos
   - Monitor AI operations
   - View system metrics

## Configuration
1. Configure the system using environment variables
2. Create a `.env` file in the root directory
3. Add your configuration:
   ```bash
   AI_SERVICE_ENDPOINT=http://localhost:5000
   VIDEO_STORAGE_PATH=./videos
   ```
4. Restart the system to apply changes:
   ```bash
   docker-compose down && docker-compose up -d
   ```

## Troubleshooting
Common issues and solutions:

### 1. Service Not Starting
- Check the Docker logs:
  ```bash
  docker-compose logs
  ```
- Verify that all dependencies are installed

### 2. Port Conflicts
- Check if port 3000 is available
- Modify the port in the Docker configuration if needed

### 3. Video Processing Issues
- Verify that the AI service is running
- Check the video storage path configuration
- Ensure proper file permissions
