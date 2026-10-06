import { useEffect, useState } from "react";
import "./App.css";

type ImageItem = {
  filename: string;
  url: string;
};

function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadImages = async () => {
    const response = await fetch("http://localhost:8001/images");
    const data = await response.json();
    setImages(data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const uploadImage = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:8001/upload", {
      method: "POST",
      body: formData,
    });

    setFile(null);
    setUploading(false);
    await loadImages();
  };

  const filteredImages = images.filter((image) =>
    image.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <nav>
        <div className="logo">
          <span className="logoIcon">◈</span>
          SceneVault
        </div>

        <div className="status">
          <span></span>
          Vault online
        </div>
      </nav>

      <main>
        <section className="hero">
          <p className="eyebrow">YOUR VISUAL MEMORY</p>

          <h1>
            Never lose a <span>moment.</span>
          </h1>

          <p className="subtitle">
            Store your visual memories in one place and rediscover
            the moments that matter.
          </p>
        </section>

        <section className="uploadCard">
          <div className="uploadIcon">↑</div>

          <div>
            <h3>Add to your vault</h3>
            <p>JPG, PNG or WEBP</p>
          </div>

          <label className="chooseButton">
            Choose image
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>

          {file && (
            <div className="selectedFile">
              <span>{file.name}</span>

              <button onClick={uploadImage} disabled={uploading}>
                {uploading ? "Uploading..." : "Add to vault"}
              </button>
            </div>
          )}
        </section>

        <section className="vault">
          <div className="vaultHeader">
            <div>
              <p className="eyebrow">YOUR COLLECTION</p>
              <h2>Memory Vault</h2>
            </div>

            <div className="search">
              <span>⌕</span>
              <input
                placeholder="Search your memories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredImages.length === 0 ? (
            <div className="empty">
              <div>◇</div>
              <h3>Your vault is waiting.</h3>
              <p>Upload your first memory to get started.</p>
            </div>
          ) : (
            <div className="gallery">
              {filteredImages.map((image) => (
                <div className="imageCard" key={image.filename}>
                  <img src={image.url} alt="Memory" />

                  <div className="imageInfo">
                    <span>MEMORY</span>
                    <p>{image.filename.slice(0, 13)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <span>SCENEVAULT</span>
        <p>Visual memories, kept safe.</p>
      </footer>
    </div>
  );
}

export default App;