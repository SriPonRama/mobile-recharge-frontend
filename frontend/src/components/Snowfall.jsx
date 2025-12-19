import { useEffect, useState } from 'react';

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflakes = () => {
      const flakes = [];
      for (let i = 0; i < 50; i++) {
        flakes.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2,
          opacity: Math.random() * 0.6 + 0.4,
          size: Math.random() * 10 + 8,
        });
      }
      setSnowflakes(flakes);
    };

    createSnowflakes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            opacity: flake.opacity,
            fontSize: `${flake.size}px`,
            animationDuration: `${flake.animationDuration}s`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default Snowfall;