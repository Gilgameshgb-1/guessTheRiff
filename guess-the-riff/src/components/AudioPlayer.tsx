import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import PlayIcon from "../assets/playbutton.svg?react";
import HintCheck from "../assets/hintCheck.svg?react";
import SoundIcon from "../assets/sound_speaker_black_bolts_turquoise.svg?react";

interface AudioPlayerProps {
  songId: string;
  hint: string;
  currentGuessIndex: number;
  selectedGuessIndex: number;
  completed: boolean;
}

export default function AudioPlayer({ songId, hint, currentGuessIndex, completed, selectedGuessIndex }: AudioPlayerProps) {
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

  const numericId = parseInt(songId?.replace("song", "") ?? "1", 10);

  return (
    <div className="audio-player-container">
      <p className="audio-riff">
        <span className="riff-number">Riff #{numericId}</span>{" "}
      </p>
      <p className={`audio-hint ${selectedGuessIndex === 0 ? "hidden" : ""}`}>
        {hint}
        <HintCheck className="hint-check-icon" style={{ display: (selectedGuessIndex === 0 || selectedGuessIndex >= 5) ? "none" : "inline" }} /></p>
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
            <SoundIcon className="volume-icon"/>
            <input
              type="range"
              className="volume-slider"
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
            />
          </div>
        </div>
        <audio
          ref={audioRef}
          //src={`/songs/${songId}/${songId}.mp3`}
          src={
            completed ?
              `/songs/${songId}/${songId}.mp3`
              : `/songs/${songId}/${currentGuessIndex >= 5 ? songId : `guess${currentGuessIndex + 1}`}.mp3`
          }
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => { setIsPlaying(false); setCurrentTime(0); }}
        />
      </div>
    </div>
  );
}
