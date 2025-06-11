import React, { useState, useEffect } from "react";
import "./SearchBar.css";

interface Song {
  id: string;
  title: string;
}

/* interface SearchBarProps {
  input: string;
  onInput: (val: string) => void;
  onSubmit: () => void;
} */

interface SearchBarProps {
  songList: Song[];
  onSongSelect: (songTitle: string) => void;
}

/* export default function SearchBar({ input, onInput, onSubmit }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a song"
        value={input}
        onChange={(e) => onInput(e.target.value)}
      />
      <button className="submit-button" onClick={onSubmit}>
        SUBMIT!
      </button>
    </div>
  );
} */

  export default function SearchBar({ songList, onSongSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Song[]>([]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const lower = query.toLowerCase();
    const matches = songList.filter(song => song.title.toLowerCase().includes(lower));
    setSuggestions(matches.slice(0, 10)); // limit to top 10
  }, [query, songList]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for a song"
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((song) => (
            <li
              key={song.id}
              onClick={() => {
                setQuery(song.title);
                setSuggestions([]);
                onSongSelect(song.title);
              }}
            >
              {song.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
