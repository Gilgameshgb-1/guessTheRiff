import "./SupportModal.css";

interface SupportModalProps {
  onClose: () => void;
}

export default function SupportModal({ onClose }: SupportModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Support Us</h2>
        <p>
          We hope you enjoy this daily puzzle game! If it has brightened your day,
          the best way to support us is to share the site with a friend, post your score on Reddit, Discord,
          or your favorite site.
        </p>
        <h3>Become a Member</h3>
        <p>
          You can support the development by donating or becoming a monthly member.
        </p>
        <button className="donate-button">❤️ Donate or Subscribe!</button>
        <p>
          Missing a song? <a href="#">Submit a song to our database</a>
        </p>
      </div>
    </div>
  );
}
