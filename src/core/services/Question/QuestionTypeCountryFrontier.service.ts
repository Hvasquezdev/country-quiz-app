import { questionLabels } from '@/core/constants/questionLabels';
import { questionsCount } from '@/core/constants/questionsCount';
import { Answer } from '@/core/domain/models/Answer';
import { Countries } from '@/core/domain/models/Countries';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { GenericObject } from '@/core/domain/models/GenericObject';
import { Question } from '@/core/domain/models/Question';
import { QuestionType } from '@/core/domain/models/QuestionType';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { suffleArrayOfObjects } from '@/core/utils';
import { getRandomCountry } from '@/core/utils/countryUtils';

export default class QuestionTypeCountryFrontier implements QuestionInstance {
  private _questionType: QuestionType = 'country-frontier';

  private getRandomWrongAnswers = (
    countries: Countries,
    mainCountry: string,
    borders: Array<string>
  ): Array<Answer> => {
    const countryList = { ...countries };
    const wrongAnswers = [] as Array<Answer>;

    // Delete main country before start asnwers generation
    delete countryList[mainCountry];

    borders.forEach((border: string) => {
      delete countryList[border];
    });

    for (let i = 0; i < questionsCount - 1; i++) {
      const randomCountry = getRandomCountry(countryList);

      wrongAnswers.push({
        label: randomCountry.name,
        isCorrect: false,
      });

      delete countryList[randomCountry.id];
    }

    return wrongAnswers;
  };

  public getQuestion = (countriesData: CountriesData): Question => {
    const { countries } = countriesData;

    const correctCountry = getRandomCountry(countries);

    const randomBorderId = Math.floor(
      Math.random() * correctCountry.borders.length
    );

    const correctAnswer: Answer = {
      label: countries[correctCountry.borders[randomBorderId]].name,
      isCorrect: true,
    };

    const wrongAnswers = this.getRandomWrongAnswers(
      countries,
      correctCountry.id,
      correctCountry.borders
    );

    return {
      answers: suffleArrayOfObjects([
        correctAnswer,
        ...wrongAnswers,
      ] as Array<GenericObject>) as Array<Answer>,
      image: '',
      label: `${correctCountry.name} ${questionLabels[this._questionType]}`,
      type: this._questionType as QuestionType,
    };
  };
}
