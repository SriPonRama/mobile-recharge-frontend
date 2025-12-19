import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const AdminThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded font-medium transition"
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
};

export default AdminThemeToggle;