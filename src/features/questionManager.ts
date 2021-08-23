import { CountriesData } from '@/core/domain/models/CountriesData';
import { GenericObject } from '@/core/domain/models/GenericObject';
import { Question } from '@/core/domain/models/Question';
import { QuestionType } from '@/core/domain/models/QuestionType';
import { ref } from 'vue';
import LocalQuestionService from '@/core/services/Question/Question.service';
import { questionLabels } from '@/core/constants/questionLabels';

export const questionManager = (): GenericObject => {
  const QuestionService = new LocalQuestionService();
  const creatingQuestion = ref(false);
  const question = ref(null as Question | null);

  const createQuestion = (
    questionType: QuestionType,
    countriesData: CountriesData
  ) => {
    return QuestionService.getQuestionByType(questionType, countriesData);
  };

  const getRandomType = () => {
    const questionTypes = Object.keys(questionLabels);
    const randomIndex = Math.floor(Math.random() * questionTypes.length);
    return questionTypes[randomIndex] as QuestionType;
  };

  const initQuestionGeneration = (countriesData: CountriesData): void => {
    creatingQuestion.value = true;
    question.value = createQuestion(getRandomType(), countriesData);
    creatingQuestion.value = false;
  };

  return {
    creatingQuestion,
    question,
    createQuestion,
    initQuestionGeneration,
  };
};
