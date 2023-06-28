"use client"
import { useTheme } from "next-themes";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col">
      the current time is {theme}
      <button className="bg-slate-50 my-2 text-black" onClick={() => setTheme("light")}> light</button>
      <button className="bg-slate-50 my-2 text-black" onClick={() => setTheme("dark")}> dark</button>
    </div>
  );
};
export default ThemeSwitcher;