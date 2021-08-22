import { createApp } from 'vue';
import App from './App.vue';

import ApiCountriesDataService from '@/core/services/CountriesData/api.CountriesData.service';
import QuestionTypeCountryCapital from './core/services/Question/QuestionTypeCountryCapital.service';
import QuestionTypeFlagCountry from './core/services/Question/QuestionTypeFlagCountry.service';
import QuestionTypeCountryFrontier from './core/services/Question/QuestionTypeCountryFrontier.service';

const TEST = new ApiCountriesDataService();
const TEST2 = new QuestionTypeCountryCapital();
const TEST3 = new QuestionTypeFlagCountry();
const TEST4 = new QuestionTypeCountryFrontier();

const test = async () => {
  const data = await TEST.getData();
  console.log(data);
  const r2 = TEST2.getQuestion(data);
  const r3 = TEST3.getQuestion(data);
  const r4 = TEST4.getQuestion(data);

  console.log(r2);
  console.log(r3);
  console.log(r4);
};

test();

createApp(App).mount('#app');
