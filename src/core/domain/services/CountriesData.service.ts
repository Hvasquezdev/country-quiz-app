import { CountriesData } from '../models/CountriesData';

interface CountriesDataService {
  getData(): Promise<CountriesData>;
}

export { CountriesDataService };
