import { useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const handleClick = () => {
    const path = location.pathname;
    if (path === '/goal' || path === '/') {
      return;
    }

    const targetPath = path.split('/').slice(0, -1).join('/');
    navigation(targetPath);
  };

  return (
    <header className="app__header header" data-testid="header">
      <button
        className="header__link"
        onClick={handleClick}
        data-testid="back"
      />

      <div className="header__img-container">
        <img src="./images/avocado.png" className="header__img" />
      </div>

      <span className="header__title">Mentor</span>
    </header>
  );
};
