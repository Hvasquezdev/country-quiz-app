import { CountriesData } from '@/core/domain/models/CountriesData';
import { CountriesDataService } from '@/core/domain/services/CountriesData.service';
import { Countries } from '@/core/domain/models/Countries';
import { Regions } from '@/core/domain/models/Regions';
import { ApiCountryV3 } from '@/core/domain/models/ApiCountryV3';
import { Country } from '@/core/domain/models/Country';
import {
  getParsedRegionData,
  getParsedSubRegionData,
} from '@/core/utils/countryUtils';
import { getParsedStringName } from '@/core/utils';

export default class ApiCountriesDataV3Service implements CountriesDataService {
  public getData = async (): Promise<CountriesData> => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data: Array<ApiCountryV3> = await response.json();

    const { countries, regions } = this.getParsedData(data);

    return {
      countries,
      regions,
    };
  };

  private getParsedData = (countryList: Array<ApiCountryV3>): CountriesData => {
    const countries = {} as Countries;
    const regions = {} as Regions;

    const filteredList = countryList.filter(
      ({ cca3, capital, region, subregion, borders }) => {
        return (
          cca3 &&
          capital &&
          capital.length &&
          region &&
          subregion &&
          borders &&
          borders.length
        );
      }
    );

    filteredList.forEach((country: ApiCountryV3) => {
      const countryID = country.cca3;
      const regionParsedName = getParsedStringName(country.region);
      const subRegionName = getParsedStringName(country.subregion);

      if (regionParsedName && subRegionName) {
        if (!(countryID in countries)) {
          countries[countryID] = this.getParsedCountryData(country);
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

  private getParsedCountryData = (country: ApiCountryV3): Country => {
    return {
      borders: country.borders,
      capital: country.capital[0],
      flag: (country.flags.svg || country.flags.png) as string,
      id: country.cca3 || country.cca2,
      name: country.name.common,
      population: country.population,
      region: country.region,
      subregion: country.subregion,
    };
  };
}
