import { CountriesData } from '../models/CountriesData';
import { Country } from '../models/Country';
import { Question } from '../models/Question';
import { QuestionType } from '../models/QuestionType';

interface QuestionService {
  getQuestionByType: (
    questionType: QuestionType,
    countriesData: CountriesData
  ) => Question;

  getQuestionByCountry: (
    randomCountry: Country,
    countriesData: CountriesData
  ) => Question;
}

export { QuestionService };
