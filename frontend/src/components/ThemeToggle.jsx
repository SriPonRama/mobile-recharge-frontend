import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={toggleTheme}
        className="bg-gradient-to-r from-[#00B7B5] to-[#018790] dark:from-[#005461] dark:to-[#018790] text-white p-4 rounded-full shadow-2xl hover:scale-110 transform transition"
        aria-label="Toggle theme"
      >
        <span className="text-2xl">{isDark ? '☀️' : '🌙'}</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
