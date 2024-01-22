import React, { Fragment, useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import './Measurement.scss';
import { getUnits } from '../../features/getUnits';
import { Units } from '../../types/Units';
import { ContinueButton } from '../ContinueButton';
import { UserInfoContext } from '../UserInfoContext';
import { MeasSystems } from '../../types/MeasSystems';

const measSystems: MeasSystems[] = [MeasSystems.IMPERIAL, MeasSystems.METRIC];

export const Measurement = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [currUnits, setCurrUnits] = useState<Units>(
    getUnits(userInfo.measurement.measSystem),
  );
  const [isValidHeight, seValidHeight] = useState(true);
  const [isValidWeight, seValidWeight] = useState(true);

  const setHeight = (value: string) => {
    setUserInfo({
      ...userInfo,
      measurement: {
        ...userInfo.measurement,
        height: value,
      },
    });
  };

  const setWeight = (value: string) => {
    setUserInfo({
      ...userInfo,
      measurement: {
        ...userInfo.measurement,
        weight: value,
      },
    });
  };

  const onChangeUnit = (value: MeasSystems) => {
    setUserInfo({
      ...userInfo,
      measurement: {
        weight: '',
        height: '',
        measSystem: value,
      },
    });
    seValidHeight(true);
    seValidWeight(true);
  };

  const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    seValidHeight(!isNaN(+value));
    setHeight(value);
  };

  const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    seValidWeight(!isNaN(+value));
    setWeight(e.currentTarget.value);
  };

  useEffect(() => {
    const units = getUnits(userInfo.measurement.measSystem);

    setCurrUnits(units);
  }, [userInfo.measurement.measSystem]);

  return (
    <div
      className="app__measurement measurement _container--local"
      data-testid="measurement"
    >
      <div className="titlebox">
        <h2 className="titlebox__title">Measure Yourself</h2>
        <p className="titlebox__description">
          What are your height and body weight?
        </p>
      </div>

      <div className="measurement__units">
        {measSystems.map((measSystem) => (
          <Fragment key={measSystem}>
            <label
              htmlFor={`${measSystem}_unit`}
              className={cn('measurement__unit-label', {
                'measurement__unit-label--active':
                  measSystem === userInfo.measurement.measSystem,
              })}
            >
              {measSystem[0].toUpperCase() + measSystem.slice(1)}
            </label>
            <input
              type="radio"
              name="unit"
              value={measSystem}
              id={`${measSystem}_unit`}
              className="measurement__unit-input"
              onChange={() => onChangeUnit(measSystem)}
            />
          </Fragment>
        ))}
      </div>

      <div className="measurement__data-container">
        <input
          type="text"
          className={cn('measurement__data', {
            'measurement__data--not-valid': !isValidHeight,
          })}
          placeholder={`Height(${currUnits.height})`}
          value={userInfo.measurement.height}
          onChange={onChangeHeight}
        />
        <input
          type="text"
          className={cn('measurement__data', {
            'measurement__data--not-valid': !isValidWeight,
          })}
          placeholder={`Currant Weight(${currUnits.weight})`}
          value={userInfo.measurement.weight}
          onChange={onChangeWeight}
        />
      </div>

      <ContinueButton
        path={'behaviors'}
        isDisabled={
          !isValidHeight ||
          !isValidWeight ||
          !userInfo.measurement.height ||
          !userInfo.measurement.weight
        }
      />
    </div>
  );
};
