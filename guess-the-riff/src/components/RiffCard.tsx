// src/components/RiffCard.tsx
import "./RiffCard.css";

export type RiffStatus = "correct" | "wrong" | "not-played";

interface Props {
  riffNr: number;
  date: string;
  status: RiffStatus;
}

export default function RiffCard({ riffNr, date, status }: Props) {
  return (
    <div className={`riff-card ${status}`}>
      <div className="title">Riff #{riffNr}</div>
      <div className="date">{date}</div>
      <div className="note">
        {status === "correct"
          ? "Correct"
          : status === "wrong"
          ? "Incorrect"
          : "Not played"}
      </div>
    </div>
  );
}
