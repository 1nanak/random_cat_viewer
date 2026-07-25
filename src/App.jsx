import { useState,useEffect  } from "react";
import "./App.css";

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setloading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const fetchCat = async () => {
    setloading(true);

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/cats/cat/random",
      );
      const data = await response.json();
      if (data.success) {
        setCat(data.data);
      } else {
        throw new Error("failed to fetch. Try again!! ");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchCat();
  }, []);
  return (
    <main className={`container ${isDark ? "dark" : "" }`}>
      <button
        aria-label="Toggle dark mode"
        className="theme-toggle"
        onClick={() => setIsDark((prev) => !prev)}
      >
        {!isDark ? "☀️" : "🌙"}
      </button>
      <h1>Random Cat</h1>
      <p className="subtitle">
        Discover a random cat and brighten your day! 🐾
      </p>

      <div className="card">
        <div className="image-section">
          {loading && (
            <div className="loader-wrapper">
              <div className="loader"></div>
            </div>
          )}

          {cat && (
            <img
              src={cat.image}
              alt="Random Cat"
              className={loading ? "hidden-img" : ""}
            />
          )}
        </div>

        {cat && (
          <div className="info-section">
            <h2>
              <strong>{cat.name}</strong>
            </h2>

            <div className="info-item">
              <strong>Life span:</strong>
              <p>{cat.life_span}</p>
            </div>

            <div className="info-item">
              <strong>Origin:</strong>
              <p>{cat.origin}</p>
            </div>

            <div className="info-item">
              <strong>Personality:</strong>
              <p>{cat.temperament}</p>
            </div>

            <div className="info-item">
              <strong>About:</strong>
              <p>{cat.description.split(". ").slice(0, 1).join(". ") + "."}</p>
            </div>
          </div>
        )}
      </div>

      <button className="next-btn" onClick={fetchCat} disabled={loading}>
        {loading ? "Loading..." : "Next Random Cat"}
      </button>
      <p className="next-tag">Get to know another fury friend!😺</p>
    </main>
  );
}

export default App;
