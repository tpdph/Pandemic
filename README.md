# Pandemic

Pandemic is an advanced AI-driven platform designed for video content generation, management, and analysis. It leverages cutting-edge AI technologies from companies like Runway and ElevenLabs to create and process video content efficiently. The platform consists of multiple microservices, including:

1. **AI Microservice**: Handles AI-related tasks such as video generation and processing
2. **Video Generation Service**: Utilizes AI models to create video content based on specific requirements
3. **Publisher Service**: Manages the distribution and publishing of video content across various platforms
4. **Trend Analysis Service**: Provides insights and analytics on video performance and trends

The system leverages cutting-edge technologies including AI, microservices architecture, and modern frontend frameworks to deliver high-quality video content generation, management, and analysis.

## Overview
Pandemic is built using:
- TypeScript for backend services
- Python for AI-related services
- Docker for containerization
- Terraform for infrastructure management

The system consists of several key components:
- AI Service: Handles AI-related operations
- Video Processing: Manages video generation and processing
- Backend API: Provides RESTful API endpoints
- Frontend: User interface components

## Features
- AI-powered video generation
- Distributed system architecture
- Monitoring and metrics
- Authentication and authorization
- Real-time dashboard for video metrics and trend analysis
- Support for multiple AI providers (Runway, ElevenLabs)
- Scalable microservices architecture
- Containerized deployment using Docker

## Prerequisites
- Node.js 16+
- Python 3.8+
- Docker
- Terraform
- Modern npm/yarn

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   pip install -r requirements.txt
   ```
3. Build Docker images:
   ```bash
   docker-compose build
   ```

## Usage
1. Start the system:
   ```bash
   docker-compose up -d
   ```
2. Access the API documentation at `http://localhost:3000/swagger`
3. Use the frontend interface at `http://localhost:3000`

## Configuration
Configuration can be done through environment variables and configuration files.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

Copyright (c) 2025 Pandemic Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Security](#security)
- [Infrastructure](#infrastructure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Configuration

### Environment Variables

Create a `.env` file with the following content:

```env
AI_PROVIDER_KEY=your_ai_provider_key_here
DB_PASSWORD=your_db_password_here
JWT_SECRET=your_jwt_secret_here
AI_SERVICE_ENDPOINT=http://ai-service:5000
```

Store sensitive information using Docker secrets as documented in SECURITY.md

## Security

Refer to SECURITY.md for detailed security guidelines and best practices.

## Infrastructure

The system uses Terraform for infrastructure management. To deploy:
```bash
terraform init
terraform apply
```

For more details, see SECURITY.md
