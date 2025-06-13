import { useState } from "react";
import { Heart, BarChart2, HelpCircle, Info, Settings } from "lucide-react";
import "./Header.css";
import LogoHeader from "../assets/LogoHeader-inlined.svg?react";
import SupportModal from "./SupportModal";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <LogoHeader className="logo-svg" />
          <nav className="nav-icons">
            <Heart className="icon" onClick={() => setShowModal(true)} />
            <BarChart2 className="icon" />
            <HelpCircle className="icon" />
            <Info className="icon" />
            <Settings className="icon" />
          </nav>
        </div>
      </header>
      {showModal && <SupportModal onClose={() => setShowModal(false)} />}
    </>
  );
}
