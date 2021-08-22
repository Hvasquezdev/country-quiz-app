import { QuestionType } from '@/core/domain/models/QuestionType';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { QuestionService } from '@/core/domain/services/Question.service';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';

// Question type classes
import QuestionTypeFlagCountry from './QuestionTypeFlagCountry.service';
import QuestionTypeCountryCapital from './QuestionTypeCountryCapital.service';

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
        return {} as QuestionInstance;

      case 'country-capital':
        return new QuestionTypeCountryCapital();

      case 'country-frontier':
        return {} as QuestionInstance;

      default:
        return {} as QuestionInstance;
    }
  };

  public getQuestionByType = (
    questionType: QuestionType,
    countriesData: CountriesData
  ) => {
    return this.getQuestionInstance(questionType).getQuestion(countriesData);
  };
}
