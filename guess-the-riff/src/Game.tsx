import { useState, useEffect } from "react";
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
import correctMp3 from "../public/sfx/win.mp3";
import wrongMp3 from "../public/sfx/fail.mp3";

const wrongSound = new Audio(wrongMp3);
const correctSound = new Audio(correctMp3);

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

type StoredRiffResult = {
  status: "correct" | "wrong" | "skipped";
  guesses: string[];
  completed: boolean;
};

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
  const currentSong = songs[currentSongIndex];

  let isPlayed = false;

  useEffect(() => {
    const saved = localStorage.getItem(`riff-${currentSong.id}-result`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.guesses) {
        setGuessHistory(parsed.guesses);
        setGuesses(parsed.guesses.map((g: Guess) => g.skipped ? null : g.text));
        setGameOver(true); // lock out interaction if already done
        setSelectedGuessIndex(parsed.guesses.length);
        setCurrentGuessIndex(parsed.guesses.length);
      }
    } else {
      // No saved data → fresh start
      setGuesses([]);
      setGuessHistory([]);
      setCurrentGuessIndex(0);
      setSelectedGuessIndex(0);
      setGameOver(false);
    }
  }, [currentSongIndex]);

  function checkLocalStorage(): boolean {
    const resultKey = `riff-${currentSong.id}-result`;
    const savedResult = localStorage.getItem(resultKey);

    if(!savedResult) return false;

    if (savedResult) { //nullcheck
      const parsed: StoredRiffResult = JSON.parse(savedResult);
      if (parsed.guesses.length >= 5) return true;
      else return false;
    }
  }
  /*   const currentHint = currentSong?.hints?.[guesses.length]; //Extract hint */

  const handleGuessSubmit = (guess: string) => {
    const isCorrect = guess.toLowerCase() === currentSong.title.toLowerCase();
    const guessText = guess.trim();
    setGuessHistory(prev => [...prev, { text: guessText, isCorrect }]);

    //Local storage stuff again below
    //-------------------------------
    if (isCorrect) {
      saveResult(currentSong.id, "correct", guessHistory, true);
      correctSound.play();
      setGameOver(true);
      return; // Should be here?
    }

    const nextGuesses = [...guesses, isCorrect ? guess : null];
    setGuesses(nextGuesses);

    if (nextGuesses.length >= maxGuesses) {
      saveResult(currentSong.id, "wrong", guessHistory, true);
      setGameOver(true);
    }else {
      saveResult(currentSong.id, "wrong", guessHistory, false);
      wrongSound.play();
    }
    setCurrentGuessIndex(currentGuessIndex + 1);
    setSelectedGuessIndex(currentGuessIndex + 1);

    setInput("");
  };

  const handleSkip = () => {
    if (checkLocalStorage()) return; //Exit if already guessed

    const nextGuesses = [...guesses, null];
    const nextGuessIndex = currentGuessIndex + 1;

    wrongSound.play();

    if (nextGuesses.length >= maxGuesses) {
      if (gameOver === true) return;
      saveResult(currentSong.id, "skipped", guessHistory, true);
      setGameOver(true);
    }else{
      saveResult(currentSong.id, "skipped", guessHistory, false);
    }

    setGuesses(nextGuesses);
    setGuessHistory(prev => [...prev, { text: "Skipped", skipped: true }]);
    setCurrentGuessIndex(nextGuessIndex);
    setSelectedGuessIndex(nextGuessIndex);
  };

  const resetGame = () => {
    const saved = localStorage.getItem(`riff-${currentSong.id}-result`);
    if (!saved) {
      setGuesses([]);
      setGuessHistory([]);
      setCurrentGuessIndex(0);
      setSelectedGuessIndex(0);
      setGameOver(false);
    }
  };

  const saveResult = (
    songId: string,
    status: "correct" | "wrong" | "skipped",
    guessesArray: Guess[],
    completed: boolean
  ) => {
    localStorage.setItem(
      `riff-${songId}-result`,
      JSON.stringify({
        status,
        guesses: guessesArray,
        completed,
      })
    );
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
        {(/* !gameOver || */ !checkLocalStorage()) && (
          <SearchBar
            songList={songs}
            onSubmitGuess={handleGuessSubmit}
          />
        )}
        {(gameOver || checkLocalStorage()) && (
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
