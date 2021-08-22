import { createApp } from 'vue';
import App from './App.vue';

import ApiCountriesDataService from '@/core/services/CountriesData/api.CountriesData.service';
import QuestionTypeCountryCapital from './core/services/Question/QuestionTypeCountryCapital.service';
import QuestionTypeFlagCountry from './core/services/Question/QuestionTypeFlagCountry.service';

const PRUEBA = new ApiCountriesDataService();
const PRUEBA2 = new QuestionTypeCountryCapital();
const PRUEBA3 = new QuestionTypeFlagCountry();

const test = async () => {
  const data = await PRUEBA.getData();
  console.log(data);
  const r2 = PRUEBA2.getQuestion(data);
  const r3 = PRUEBA3.getQuestion(data);

  console.log(r2);
  console.log(r3);
};

test();

createApp(App).mount('#app');
