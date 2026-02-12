import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="heart-bg">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-200 opacity-40 select-none text-4xl animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-10%',
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationName: 'floatUp'
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
