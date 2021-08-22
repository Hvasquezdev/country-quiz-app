import { QuestionType } from '@/core/domain/models/QuestionType';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { QuestionService } from '@/core/domain/services/Question.service';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';

// Question type classes
import QuestionTypeFlagCountry from './QuestionTypeFlagCountry.service';
import QuestionTypeCountryCapital from './QuestionTypeCountryCapital.service';
import QuestionTypeCountryFrontier from './QuestionTypeCountryFrontier.service';
import QuestionTypeCountryRegion from './QuestionTypeCountryRegion.service';
import { Question } from '@/core/domain/models/Question';

export default class LocalQuestionService implements QuestionService {
  private getQuestionInstance = (
    questionType: QuestionType
  ): QuestionInstance => {
    switch (questionType) {
      case 'flag-country':
        return new QuestionTypeFlagCountry();

      case 'subregion-region':
        return {} as QuestionInstance;

      case 'country-region':
        return new QuestionTypeCountryRegion();

      case 'country-capital':
        return new QuestionTypeCountryCapital();

      case 'country-frontier':
        return new QuestionTypeCountryFrontier();

      default:
        return {} as QuestionInstance;
    }
  };

  public getQuestionByType = (
    questionType: QuestionType,
    countriesData: CountriesData
  ): Question => {
    return this.getQuestionInstance(questionType).getQuestion(countriesData);
  };
}
