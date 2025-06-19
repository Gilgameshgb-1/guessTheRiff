import "./GuessResult.css";
import AmazonIcon from "../assets/amazon-icon.svg?react"
import EbayIcon from "../assets/ebay-icon.svg?react"
import Guitar from "../assets/guitar.svg?react"

interface GuessResultProps {
  title: string;
  description: string;
  ebayURL: string;
  amazonURL: string;
}

export default function GuessResult({ title, description, ebayURL, amazonURL }: GuessResultProps) {
  return (
    <div className="guess-result-container">
      <div className="guess-result-header">
        <div className="song-info">
          <span className="song-icon"><Guitar className="guitar-icon"/></span>
          <h2 className="song-title">{title}</h2>
        </div>
        <div className="affiliate-icons">
          <a href={ebayURL} target="_blank" rel="noopener noreferrer">
            <EbayIcon className="affiliate-icon" />
          </a>
          <a href={amazonURL} target="_blank" rel="noopener noreferrer">
            <AmazonIcon className="affiliate-icon" />
          </a>
        </div>
      </div>
      <p className="song-description">{description}</p>
    </div>
  );
}
