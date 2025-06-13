import { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  songList: { title: string }[];
  onSubmitGuess: (guess: string) => void;
}

export default function SearchBar({ songList, onSubmitGuess }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);
    if (input.length > 0) {
      const filtered = songList
        .map((s) => s.title)
        .filter((title) => title.toLowerCase().includes(input.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    if (!query.trim()) return;
    onSubmitGuess(query.trim());
    setQuery("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your guess..."
        />
      <button onClick={handleSubmit} className="submit-button">
        SUBMIT!
      </button>
      <ul className="suggestions">
        {suggestions.map((s, i) => (
          <li key={i} onClick={() => handleSelect(s)}>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
