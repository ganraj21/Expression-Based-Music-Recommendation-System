import React, { useEffect, useState } from 'react';
import PageData from '../PageData';
import { useNavigate } from 'react-router-dom';

const CardLayout = () => {
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();
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

  return (
    <>
      {PageData.map((a, id) => {
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
                      navigate(`/user/${e.title}`, {
                        state: {
                          e,
                        },
                      });
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
