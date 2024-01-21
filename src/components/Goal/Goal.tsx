import { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { UserInfoContext } from '../UserInfoContext';

import './Goal.scss';

const cards = [
  {
    title: 'Loose Weight',
    imgPath: './images/goals/goal-1.png',
  },
  {
    title: 'Gain Muscle',
    imgPath: './images/goals/goal-2.png',
  },
  {
    title: 'Develop healthy habits',
    imgPath: './images/goals/goal-3.png',
  },
  {
    title: 'Develop flexibility',
    imgPath: './images/goals/goal-4.png',
  },
];

export const Goal = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const onGoalClick = (goalTitle: string) => {
    setUserInfo({ ...userInfo, goal: goalTitle });
  };

  return (
    <div className="app__goal goal _container--local">
      <div className="titlebox">
        <h2 className="titlebox__title">The Goal</h2>
        <p className="titlebox__description">
          Focus on the health benefits you need. Balanced nutrition will let you
          achieve them
        </p>
        <p className="titlebox__subtitle">What are your goals?</p>
      </div>

      <div className="goal__cards">
        {cards.map((card) => (
          <Link
            to="measurement"
            className={cn('goal__card', {
              'goal__card--active': userInfo.goal === card.title,
            })}
            key={card.title}
            onClick={() => onGoalClick(card.title)}
          >
            <span className="goal__card-title">{card.title}</span>

            <div className="goal__img-container">
              <img src={card.imgPath} alt={card.title} className="goal__img" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
