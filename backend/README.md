# SceneVault

SceneVault is a visual memory vault that allows users to upload, store, browse, and search their images through a clean web interface.

## Features

- Upload JPG, PNG, and WEBP images
- Browse uploaded memories in a gallery
- Search stored images
- REST API built with FastAPI
- React + TypeScript frontend
- Dockerized backend
- Health-check API endpoint
- Designed for future AWS S3 and ECS deployment

## Tech Stack

- React
- TypeScript
- Vite
- FastAPI
- Python
- Docker
- AWS S3 / ECS concepts

## Architecture

React Frontend → FastAPI REST API → Image Storage

The FastAPI backend is containerized with Docker and designed so local image storage can later be replaced with Amazon S3 and deployed using Amazon ECS.

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /upload` - Upload an image
- `GET /images` - List stored images

## Run with Docker

Build:

```bash
docker build -t scenevault-api ./backend
API documentation:

http://localhost:8001/docs