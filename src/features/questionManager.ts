import { CountriesData } from '@/core/domain/models/CountriesData';
import { GenericObject } from '@/core/domain/models/GenericObject';
import { Question } from '@/core/domain/models/Question';
import { ref } from 'vue';
import { QuestionServiceV2 } from '@/core/services/Question/QuestionV2.service';
import { Country } from '@/core/domain/models/Country';
import { getRandomCountry } from '@/core/utils/countryUtils';

export const questionManager = (): GenericObject => {
  const QuestionService = new QuestionServiceV2();
  const creatingQuestion = ref(false);
  const question = ref(null as Question | null);

  const createQuestion = (
    randomCountry: Country,
    countriesData: CountriesData
  ) => {
    return QuestionService.getQuestionByCountry(randomCountry, countriesData);
  };

  const initQuestionGeneration = (countriesData: CountriesData): void => {
    creatingQuestion.value = true;

    question.value = createQuestion(
      getRandomCountry(countriesData.countries),
      countriesData
    );

    creatingQuestion.value = false;
  };

  return {
    creatingQuestion,
    question,
    createQuestion,
    initQuestionGeneration,
  };
};
