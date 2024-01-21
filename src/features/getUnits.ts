import { MeasSystems } from '../types/MeasSystems';
import { Units } from '../types/Units';

export const getUnits = (measSystem: string): Units => {
  switch (measSystem) {
    case MeasSystems.IMPERIAL:
      return { height: 'ft', weight: 'lb' };

    case MeasSystems.METRIC:
      return { height: 'm', weight: 'kg' };

    default:
      return { height: '', weight: '' };
  }
};
