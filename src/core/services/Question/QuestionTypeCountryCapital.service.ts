import { questionLabels } from '@/core/constants/questionLabels';
import { Answer } from '@/core/domain/models/Answer';
import { Countries } from '@/core/domain/models/Countries';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Country } from '@/core/domain/models/Country';
import { QuestionType } from '@/core/domain/models/QuestionType';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { suffleArrayOfObjects } from '@/core/utils';

export default class QuestionTypeCountryCapital implements QuestionInstance {
  private _questionType: QuestionType = 'country-capital';

  private getRandomCountry = (countries: Countries): Country => {
    const countriesKey = Object.keys(countries);
    const randomKey = Math.round(Math.random() * countriesKey.length);
    const randomCountry = countries[countriesKey[randomKey]];

    return randomCountry;
  };

  private getCorrectAnswer = (country: Country): Answer => {
    return {
      label: country.capital,
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
      const randomCountry = this.getRandomCountry(countryList);

      wrongAnswers.push({
        label: randomCountry.name,
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
    const answers = suffleArrayOfObjects([correctAnswer, ...wrongAnswers]);

    return answers as Array<Answer>;
  };

  public getQuestion = (countriesData: CountriesData) => {
    const mainCountry = this.getRandomCountry(countriesData.countries);
    const questionTypeLabel = questionLabels[this._questionType];
    const answers = this.getAnswers(countriesData.countries, mainCountry);

    return {
      label: `${mainCountry.name} ${questionTypeLabel}`,
      image: '',
      type: this._questionType,
      answers,
    };
  };
}
