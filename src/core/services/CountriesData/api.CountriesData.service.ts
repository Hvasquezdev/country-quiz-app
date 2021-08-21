import { ApiCountry } from '@/core/domain/models/ApiCountry';
import { Countries } from '@/core/domain/models/Countries';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Country } from '@/core/domain/models/Country';
import { Region } from '@/core/domain/models/Region';
import { Regions } from '@/core/domain/models/Regions';
import { SubRegion } from '@/core/domain/models/SubRegion';
import { CountriesDataService } from '@/core/domain/services/CountriesData.service';
import { getParsedStringName } from '@/core/utils';

export default class ApiCountriesDataService implements CountriesDataService {
  private getParsedCountryData = (country: ApiCountry): Country => {
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

  private getParsedSubRegionData = (country: ApiCountry): SubRegion => {
    return {
      id: getParsedStringName(country.subregion),
      name: country.subregion,
    };
  };

  private getParsedRegionData = (country: ApiCountry): Region => {
    return {
      id: getParsedStringName(country.region),
      name: country.region,
      subRegions: {
        [getParsedStringName(country.subregion)]:
          this.getParsedSubRegionData(country),
      },
    };
  };

  private getParsedData = (countryList: Array<ApiCountry>): CountriesData => {
    const countries = {} as Countries;
    const regions = {} as Regions;

    countryList.forEach((country: ApiCountry) => {
      const countryParsedName = country.alpha3Code;
      const regionParsedName = getParsedStringName(country.region);
      const subRegionName = getParsedStringName(country.subregion);

      if (regionParsedName && subRegionName) {
        if (!(countryParsedName in countries)) {
          countries[countryParsedName] = this.getParsedCountryData(country);
        }

        if (!(regionParsedName in regions)) {
          regions[regionParsedName] = this.getParsedRegionData(country);
        } else {
          regions[regionParsedName].subRegions[subRegionName] =
            this.getParsedSubRegionData(country);
        }
      }
    });

    return {
      countries,
      regions,
    };
  };

  public getData = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data: Array<ApiCountry> = await response.json();

    const { countries, regions } = this.getParsedData(data);

    return {
      countries,
      regions,
    };
  };
}
