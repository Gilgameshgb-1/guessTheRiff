import { useState } from "react";
import Header from "./components/Header";
import AudioPlayer from "./components/AudioPlayer";
import GuessBar from "./components/GuessBar";
import SearchBar from "./components/SearchBar";
import RiffControls from "./components/RiffControls";
import Footer from "./components/Footer";
import "./App.css";
import songs from "../public/songs/songs.json";

interface Song {
  id: string;
  title: string;
  description?: string;
  hints: string[];
}

let currentGuessIndex = 0;

const allSongs: Song[] = songs;

function App() {
  const [guesses, setGuesses] = useState<(string | null)[]>([]);
  const [input, setInput] = useState("");
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [selectedGuessIndex, setSelectedGuessIndex] = useState(currentGuessIndex);

  const maxGuesses = 5;
  const currentSong = allSongs[0]; //fixed for now, first song is picked, logic might be differently updated

  const currentHint = currentSong?.hints?.[guesses.length]; //Extract hint

  const handleGuessSubmit = () => {
    if (guesses.length >= maxGuesses) return;

    const isCorrect = input.trim().toLowerCase() === currentSong.title.toLowerCase();
    const nextGuesses = [...guesses, isCorrect ? input : null];
    setGuesses(nextGuesses);

    if (isCorrect) {
      alert("Correct guess! 🎉");
      //close guessing - remove guess bar, show guesses prompt 
    } else if (nextGuesses.length >= maxGuesses) {
      alert("Out of guesses! ❌");
      //same as up more or  less
    }
    setCurrentGuessIndex(currentGuessIndex + 1);
    setSelectedGuessIndex(currentGuessIndex + 1);

    setInput("");
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <AudioPlayer songId={currentSong?.id || ""} hint={currentSong?.hints?.[selectedGuessIndex] ?? ""} currentGuessIndex={currentGuessIndex} />
        <GuessBar
          currentGuessIndex={guesses.length}
          totalGuesses={guesses.filter((g) => g === null).length}
          maxGuesses={maxGuesses}
          selectedGuessIndex={selectedGuessIndex}
          setSelectedGuessIndex={setSelectedGuessIndex}
        />
        {/* <SearchBar input={input} onInput={setInput} onSubmit={handleGuessSubmit} /> */}
        <SearchBar
          songList={songs}
          onSongSelect={(title) => {
            console.log("User selected:", title);
            // Optionally set guess input state here
          }}
        />

        <RiffControls />
        <Footer />
      </main>
    </div>
  );
}

export default App;
