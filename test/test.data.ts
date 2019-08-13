import { Agency } from '../src/domain/practices/agency';
import { County } from '../src/domain/locations/county';
import { Facility } from '../src/domain/practices/facility';
import { Mechanism } from '../src/domain/practices/mechanism';

export const getTestCounties = (count = 2) => {
  const cars: County[] = [];
  for (let i = 0; i < count; i++) {
    cars.push(new County(i, `county${i}`));
  }
  return cars;
};

export const getTestAgencies = (count = 2) => {
  const cars: Agency[] = [];
  for (let i = 0; i < count; i++) {
    cars.push(new Agency(`agency${i}`, `agency ${i}`));
  }
  return cars;
};

export const getTestFacilities = (count = 2) => {
  const cars: Facility[] = [];
  for (let i = 0; i < count; i++) {
    cars.push(new Facility(i * 100, `fac${i}`));
  }
  return cars;
};

export const getTestMechanisms = (count = 2) => {
  const cars: Mechanism[] = [];
  for (let i = 0; i < count; i++) {
    cars.push(new Mechanism(`code${i}`, `name${i}`, `imp-name${i}`));
  }
  return cars;
};
