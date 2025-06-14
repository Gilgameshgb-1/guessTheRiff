import { useState } from "react";
import { Heart, BarChart2, HelpCircle, Info, Settings } from "lucide-react";
import "./Header.css";
import LogoHeader from "../assets/LogoHeader-inlined.svg?react";
import SupportModal from "./SupportModal";
import SupportModalInfo from "./SupportModalInfo";
import SupportModalHowToPlay from "./SupportModalHowToPlay";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalHowToPlay, setShowModalHowToPlay] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <LogoHeader className="logo-svg" />
          <nav className="nav-icons">
            <Heart className="icon" onClick={() => setShowModal(true)} />
            <BarChart2 className="icon" />
            <HelpCircle className="icon" onClick={() => setShowModalHowToPlay(true)}/>
            <Info className="icon" onClick={() => setShowModalInfo(true)} />
            <Settings className="icon" />
          </nav>
        </div>
      </header>
      {showModal && <SupportModal onClose={() => setShowModal(false)} />}
      {showModalInfo && <SupportModalInfo onClose={() => setShowModalInfo(false)} />}
      {showModalHowToPlay && <SupportModalHowToPlay onClose={() => setShowModalHowToPlay(false)} />}
    </>
  );
}
