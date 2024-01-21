import { MeasSystems } from './MeasSystems';

export interface Userinfo {
  goal: string;
  measurement: {
    measSystem: MeasSystems;
    height: string;
    weight: string;
  };
  behaviors: string[];
  exersice: string;
}
