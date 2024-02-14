// Library imports
import { useState } from "react";

// Custom imports
import userLogo from "../assets/IMG/user.png";
import hamburgerMenu from "../assets/IMG/hamburgerMenu.png";
import cross from "../assets/IMG/cross.png";
import Menu from "./menu";

function navBar({ title }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Menu isOpen={isMenuOpen} />

      <div className="top-bar">
        <div onClick={toggleMenu}>
          <img className="icon" src={isMenuOpen ? cross : hamburgerMenu} />
        </div>
        <h1>{title}</h1>
        <div>
          <img className="icon" src={userLogo} />
        </div>
      </div>
    </>
  );
}

export default navBar;
