import { CountriesData } from '../models/CountriesData';
import { Question } from '../models/Question';
import { QuestionType } from '../models/QuestionType';

interface QuestionService {
  getQuestionByType(
    questionType: QuestionType,
    countriesData: CountriesData
  ): Question;
}

export { QuestionService };
