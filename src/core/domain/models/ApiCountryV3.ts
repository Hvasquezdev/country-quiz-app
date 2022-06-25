interface ApiCountryV3 {
  name: {
    common: string;
    official: string;
    nativeName: {
      ell: {
        official: string;
        common: string;
      };
      tur: {
        official: string;
        common: string;
      };
    };
  };
  tld: Array<string>;
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [currency: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: Array<string>;
  };
  capital: Array<string>;
  altSpellings: Array<string>;
  region: string;
  subregion: string;
  languages: {
    [abbr: string]: string;
  };
  translations: {
    [abbr: string]: {
      official: string;
      common: string;
    };
  };
  latlng: Array<number>;
  landlocked: boolean;
  area: number;
  demonyms: {
    [abbr: string]: {
      f: string;
      m: string;
    };
  };
  flag: string;
  maps: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  population: number;
  gini: {
    [year: string]: number;
  };
  fifa: string;
  car: {
    signs: Array<string>;
    side: string;
  };
  timezones: Array<string>;
  continents: Array<string>;
  flags: {
    png?: string;
    svg?: string;
  };
  coatOfArms: {
    png?: string;
    svg?: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: Array<number>;
  };
  postalCode: {
    format: string;
    regex: string;
  };
}

export { ApiCountryV3 };
