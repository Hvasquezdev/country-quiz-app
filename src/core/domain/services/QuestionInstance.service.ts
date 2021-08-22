import { CountriesData } from '../models/CountriesData';
import { Question } from '../models/Question';

interface QuestionInstance {
  getQuestion(countriesData: CountriesData): Question;
}

export { QuestionInstance };
