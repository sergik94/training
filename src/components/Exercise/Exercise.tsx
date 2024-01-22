import { useContext } from 'react';
import cn from 'classnames';
import './Exercise.scss';
import { UserInfoContext } from '../UserInfoContext';

const activities = [
  'Hardly at all',
  'Fitness 1-2 times a week',
  'Fitness 3-5 times a week',
  'Fitness 5-7 times a week',
];

export const Exercise = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const onActivityClick = (activity: string) => {
    setUserInfo({ ...userInfo, exersice: activity });
  };

  return (
    <div
      className="app__exercise exercise _container--local"
      data-testid="exercise"
    >
      <div className="titlebox">
        <h2 className="titlebox__title">Physical exercise</h2>
        <p className="titlebox__description">
          Physical exercise means a lot for a woman who wants to lose kilos and
          works at the office
        </p>
        <p className="titlebox__subtitle">How active are you during the day?</p>
      </div>

      <div className="exercise__contant">
        <div className="exercise__img-container">
          <img src="./images/body.png" alt="" className="exercise__img" />
        </div>

        <div className="exercise__cards">
          {activities.map((activity) => (
            <div
              className={cn('exercise__card', {
                'exercise__card--active': userInfo.exersice === activity,
              })}
              key={activity}
              onClick={() => onActivityClick(activity)}
            >
              <span className="exercise__card-title">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
