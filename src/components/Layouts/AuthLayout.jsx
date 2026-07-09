import React, { useContext } from "react";
import Logo from "../Elements/Logo";
import { ThemeContext } from "../../context/themeContext";
import { ModeContext } from "../../context/modeContext";

function AuthLayout(props) {
  const { children } = props;

  const { theme } = useContext(ThemeContext);
  const { darkMode } = useContext(ModeContext);

  return (
    <main
      className={`min-h-screen flex items-center justify-center ${
        darkMode
          ? "bg-[#2F2F2F] text-white"
          : `bg-special-mainBg ${theme.name}`
      }`}
    >
      <div className="w-full max-w-sm">
        <Logo />
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;