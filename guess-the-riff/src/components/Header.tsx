import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, BarChart2, HelpCircle, Info, Settings, LayoutGrid } from "lucide-react";
import "./Header.css";
import LogoHeader from "../assets/LogoHeader-inlined.svg?react";
import SupportModal from "./SupportModal";
import SupportModalInfo from "./SupportModalInfo";
import SupportModalHowToPlay from "./SupportModalHowToPlay";

interface HeaderProps {
  lastSong: number;
}

export default function Header({lastSong}: HeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalHowToPlay, setShowModalHowToPlay] = useState(false);

  const navigate = useNavigate();
  function redirectToPreviousGames(){
    navigate("/previous-games");
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <Link to={`http://localhost:5173/s/${lastSong}`}>
            <LogoHeader className="logo-svg" />
          </Link>
          <nav className="nav-icons">
            <Heart className="icon" onClick={() => setShowModal(true)} />
            <BarChart2 className="icon" />
            <HelpCircle className="icon" onClick={() => setShowModalHowToPlay(true)}/>
            <Info className="icon" onClick={() => setShowModalInfo(true)} />
            <LayoutGrid className="icon" onClick={() => redirectToPreviousGames()}/>
          </nav>
        </div>
      </header>
      {showModal && <SupportModal onClose={() => setShowModal(false)} />}
      {showModalInfo && <SupportModalInfo onClose={() => setShowModalInfo(false)} />}
      {showModalHowToPlay && <SupportModalHowToPlay onClose={() => setShowModalHowToPlay(false)} />}
    </>
  );
}
