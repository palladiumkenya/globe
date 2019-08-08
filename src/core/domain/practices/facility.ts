import { County } from '../locations/county';

export interface Facility {
  code: number;
  name: string;
  county: County;
}

