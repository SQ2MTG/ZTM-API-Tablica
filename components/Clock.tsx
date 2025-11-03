import React, { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8">
      <p className="font-doto text-5xl sm:text-6xl font-bold text-cyan-300 tracking-wider">
        {formattedTime}
      </p>
    </div>
  );
};
