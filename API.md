# API Documentation

This document provides detailed information about the Pandemic system's API endpoints, request formats, and response formats.

## Overview
The Pandemic system provides a RESTful API for interacting with its core functionality. The API is divided into several main sections:

- Video Processing API
- AI Operations API
- System Monitoring API

## Base URL
```
http://localhost:3000/api
```

## Video Processing API

### 1. Upload Video
```
POST /videos/upload
```

**Request Body:**
```json
{
  "video_file": "File binary data",
  "metadata": {
    "title": "string",
    "description": "string",
    "tags": ["string"]
  }
}
```

**Response:**
```json
{
  "id": "string",
  "status": "string",
  "created_at": "timestamp"
}
```

### 2. Get Video Status
```
GET /videos/{video_id}/status
```

**Response:**
```json
{
  "id": "string",
  "status": "string",
  "progress": "number",
  "updated_at": "timestamp"
}
```

## AI Operations API

### 1. Trigger AI Analysis
```
POST /ai/analyze
```

**Request Body:**
```json
{
  "video_id": "string",
  "analysis_type": "string",
  "parameters": {}
}
```

**Response:**
```json
{
  "job_id": "string",
  "status": "string",
  "message": "string"
}
```

### 2. Get AI Analysis Results
```
GET /ai/results/{job_id}
```

**Response:**
```json
{
  "job_id": "string",
  "results": {},
  "status": "string",
  "completed_at": "timestamp"
}
```

## System Monitoring API

### 1. Get System Health
```
GET /health
```

**Response:**
```json
{
  "status": "string",
  "timestamp": "timestamp",
  "components": {
    "ai_service": "string",
    "video_processing": "string",
    "database": "string"
  }
}
```

### 2. Get System Metrics
```
GET /metrics
```

**Response:**
```json
{
  "cpu_usage": "number",
  "memory_usage": "number",
  "disk_usage": "number",
  "running_tasks": "number",
  "active_users": "number"
}
```

## Error Handling
The API uses standard HTTP status codes to indicate success or failure of requests. The following status codes are used:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request format
- `401 Unauthorized`: Authentication failed
- `500 Internal Server Error`: Server-side error

Error responses include a JSON object with error details:
```json
{
  "error": {
    "code": "number",
    "message": "string",
    "details": "string"
  }
}
```

## Authentication
The API uses JWT-based authentication. Include a valid JWT token in the `Authorization` header for protected endpoints:
```
Authorization: Bearer <your_token_here>
```

## Rate Limits
The API implements rate limiting to prevent abuse. The default rate limit is 100 requests per minute. Contact the system administrator to request higher limits if needed.

## Versioning
The API uses versioning in the form of:
```
http://localhost:3000/api/v{version}/endpoint
```

Current Version: `v1`

## Examples

### Upload Video
```bash
curl -X POST -F "video_file=@/path/to/video.mp4" -F "metadata={'title':'Example Video','description':'Test video upload'}" http://localhost:3000/api/v1/videos/upload
```

### Get Video Status
```bash
curl http://localhost:3000/api/v1/videos/12345/status
