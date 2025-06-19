import "./SupportModalHowToPlay.css";
import Guitar from "../assets/guitar.svg?react";

interface SupportModalHowToPlayProps {
  onClose: () => void;
}

export default function SupportModalHowToPlay({ onClose }: SupportModalHowToPlayProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>How to play Guess the Riff <Guitar className="guitar-icon"/></h2>
        <p>
          Click play to hear a riff snippet from a song.
        </p>
        <p>
          Search for the song that you think the audio snippet belongs to. You can either type out the response yourself or pick one offered from the search.
        </p>
        <p>
          Click skip to move on to the next snippet. You have a track of your previous guesses as well as skips.
        </p>
        <p>If you get it wrong an additional snippet of the song is releaved to help you together with a hint in the upper left corner. You get 5 guesses in total.</p>
      </div>
    </div>
  );
}
