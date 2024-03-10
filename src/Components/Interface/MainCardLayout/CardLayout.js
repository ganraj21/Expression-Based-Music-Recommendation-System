import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CardLayout = () => {
  const [greeting, setGreeting] = useState('');
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('https://emotion-based-mrs-data.onrender.com/CardLayout')
      .then((response) => response.json())
      .then((data) => {
        setCardData(data);
        console.log(data);
      })
      .catch((error) => console.error(error));

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

  return (
    <>
      {cardData.cardLayout?.map((a, id) => {
        return (
          <>
            <div className="dayGreeting" key={id}>
              {a.mainTitle === 'Good' ? greeting : a.mainTitle}
            </div>
            <div className="musicSectionCard">
              {a.subTopicks.map((e, index) => {
                return (
                  <div
                    className="msCard"
                    key={index}
                    onClick={() => {
                      console.log(e);
                      if (e.id !== 1) {
                        localStorage.setItem('FPath', JSON.stringify(e));
                        navigate(`/user/playlist/${e.title}`, {
                          state: {
                            e,
                          },
                        });
                        return;
                      }
                      navigate(`/user/capture`);
                    }}
                  >
                    <img src={e.work_img} alt="music section" />
                    <h4 className="mainTitle" title={e.title}>
                      {e.title}
                    </h4>
                    <h5 className="subTitle" title={e.description}>
                      {e.description}
                    </h5>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
};

export default CardLayout;
