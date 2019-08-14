import { Agency } from '../src/domain/practices/agency';
import { County } from '../src/domain/locations/county';
import { Facility } from '../src/domain/practices/facility';
import { Mechanism } from '../src/domain/practices/mechanism';

export const getTestCounties = (count = 2) => {
  const data: County[] = [];
  for (let i = 0; i < count; i++) {
    data.push(new County(i, `county${i}`));
  }
  return data;
};

export const getTestAgencies = (count = 2) => {
  const data: Agency[] = [];
  for (let i = 0; i < count; i++) {
    data.push(new Agency(`agency${i}`, `agency ${i}`));
  }
  return data;
};

export const getTestFacilities = (count = 2) => {
  const data: Facility[] = [];
  for (let i = 0; i < count; i++) {
    data.push(new Facility(i * 100, `fac${i}`));
  }
  return data;
};

export const getTestMechanisms = (count = 2) => {
  const data: Mechanism[] = [];
  for (let i = 0; i < count; i++) {
    data.push(new Mechanism(`code${i}`, `name${i}`, `imp-name${i}`));
  }
  return data;
};

export const getTestAgencyWithMechanisms = (acount = 1, count = 2) => {
  const agencies: Agency[] = getTestAgencies(acount);

  agencies.forEach(a => {
    const data: Mechanism[] = [];
    for (let i = 0; i < count; i++) {
      data.push(new Mechanism(`mc-code${i}`, `mc-name${i}`, `mc-imp-name${i}`));
    }
    data.forEach(m => a.addMechanism(m));
  });

  return agencies;
};

export const getTestMechanismWithFacilites = (mcount = 1, count = 2) => {
  const agency: Agency = getTestAgencyWithMechanisms(1, 1)[0];
  const mechanisms: Mechanism[] = agency.mechanisms;

  mechanisms.forEach(a => {
    const data: Facility[] = [];
    for (let i = 0; i < count; i++) {
      data.push(new Facility(i * 47, `fac-name${i}`));
    }
    data.forEach(f => a.addFacility(f));
  });

  return mechanisms;
};
