import { ref } from 'vue';
import { CountriesData } from '@/core/domain/models/CountriesData';
import ApiCountriesDataService from '@/core/services/CountriesData/api.CountriesData.service';
import { GenericObject } from '@/core/domain/models/GenericObject';

export const countriesDataManager = (): GenericObject => {
  const CountriesDataService = new ApiCountriesDataService();
  const loadingData = ref(false);
  const countriesData = ref(null as CountriesData | null);

  const getCountriesData = async (): Promise<void> => {
    try {
      loadingData.value = true;

      const response = await CountriesDataService.getData();

      countriesData.value = response;
    } finally {
      loadingData.value = false;
    }
  };

  return {
    loadingData,
    countriesData,
    getCountriesData,
  };
};
