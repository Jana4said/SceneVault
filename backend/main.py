from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import uuid

app = FastAPI(title="SceneVault API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/images", StaticFiles(directory=UPLOAD_DIR), name="images")


@app.get("/")
def home():
    return {
        "app": "SceneVault",
        "status": "running"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    extension = os.path.splitext(file.filename)[1].lower()

    allowed_extensions = [".jpg", ".jpeg", ".png", ".webp"]

    if extension not in allowed_extensions:
        return {"error": "Only image files are allowed"}

    object_name = f"{uuid.uuid4()}{extension}"
    file_path = os.path.join(UPLOAD_DIR, object_name)

    contents = await file.read()

    with open(file_path, "wb") as image:
        image.write(contents)

    return {
        "message": "Image uploaded successfully",
        "original_name": file.filename,
        "object_key": object_name,
        "image_url": f"http://127.0.0.1:8000/images/{object_name}"
    }


@app.get("/images")
def list_images():

    files = os.listdir(UPLOAD_DIR)

    return [
        {
            "filename": filename,
            "url": f"http://127.0.0.1:8000/images/{filename}"
        }
        for filename in files
    ]