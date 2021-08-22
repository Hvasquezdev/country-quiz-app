import { createApp } from 'vue';
import App from './App.vue';

import ApiCountriesDataService from '@/core/services/CountriesData/api.CountriesData.service';
import LocalQuestionTypeCountryCapital from './core/services/Question/local.QuestionTypeCountryCapital.service';
import WhichCountryDoesThisFlagBelongTo from './core/services/Question/WhichCountryDoesThisFlagBelongTo.service';

const PRUEBA = new ApiCountriesDataService();
const PRUEBA2 = new LocalQuestionTypeCountryCapital();
const PRUEBA3 = new WhichCountryDoesThisFlagBelongTo();

const test = async () => {
  const data = await PRUEBA.getData();
  const r2 = PRUEBA2.getQuestion(data);
  const r3 = PRUEBA3.getQuestion(data);

  console.log(r2);
  console.log(r3);
}

test();

createApp(App).mount('#app');
