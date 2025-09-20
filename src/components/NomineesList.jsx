import React, { useEffect, useState } from "react";
import "./NomineesList.css";

// Fallback images
const defaultOscar = "https://via.placeholder.com/300x450?text=No+Poster";
const defaultPerson = "https://via.placeholder.com/150?text=No+Image";

// TMDb base URL
const TMDB_BASE_URL = "https://image.tmdb.org/t/p/w500";

// TMDb API key from .env
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function NomineesList({ year, nominees }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function enrichActors() {
      if (!nominees || nominees.length === 0) return;

      try {
        const updated = await Promise.all(
          nominees.map(async (category) => {
            const items = await Promise.all(
              category.items.map(async (nominee) => {
                const namesWithImages = await Promise.all(
                  (nominee.names || []).map(async (person) => {
                    // Fetch actor image from TMDb if missing
                    if (!person.img && person.tmdb) {
                      try {
                        const res = await fetch(
                          `https://api.themoviedb.org/3/person/${person.tmdb}?api_key=${API_KEY}`
                        );
                        const data = await res.json();
                        if (data.profile_path) {
                          return { ...person, img: data.profile_path };
                        }
                      } catch (err) {
                        console.error("TMDb fetch error:", err);
                      }
                    }
                    return person;
                  })
                );

                return { ...nominee, names: namesWithImages };
              })
            );

            return { ...category, items };
          })
        );

        setData(updated);
      } catch (err) {
        console.error("Error enriching nominees:", err);
        setData(nominees); // fallback
      }
    }

    enrichActors();
  }, [nominees]);

  if (!nominees || nominees.length === 0) {
    return <p style={{ textAlign: "center" }}>No nominees available for {year}</p>;
  }

  return (
    <div className="nominees-section">
      <h2 className="year-title">Nominees for {year}</h2>
      {data.map((category, idx) => (
        <div key={idx} className="category-block">
          <h3 className="category-title">{category.category}</h3>
          <div className="nominees-grid">
            {category.items.map((nominee, i) => (
              <div
                key={i}
                className={`nominee-card ${nominee.isWinner ? "winner" : ""}`}
              >
                {nominee.isWinner && <div className="winner-badge">WINNER</div>}

                <img
                  src={nominee.img ? `${TMDB_BASE_URL}${nominee.img}` : defaultOscar}
                  alt={nominee.title || "No Title"}
                  className="nominee-poster"
                />
                <h4>{nominee.title || "No Title"}</h4>

                <div className="people-list">
                  {(nominee.names || []).map((person, j) => (
                    <div key={j} className="person">
                      <img
                        src={person.img ? `${TMDB_BASE_URL}${person.img}` : defaultPerson}
                        alt={person.name || "No Name"}
                        className="person-photo"
                      />
                      <p>{person.name || "No Name"}</p>
                    </div>
                  ))}
                  {(nominee.names || []).length === 0 && <p>No people listed</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
