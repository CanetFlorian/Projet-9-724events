import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus
    .slice()
    .sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timeout);
  }, [index, byDateDesc?.length]);

  if (!byDateDesc || byDateDesc.length === 0) return null;

  const currentEvent = byDateDesc[index];

  return (
    <div className="SlideCardList">
      <div className="SlideCard SlideCard--display" key={currentEvent.title}>
        <img src={currentEvent.cover} alt="forum" />
        <div className="SlideCard__descriptionContainer">
          <div className="SlideCard__description">
            <h3>{currentEvent.title}</h3>
            <p>{currentEvent.description}</p>
            <div>{getMonth(new Date(currentEvent.date))}</div>
          </div>
        </div>
      </div>

     
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;