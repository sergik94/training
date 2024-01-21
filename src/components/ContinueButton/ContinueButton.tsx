import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContinueButton.scss';

type Props = {
  path: string;
  isDisabled: boolean;
};

export const ContinueButton: FC<Props> = ({ path, isDisabled }) => {
  const navigate = useNavigate();

  const onContinueClick = () => {
    navigate(path);
  };

  return (
    <button
      className="measurement__button continue-button"
      disabled={isDisabled}
      onClick={onContinueClick}
    >
      Continue
    </button>
  );
};
