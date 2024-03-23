import React, { createContext, useEffect, useState } from 'react';
const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [greeting, setGreeting] = useState('');
  const [cardData, setCardData] = useState([]);
  const [songData, setSongData] = useState([]);
  const [songPlay, setSongPlaying] = useState(0);

  const uri = 'https://emotion-based-mrs-data.onrender.com';
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
      const response = await fetch(`${uri}/CardLayout`);

      if (response.ok) {
        const result = await response.json();
        setCardData(result);
      } else {
        throw new Error('System Error');
      }
    };

    getFrontData();
  }, []);

  useEffect(() => {
    const getMusicData = async () => {
      const res = await fetch(`${uri}/PlaylistSongs`);

      if (res.ok) {
        const result = await res.json();
        setSongData(result.Happy);
        console.log(result.Happy);
      } else {
        throw new Error('System Error');
      }
    };
    setTimeout(getMusicData, 3000);
  }, []);

  const playerController = () => {
    setSongPlaying(!songPlay);
  };

  return (
    <MusicContext.Provider
      value={{ greeting, cardData, songData, playerController, songPlay }}
    >
      {children}
    </MusicContext.Provider>
  );
};
export { MusicContext, MusicProvider };
