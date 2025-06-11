import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import PlayIcon from "../assets/playbutton.svg?react";

interface AudioPlayerProps {
  songId: string;
  hint: string;
  currentGuessIndex: number;
}

export default function AudioPlayer({ songId, hint, currentGuessIndex }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 1 = 100% - Volume default

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="audio-player-container">
      <p className="audio-riff">
        <span className="riff-number">Riff #1</span>{" "}
      </p>
      <p className="audio-hint">{hint}</p>
      <div className="audio-box">
        <div className="audio-top-row">
          <span className="audio-timestamp">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="audio-slider"
            min={0}
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSliderChange}
          />
        </div>

        <div className="audio-controls-row">
          <button className="audio-play" onClick={togglePlay}>
            {isPlaying ? (
              <span style={{ color: "#00ffcc", fontSize: "14px" }}>❚❚</span>
            ) : (
              <PlayIcon />
            )}
          </button>

          <div className="volume-control">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (audioRef.current) {
                  audioRef.current.volume = newVolume;
                }
              }}
              className="volume-slider"
            />
          </div>
        </div>

        <audio
          ref={audioRef}
          //src={`/songs/${songId}/${songId}.mp3`}
          src={`/songs/${songId}/${currentGuessIndex >= 5 ? songId : `guess${currentGuessIndex + 1}`}.mp3`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
    </div>
  );
}
