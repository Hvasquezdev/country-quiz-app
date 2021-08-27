import { questionLabels } from '@/core/constants/questionLabels';
import { Answer } from '@/core/domain/models/Answer';
import { Countries } from '@/core/domain/models/Countries';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Country } from '@/core/domain/models/Country';
import { Question } from '@/core/domain/models/Question';
import { QuestionType, QuestionTypes } from '@/core/domain/models/QuestionType';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { shuffleArrayOfObjects } from '@/core/utils';
import { getRandomCountry } from '@/core/utils/countryUtils';

export default class QuestionTypeCountryCapital implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.COUNTRY_CAPITAL;

  private getCorrectAnswer = (country: Country): Answer => {
    return {
      label: country.capital || country.name,
      isCorrect: true,
    };
  };

  private getRandomWrongAnswers = (
    countries: Countries,
    mainCountry: string
  ): Array<Answer> => {
    const countryList = { ...countries };
    const wrongAnswers = [] as Array<Answer>;

    // Delete main country before start asnwers generation
    delete countryList[mainCountry];

    for (let i = 0; i < 3; i++) {
      const randomCountry = getRandomCountry(countryList);

      wrongAnswers.push({
        label: randomCountry.capital || randomCountry.name,
        isCorrect: false,
      });

      delete countryList[randomCountry.id];
    }

    return wrongAnswers;
  };

  private getAnswers = (
    countries: Countries,
    mainCountry: Country
  ): Array<Answer> => {
    const correctAnswer = this.getCorrectAnswer(mainCountry);
    const wrongAnswers = this.getRandomWrongAnswers(countries, mainCountry.id);
    const answers = shuffleArrayOfObjects([correctAnswer, ...wrongAnswers]);

    return answers as Array<Answer>;
  };

  public getQuestion = (countriesData: CountriesData): Question => {
    const mainCountry = getRandomCountry(countriesData.countries);
    const questionTypeLabel = questionLabels[this._questionType];
    const answers = this.getAnswers(countriesData.countries, mainCountry);

    return {
      answers,
      image: '',
      label: `${questionTypeLabel} ${mainCountry.name}?`,
      type: this._questionType,
    };
  };
}
