import "./RiffControls.css";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface RiffControlsProps {
  nextRiffIn: string;
  onPrevious: () => void;
  onNext: () => void;
}

export default function RiffControls({ nextRiffIn, onPrevious, onNext }: RiffControlsProps) {
  return (
    <div className="riff-controls">
      <button className="nav-button" onClick={onPrevious}>
        <ChevronsLeft />
      </button>
      <span className="riff-timer">Next riff in: {nextRiffIn}</span>
      <button className="nav-button" onClick={onNext}>
        <ChevronsRight />
      </button>
    </div>
  );
}
