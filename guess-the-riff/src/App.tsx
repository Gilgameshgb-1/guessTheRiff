// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Game from "./Game";
import songs from "../public/songs/songs.json";

export default function App() {
    return (
        <Routes>
            <Route path="/s/:songId" element={<GameWrapper />} />
            <Route path="*" element={<Navigate to="/s/1" />} />
        </Routes>
    );
}

function GameWrapper() {
    const { songId } = useParams<{ songId: string }>();
    const navigate = useNavigate();
    const allSongs = songs;

    const indexFromUrl = songId ? Math.max(0, Math.min(allSongs.length - 1, parseInt(songId) - 1)) : 0;
    const isValidIndex = !isNaN(indexFromUrl) && indexFromUrl >= 0 && indexFromUrl < songs.length;

    /* const [currentSongIndex, setCurrentSongIndex] = useState(indexFromUrl); */
    const [currentSongIndex, setCurrentSongIndex] = useState(isValidIndex ? indexFromUrl : 0);
    // Keep URL in sync when changing songIndex manually
    /*   useEffect(() => {
        navigate(`/s/${currentSongIndex + 1}`, { replace: true });
      }, [currentSongIndex]);
     */
    useEffect(() => {
        const newIndex = songId ? parseInt(songId) - 1 : 0;
        if (!isNaN(newIndex) && newIndex >= 0 && newIndex < allSongs.length) {
            setCurrentSongIndex(newIndex);
        }
    }, [songId]);

    return (
        <Game
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            songs={allSongs}
        />
    );
}
