import { useEffect, useState } from "react";
import "./RiffControls.css";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface RiffControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function RiffControls({ onPrevious, onNext }: RiffControlsProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  const formatTime = (val: number) => val.toString().padStart(2, "0");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="riff-controls">
      <button className="nav-button" onClick={onPrevious}>
        <ChevronsLeft />
      </button>
      <span className="riff-timer">Next riff in: {formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:{formatTime(timeLeft.seconds)}s
      </span>
      <button className="nav-button" onClick={onNext}>
        <ChevronsRight />
      </button>
    </div>
  );
}
