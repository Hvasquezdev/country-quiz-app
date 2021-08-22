import { QuestionType } from '@/core/domain/models/QuestionType';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { QuestionService } from '@/core/domain/services/Question.service';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';

export default class LocalQuestionService implements QuestionService {
  private getQuestionInstance = (
    questionType: QuestionType
  ): QuestionInstance => {
    switch (questionType) {
      case 'flag-country':
        return {} as QuestionInstance;

      case 'subregion-region':
        return {} as QuestionInstance;

      case 'country-region':
        return {} as QuestionInstance;

      case 'country-capital':
        return {} as QuestionInstance;

      case 'country-frontier':
        return {} as QuestionInstance;

      default:
        return {} as QuestionInstance;
    }
  };

  public getQuestionByType = (questionType: QuestionType, countriesData: CountriesData) => {
    return this.getQuestionInstance(questionType).getQuestion(countriesData);
  };
}
