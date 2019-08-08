import { Ward } from './ward';
import { County } from './county';

export interface SubCounty {
  name: string;
  wards: Ward[];
}
