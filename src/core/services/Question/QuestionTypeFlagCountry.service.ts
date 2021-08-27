import { CountriesData } from '@/core/domain/models/CountriesData';
import { Question } from '@/core/domain/models/Question';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { questionLabels } from '@/core/constants/questionLabels';
import { questionsCount } from '@/core/constants/questionsCount';
import { QuestionType, QuestionTypes } from '@/core/domain/models/QuestionType';
import {
  getAnswersWithCountryNameAsLabel,
  getRandomCountries,
} from '@/core/utils/countryUtils';
import { shuffleArrayOfObjects } from '@/core/utils';
import { Answer } from '@/core/domain/models/Answer';
import { GenericObject } from '@/core/domain/models/GenericObject';

export default class QuestionTypeFlagCountry implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.FLAG_COUNTRY;

  public getQuestion = (countriesData: CountriesData): Question => {
    const { countries } = countriesData;

    const randomCountries = getRandomCountries(countries, questionsCount);

    const correctCountry = randomCountries[0];

    const answers = getAnswersWithCountryNameAsLabel(
      randomCountries,
      correctCountry.id
    );

    return {
      answers: shuffleArrayOfObjects(
        answers as Array<GenericObject>
      ) as Array<Answer>,
      image: correctCountry.flag,
      label: questionLabels[this._questionType],
      type: this._questionType,
    };
  };
}
