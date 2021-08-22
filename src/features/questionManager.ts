import { ref } from 'vue';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Question } from '@/core/domain/models/Question';
import { QuestionType } from '@/core/domain/models/QuestionType';
import LocalQuestionService from '@/core/services/Question/Question.service';
import { GenericObject } from '@/core/domain/models/GenericObject';

export const questionManager = (): GenericObject => {
  const QuestionService = new LocalQuestionService();
  const creatingQuestion = ref(false);
  const question = ref(null as Question | null);

  const initQuestionGeneration = (
    questionType: QuestionType,
    countriesData: CountriesData
  ): void => {
    creatingQuestion.value = true;
    question.value = QuestionService.getQuestionByType(
      questionType,
      countriesData
    );
    creatingQuestion.value = false;
  };

  return {
    creatingQuestion,
    question,
    initQuestionGeneration,
  };
};
