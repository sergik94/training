import { useContext } from 'react';
import cn from 'classnames';
import './Behaviors.scss';
import { ContinueButton } from '../ContinueButton';
import { UserInfoContext } from '../UserInfoContext';

const behaviors = [
  {
    title: "I don't rest enough",
    imgPath: './images/behaviors/moon.png',
  },
  {
    title: 'I have a sweet tooth',
    imgPath: './images/behaviors/donut.png',
  },
  {
    title: 'I have too much soda',
    imgPath: './images/behaviors/soda.png',
  },
  {
    title: 'I eat many salty foods',
    imgPath: './images/behaviors/salt.png',
  },
  {
    title: 'I enjoy midnight snacks',
    imgPath: './images/behaviors/pizza.png',
  },
  {
    title: 'None of the above',
    imgPath: './images/behaviors/cross.png',
  },
];

export const Behaviors = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const onBehaviorClick = (behavior: string) => {
    const isBh = userInfo.behaviors.includes(behavior);
    if (isBh) {
      setUserInfo((prev) => {
        const newBehavList = prev.behaviors.filter((bh) => bh !== behavior);

        return {
          ...prev,
          behaviors: newBehavList,
        };
      });
    } else {
      setUserInfo({
        ...userInfo,
        behaviors: [...userInfo.behaviors, behavior],
      });
    }
  };

  return (
    <div className="app__behaviors behaviors _container--local">
      <div className="titlebox">
        <h2 className="titlebox__title">Destructive behaviors</h2>
        <p className="titlebox__description">
          We all have them! Which are yours?
        </p>
      </div>

      <div className="behaviors__cards">
        {behaviors.map((bh) => (
          <div
            className={cn('behaviors__card', {
              'behaviors__card--active': userInfo.behaviors.includes(bh.title),
            })}
            key={bh.title}
            onClick={() => onBehaviorClick(bh.title)}
          >
            <div className="behaviors__img-container">
              <img src={bh.imgPath} alt={bh.title} className="behaviors__img" />
            </div>

            <span className="behaviors__card-title">{bh.title}</span>
          </div>
        ))}
      </div>

      <ContinueButton
        path={'exercise'}
        isDisabled={userInfo.behaviors.length === 0}
      />
    </div>
  );
};
