import { ApiCountry } from '@/core/domain/models/ApiCountry';
import { Countries } from '@/core/domain/models/Countries';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Country } from '@/core/domain/models/Country';
import { Region } from '@/core/domain/models/Region';
import { Regions } from '@/core/domain/models/Regions';
import { SubRegion } from '@/core/domain/models/SubRegion';
import { getParsedStringName, getRandomIndexes } from '@/core/utils';
import { Answer } from '../domain/models/Answer';
import { ApiCountryV3 } from '../domain/models/ApiCountryV3';
import { QuestionType, QuestionTypes } from '../domain/models/QuestionType';

const getRandomCountry = (countries: Countries): Country => {
  const countriesKey = Object.keys(countries);
  const randomKey = Math.floor(Math.random() * countriesKey.length);
  const randomCountry = countries[countriesKey[randomKey]];

  return randomCountry;
};

const getRandomCountryWithBorders = (countries: Countries): Country => {
  const countriesWithBorder = Object.values(countries).filter(
    (country) => country.borders.length > 0
  );

  const randomKey = Math.floor(Math.random() * countriesWithBorder.length);

  const randomCountry = countries[countriesWithBorder[randomKey].id];

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
    population: country.population,
  };
};

const getParsedSubRegionData = (
  country: ApiCountry | ApiCountryV3
): SubRegion => {
  return {
    id: getParsedStringName(country.subregion),
    name: country.subregion,
  };
};

const getParsedRegionData = (country: ApiCountry | ApiCountryV3): Region => {
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

const getSortedCountriesByPopulation = (
  countries: Array<Country>
): Country[] => {
  return [...countries].sort(
    (countryA, countryB) => countryB.population - countryA.population
  );
};

const getCountryQuestionTypes = (
  country: ApiCountry | ApiCountryV3
): QuestionType[] => {
  const types = {
    [QuestionTypes.COUNTRY_CAPITAL]: !!country.capital,
    [QuestionTypes.COUNTRY_FRONTIER]: !!country.borders,
    [QuestionTypes.COUNTRY_REGION]: !!country.region,
    [QuestionTypes.FLAG_COUNTRY]: Boolean(
      country.flag ||
        (country as ApiCountryV3).flags.png ||
        (country as ApiCountryV3).flags.svg
    ),
    [QuestionTypes.POPULATION_COUNTRY]: Number.isInteger(country.population),
  } as { [key in QuestionType]?: boolean };

  return Object.entries(types)
    .filter((item) => item[1])
    .map((item) => item[0] as QuestionType);
};

const getRandomRegion = (regions: Regions): Region => {
  const regionKeys = Object.keys(regions);
  const randomKey = Math.floor(Math.random() * regionKeys.length);
  const randomRegion = regions[regionKeys[randomKey]];

  return randomRegion;
};

export {
  getParsedCountryData,
  getParsedSubRegionData,
  getParsedRegionData,
  getParsedData,
  getRandomCountries,
  getAnswersWithCountryNameAsLabel,
  getRandomCountry,
  getRandomCountryWithBorders,
  getSortedCountriesByPopulation,
  getCountryQuestionTypes,
  getRandomRegion,
};
