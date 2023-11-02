import { useEffect, useState } from "react";

function DarkBtn() {
  console.log("DARKMODE BTN rendered");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "dark" : "light",
  );

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark"); // index.html içindeki root
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const themeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); // index htmldeki root a denk gelir
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <button
      onClick={themeSwitch}
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-100 lg:flex-none"
      style={
        theme === "dark"
          ? {}
          : { boxShadow: "0 0 30px rgba(34, 211, 238, 0.9)" }
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill=""
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke=""
        className="h-4 w-4 rounded-full fill-cyan-100 stroke-cyan-100 "
        // style={{
        //   boxShadow: "0 0 30px rgba(34, 211, 238, 0.9)",
        // }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </button>
  );
}

export default DarkBtn;
