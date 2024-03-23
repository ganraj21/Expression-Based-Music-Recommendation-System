import React, { createContext, useContext, useEffect, useState } from 'react';
const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [greeting, setGreeting] = useState('');
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      console.log(currentHour);
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };
    updateGreeting(); // Initial update

    // Update the greeting every minute
    const intervalId = setInterval(updateGreeting, 60000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    const getFrontData = async () => {
      const response = await fetch(
        'https://emotion-based-mrs-data.onrender.com/CardLayout'
      );

      if (response.ok) {
        const result = await response.json();
        setCardData(result);
      } else {
        throw new Error('System Error');
      }
    };

    getFrontData();
  }, []);
  return (
    <MusicContext.Provider value={{ greeting, cardData }}>
      {children}
    </MusicContext.Provider>
  );
};
export { MusicContext, MusicProvider };
