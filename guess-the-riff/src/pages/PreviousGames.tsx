// src/pages/PreviousGames.tsx
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RiffCard from "../components/RiffCard";
import type { RiffStatus } from "../components/RiffCard";
import songs from "../../public/songs/songs.json";
import "./PreviousGames.css";

/**
 * Read stored result from localStorage
 */
function readResult(id: string): RiffStatus {
  try {
    const raw = localStorage.getItem(`riff-${id}-result`);
    if (!raw) return "not-played";
    const parsed = JSON.parse(raw) as { status: RiffStatus };
    return parsed.status;
  } catch {
    return "not-played";
  }
}

export default function PreviousGames() {
  return (
    <>
      <Header />
      <main className="previous-wrapper">
        {songs.map((song, idx) => (
          <Link key={song.id} to={`/s/${idx + 1}`} className="card-link">
            <RiffCard
              riffNr={idx + 1}
              date={song.date}
              status={readResult(song.id)}
            />
          </Link>
        ))}
      </main>
      <Footer />
    </>
  );
}
