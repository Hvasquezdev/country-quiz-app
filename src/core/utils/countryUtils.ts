import { ApiCountry } from '@/core/domain/models/ApiCountry';
import { Countries } from '@/core/domain/models/Countries';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Country } from '@/core/domain/models/Country';
import { Region } from '@/core/domain/models/Region';
import { Regions } from '@/core/domain/models/Regions';
import { SubRegion } from '@/core/domain/models/SubRegion';
import { getParsedStringName, getRandomIndexes } from '@/core/utils';
import { Answer } from '../domain/models/Answer';

const getRandomCountry = (countries: Countries): Country => {
  const countriesKey = Object.keys(countries);
  const randomKey = Math.floor(Math.random() * countriesKey.length);
  const randomCountry = countries[countriesKey[randomKey]];

  return randomCountry;
};

const getParsedCountryData = (country: ApiCountry): Country => {
  return {
    borders: country.borders,
    capital: country.capital,
    flag: country.flag,
    id: country.alpha3Code,
    name: country.name,
    region: country.region,
    subregion: country.subregion,
  };
};

const getParsedSubRegionData = (country: ApiCountry): SubRegion => {
  return {
    id: getParsedStringName(country.subregion),
    name: country.subregion,
  };
};

const getParsedRegionData = (country: ApiCountry): Region => {
  return {
    id: getParsedStringName(country.region),
    name: country.region,
    subRegions: {
      [getParsedStringName(country.subregion)]: getParsedSubRegionData(country),
    },
  };
};

const getParsedData = (countryList: Array<ApiCountry>): CountriesData => {
  const countries = {} as Countries;
  const regions = {} as Regions;

  countryList.forEach((country: ApiCountry) => {
    const countryParsedName = country.alpha3Code;
    const regionParsedName = getParsedStringName(country.region);
    const subRegionName = getParsedStringName(country.subregion);

    if (regionParsedName && subRegionName) {
      if (!(countryParsedName in countries)) {
        countries[countryParsedName] = getParsedCountryData(country);
      }

      if (!(regionParsedName in regions)) {
        regions[regionParsedName] = getParsedRegionData(country);
      } else {
        regions[regionParsedName].subRegions[subRegionName] =
          getParsedSubRegionData(country);
      }
    }
  });

  return {
    countries,
    regions,
  };
};

const getCountriesLength = (countries: Countries): number => {
  return Object.keys(countries).length;
};

const getRandomCountries = (
  countries: Countries,
  quantity: number
): Array<Country> => {
  const indexes = getRandomIndexes(quantity, getCountriesLength(countries)).map(
    (randomIndex) => Object.values(countries)[randomIndex]
  );

  return indexes.map((country) => countries[country.id]);
};

const getAnswersWithCountryNameAsLabel = (
  countries: Country[],
  correctCountryId: string
): Array<Answer> => {
  return countries.map((country): Answer => {
    const answer: Answer = {
      label: country.name,
      isCorrect: false,
    };

    if (country.id === correctCountryId) answer.isCorrect = true;

    return answer;
  });
};

export {
  getParsedCountryData,
  getParsedSubRegionData,
  getParsedRegionData,
  getParsedData,
  getRandomCountries,
  getAnswersWithCountryNameAsLabel,
  getRandomCountry,
};
