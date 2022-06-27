import { ref } from 'vue';
import { CountriesData } from '@/core/domain/models/CountriesData';
import ApiCountriesDataService from '@/core/services/CountriesData/api.restcountriesV3.service';
import { GenericObject } from '@/core/domain/models/GenericObject';

export const countriesDataManager = (): GenericObject => {
  const CountriesDataService = new ApiCountriesDataService();
  const loadingData = ref(false);
  const hasError = ref(false);
  const countriesData = ref(null as CountriesData | null);

  const getCountriesData = async (): Promise<void> => {
    try {
      hasError.value = false;
      loadingData.value = true;

      const response = await CountriesDataService.getData();

      countriesData.value = response;
    } catch (e) {
      console.log(e);
      hasError.value = true;
    } finally {
      loadingData.value = false;
    }
  };

  return {
    loadingData,
    countriesData,
    hasError,
    getCountriesData,
  };
};
