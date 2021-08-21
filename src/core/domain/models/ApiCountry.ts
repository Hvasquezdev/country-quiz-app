interface ApiCountry {
  name: string;
  topLevelDomain: Array<string>;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: Array<string>;
  capital: string;
  altSpellings: Array<string>;
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: string;
  gini: string;
  timezones: Array<string>;
  borders: Array<string>;
  nativeName: string;
  numericCode: string;
  currencies: Array<{
    code: string;
    name: string;
    symbol: string;
  }>;
  translations: {
    [key: string]: string;
  };
  flag: string;
  regionalBlocs: Array<{
    acronym: string;
    name: string;
    otherAcronyms: Array<string>;
    otherNames: Array<string>;
  }>;
  cioc: string;
}

export { ApiCountry };
