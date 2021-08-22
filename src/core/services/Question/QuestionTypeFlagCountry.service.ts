import { Answer } from '@/core/domain/models/Answer';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Question } from '@/core/domain/models/Question';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { questionLabels } from '@/core/constants/questionLabels';
import { questionsCount } from '@/core/constants/questionsCount';
import { QuestionType } from '@/core/domain/models/QuestionType';
import {
  getAnswersWithCountryNameAsLabel,
  getRandomCountries,
} from '@/core/utils/countryUtils';
import { suffleArrayOfObjects } from '@/core/utils';

export default class QuestionTypeFlagCountry implements QuestionInstance {
  private _questionType: QuestionType = 'flag-country';

  public getQuestion = (countriesData: CountriesData): Question => {
    const { countries } = countriesData;

    const randomCountries = getRandomCountries(countries, questionsCount);

    const correctCountry = randomCountries[0];

    const answers = getAnswersWithCountryNameAsLabel(
      randomCountries,
      correctCountry.id
    );

    return {
      answers: suffleArrayOfObjects(answers),
      image: correctCountry.flag,
      label: questionLabels[this._questionType],
      type: this._questionType as QuestionType,
    };
  };
}