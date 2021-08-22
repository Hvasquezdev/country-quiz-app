import { createApp } from 'vue';
import App from './App.vue';

import ApiCountriesDataService from '@/core/services/CountriesData/api.CountriesData.service';
import QuestionTypeCountryCapital from './core/services/Question/QuestionTypeCountryCapital.service';
import QuestionTypeFlagCountry from './core/services/Question/QuestionTypeFlagCountry.service';
import QuestionTypeCountryRegion from './core/services/Question/QuestionTypeCountryRegion.service';
import QuestionTypeCountryFrontier from './core/services/Question/QuestionTypeCountryFrontier.service';
import QuestionTypeSubregionRegion from './core/services/Question/QuestionTypeSubregionRegion.service';

const PRUEBA = new ApiCountriesDataService();
const PRUEBA2 = new QuestionTypeCountryCapital();
const PRUEBA3 = new QuestionTypeFlagCountry();
const PRUEBA4 = new QuestionTypeCountryRegion();
const PRUEBA5 = new QuestionTypeCountryFrontier();
const PRUEBA6 = new QuestionTypeSubregionRegion();

const test = async () => {
  const data = await PRUEBA.getData();
  const r2 = PRUEBA2.getQuestion(data);
  const r3 = PRUEBA3.getQuestion(data);
  const r4 = PRUEBA4.getQuestion(data);
  const r5 = PRUEBA5.getQuestion(data);
  const r6 = PRUEBA6.getQuestion(data);

  console.log(data);
  console.log(r2);
  console.log(r3);
  console.log(r4);
  console.log(r5);
  console.log(r6);
};

test();

createApp(App).mount('#app');
