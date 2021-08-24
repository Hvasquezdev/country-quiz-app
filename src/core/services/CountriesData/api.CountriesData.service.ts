import { ApiCountry } from '@/core/domain/models/ApiCountry';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { CountriesDataService } from '@/core/domain/services/CountriesData.service';
import { delay } from '@/core/utils';
import { getParsedData } from '@/core/utils/countryUtils';

export default class ApiCountriesDataService implements CountriesDataService {
  public getData = async (): Promise<CountriesData> => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data: Array<ApiCountry> = await response.json();

    await delay(2000);

    const { countries, regions } = getParsedData(data);

    return {
      countries,
      regions,
    };
  };
}
