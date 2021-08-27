import { QuestionType, QuestionTypes } from '@/core/domain/models/QuestionType';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { QuestionService } from '@/core/domain/services/Question.service';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { Question } from '@/core/domain/models/Question';

// Question type classes
import QuestionTypeFlagCountry from './QuestionTypeFlagCountry.service';
import QuestionTypeCountryCapital from './QuestionTypeCountryCapital.service';
import QuestionTypeCountryFrontier from './QuestionTypeCountryFrontier.service';
import QuestionTypeCountryRegion from './QuestionTypeCountryRegion.service';
import QuestionTypeSubregionRegion from './QuestionTypeSubregionRegion.service';
import QuestionTypePopulationCountry from './QuestionTypePopulationCountry.service';

export default class LocalQuestionService implements QuestionService {
  private getQuestionInstance = (
    questionType: QuestionType
  ): QuestionInstance => {
    switch (questionType) {
      case QuestionTypes.FLAG_COUNTRY:
        return new QuestionTypeFlagCountry();

      case QuestionTypes.SUBREGION_REGION:
        return new QuestionTypeSubregionRegion();

      case QuestionTypes.COUNTRY_REGION:
        return new QuestionTypeCountryRegion();

      case QuestionTypes.COUNTRY_CAPITAL:
        return new QuestionTypeCountryCapital();

      case QuestionTypes.COUNTRY_FRONTIER:
        return new QuestionTypeCountryFrontier();

      case QuestionTypes.POPULATION_COUNTRY:
        return new QuestionTypePopulationCountry();

      default:
        return new QuestionTypeCountryCapital();
    }
  };

  public getQuestionByType = (
    questionType: QuestionType,
    countriesData: CountriesData
  ): Question => {
    return this.getQuestionInstance(questionType).getQuestion(countriesData);
  };
}
