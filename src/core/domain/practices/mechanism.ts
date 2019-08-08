import { Agency } from './agency';
import { Facility } from './facility';

export interface Mechanism {
  code: number;
  name: string;
  implementationName: string;
  display: string;
  agency: Agency;
  facilities: Facility[];
}
