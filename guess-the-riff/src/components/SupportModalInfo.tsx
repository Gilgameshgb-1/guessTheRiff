import "./SupportModalInfo.css";

interface SupportModalInfoProps {
  onClose: () => void;
}

export default function SupportModalInfo({ onClose }: SupportModalInfoProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Info 🎸</h2>
        <p>
          Welcome to Guess The Riff – the ultimate daily audio challenge for music lovers!
        </p>
        <p>
          Each day, you'll hear a short audio clip from a legendary rock, metal, or alternative track. Your mission? Guess the song title in as few tries as possible.
          With each incorrect guess, you'll get a slightly longer clip and new hints to guide you!
        </p>
        <p>
          Whether you're a casual listener or a die-hard music fan, Guess The Riff is a fun way to test your ear, rediscover classic tracks, and challenge your friends.
        </p>
        <br></br>
        <p><small>Our copyright policy: Copyright for the images, games, songs or other displays is likely retained by the publisher/producer and/or artist(s) who 
          produced the item in question. It is believed that the use of these images falls under United States fair use law. 
          Any other uses of this image might be copyright infringement. 
          If you require that the image/game/puzzle or any other source be removed from the site, please reach out via email.</small></p>
      </div>
    </div>
  );
}
