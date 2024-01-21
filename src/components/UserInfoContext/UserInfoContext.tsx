/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useMemo } from 'react';
import { MeasSystems } from '../../types/MeasSystems';
import { Userinfo } from '../../types/UserInfo';

interface ContextType {
  userInfo: Userinfo;
  setUserInfo: React.Dispatch<React.SetStateAction<Userinfo>>;
}

const defaultUserInfo = {
  goal: '',
  measurement: {
    measSystem: MeasSystems.IMPERIAL,
    height: '',
    weight: '',
  },
  behaviors: [],
  exersice: '',
};

export const UserInfoContext = React.createContext<ContextType>({
  userInfo: defaultUserInfo,
  setUserInfo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UserInfoProvider: React.FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<Userinfo>(defaultUserInfo);
  const contextValue = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo],
  );

  return (
    <UserInfoContext.Provider value={contextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};
