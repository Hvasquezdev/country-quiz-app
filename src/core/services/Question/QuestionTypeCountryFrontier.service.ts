import { questionLabels } from '@/core/constants/questionLabels';
import { questionsCount } from '@/core/constants/questionsCount';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Question } from '@/core/domain/models/Question';
import { QuestionType } from '@/core/domain/models/QuestionType';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { suffleArrayOfObjects } from '@/core/utils';
import {
  getAnswersWithCountryNameAsLabel,
  getRandomCountries,
} from '@/core/utils/countryUtils';

export default class QuestionTypeCountryFrontier implements QuestionInstance {
  private _questionType: QuestionType = 'country-frontier';

  public getQuestion = (countriesData: CountriesData): Question => {
    const { countries } = countriesData;

    const countriesWithBorders = Object.values(countries).filter(
      (country) => country.borders.length > 0
    );

    const randomCountries = getRandomCountries(countries, questionsCount);

    const correctCountry = randomCountries[0];

    const answers = getAnswersWithCountryNameAsLabel(
      randomCountries,
      correctCountry.id
    );

    return {
      answers: suffleArrayOfObjects(answers),
      image: '',
      label: `${correctCountry.name} ${questionLabels[this._questionType]}`,
      type: this._questionType as QuestionType,
    };
  };
}
