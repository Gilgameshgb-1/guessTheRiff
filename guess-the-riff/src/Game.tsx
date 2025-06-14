import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import AudioPlayer from "./components/AudioPlayer";
import GuessBar from "./components/GuessBar";
import SearchBar from "./components/SearchBar";
import RiffControls from "./components/RiffControls";
import Footer from "./components/Footer";
import GuessResult from "./components/GuessResult";
import "./Game.css";
import songs from "../public/songs/songs.json";
import "./index.css"

interface Song {
  id: string;
  title: string;
  description?: string;
  hints: string[];
  ebayAff: string;
  amazonAff: string;
}

type Guess = {
  text: string;
  isCorrect?: boolean;
  skipped?: boolean;
};

interface GameProps {
  currentSongIndex: number;
  setCurrentSongIndex: (i: number) => void;
  songs: Song[];
}

/* let currentGuessIndex = 0;

const allSongs: Song[] = songs; */

export default function Game({ currentSongIndex, setCurrentSongIndex, songs }: GameProps) {
  const [guesses, setGuesses] = useState<(string | null)[]>([]);
  const [guessHistory, setGuessHistory] = useState<Guess[]>([]);
  const [input, setInput] = useState("");
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [selectedGuessIndex, setSelectedGuessIndex] = useState(currentGuessIndex);
  const [gameOver, setGameOver] = useState(false); //track game over

  const maxGuesses = 5;
  //const currentSong = allSongs[0]; //fixed for now, first song is picked, logic might be differently updated
  //----Attempt to switch between songs via button
  const { songId } = useParams<{ songId: string }>();
  const navigate = useNavigate();

  /*   const initialIndex = songId ? parseInt(songId, 10) - 1 : 0;
    const [currentSongIndex, setCurrentSongIndex] = useState(initialIndex);
    const currentSong = allSongs[currentSongIndex]; */
  const currentSong = songs[currentSongIndex];
  //----------------------------------------------

  /*   const currentHint = currentSong?.hints?.[guesses.length]; //Extract hint */

  const handleGuessSubmit = (guess: string) => {
    const isCorrect = guess.toLowerCase() === currentSong.title.toLowerCase();
    const guessText = guess.trim();
    setGuessHistory(prev => [...prev, { text: guessText, isCorrect }]);

    if (isCorrect) {
      setGameOver(true);
      return;
    }

    const nextGuesses = [...guesses, isCorrect ? guess : null];
    setGuesses(nextGuesses);

    if (nextGuesses.length >= maxGuesses) {
      setGameOver(true);
    }
    setCurrentGuessIndex(currentGuessIndex + 1);
    setSelectedGuessIndex(currentGuessIndex + 1);

    setInput("");
  };

  const handleSkip = () => {
    const nextGuesses = [...guesses, null];
    const nextGuessIndex = currentGuessIndex + 1;

    if (nextGuesses.length >= maxGuesses) {
      if (gameOver === true) return;
      setGameOver(true);
    }

    setGuesses(nextGuesses);
    setGuessHistory(prev => [...prev, { text: "Skipped", skipped: true }]);
    setCurrentGuessIndex(nextGuessIndex);
    setSelectedGuessIndex(nextGuessIndex);
  };

  const resetGame = () => {
    setGuesses([]);
    setGuessHistory([]);
    setSelectedGuessIndex(0);
    setGameOver(false);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <AudioPlayer
          songId={currentSong?.id || ""}
          hint={currentSong?.hints?.[selectedGuessIndex] ?? ""}
          currentGuessIndex={currentGuessIndex} gameOver={gameOver}
          selectedGuessIndex={selectedGuessIndex}
        />
        <GuessBar
          currentGuessIndex={guesses.length}
          totalGuesses={guesses.filter((g) => g === null).length}
          maxGuesses={maxGuesses}
          selectedGuessIndex={selectedGuessIndex}
          setSelectedGuessIndex={setSelectedGuessIndex}
          handleSkip={handleSkip}
          guessHistory={guessHistory}
        />
        {!gameOver && (
          <SearchBar
            songList={songs}
            onSubmitGuess={handleGuessSubmit}
          />
        )}
        {gameOver && (
          <GuessResult
            title={currentSong.title}
            description={currentSong.description}
            ebayURL={currentSong.ebayAff}
            amazonURL={currentSong.amazonAff}
          />
        )}
        <RiffControls
          onPrevious={() => {
            if (currentSongIndex > 0) {
              const newIndex = currentSongIndex - 1;
              setCurrentSongIndex(newIndex);
              navigate(`/s/${newIndex + 1}`);
              resetGame();
            }
          }}
          onNext={() => {
            if (currentSongIndex < songs.length - 1) {
              const newIndex = currentSongIndex + 1;
              setCurrentSongIndex(newIndex);
              navigate(`/s/${newIndex + 1}`);
              resetGame();
            }
          }}
        />
        <Footer />
      </main>
    </div>
  );
}
