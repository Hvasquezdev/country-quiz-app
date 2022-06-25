import { QuestionType, QuestionTypes } from '@/core/domain/models/QuestionType';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { QuestionService } from '@/core/domain/services/Question.service';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { Question } from '@/core/domain/models/Question';
import { Country } from '@/core/domain/models/Country';
import { getRandomCountry } from '@/core/utils/countryUtils';
import { questionsCount } from '@/core/constants/questionsCount';
import { Answer } from '@/core/domain/models/Answer';
import {
  getCorrectAnswer,
  getRandomIndex,
  shuffleArrayOfObjects,
} from '@/core/utils';
import { questionLabels } from '@/core/constants/questionLabels';

class CountryCapitalQuestion implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.COUNTRY_CAPITAL;

  constructor(private readonly country: Country) {}

  getQuestion(countriesData: CountriesData): Question {
    const randomWrongAnswers: Array<Answer> = [];
    const countryList = { ...countriesData.countries };

    while (randomWrongAnswers.length < questionsCount - 1) {
      const country = getRandomCountry(countryList);

      if (country.capital) {
        randomWrongAnswers.push({
          label: country.capital || country.name,
          isCorrect: false,
        });
      }
    }

    const correctAnswer = getCorrectAnswer(
      this.country.capital || this.country.name
    );

    const answers = [correctAnswer, ...randomWrongAnswers];

    const questionTypeLabel = questionLabels[this._questionType];

    return {
      answers: shuffleArrayOfObjects<Answer>(answers),
      image: '',
      label: `${questionTypeLabel} ${this.country.name}?`,
      type: this._questionType,
    };
  }
}

class CountryFrontierQuestion implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.COUNTRY_FRONTIER;

  constructor(private readonly country: Country) {}

  getQuestion(countriesData: CountriesData): Question {
    const randomWrongAnswers: Array<Answer> = [];
    const countryList = { ...countriesData.countries };

    this.country.borders.forEach(
      (border: string) => delete countryList[border]
    );

    while (randomWrongAnswers.length < questionsCount - 1) {
      const country = getRandomCountry(countryList);

      if (country.borders.length) {
        randomWrongAnswers.push({
          label: country.capital || country.name,
          isCorrect: false,
        });
      }
    }

    const correctAnswer = getCorrectAnswer(this.country.name);

    const answers = [correctAnswer, ...randomWrongAnswers];

    const questionTypeLabel = questionLabels[this._questionType];

    return {
      answers: shuffleArrayOfObjects<Answer>(answers),
      image: '',
      label: `${questionTypeLabel} ${this.country.name}?`,
      type: this._questionType,
    };
  }
}

class CountryRegionQuestion implements QuestionInstance {
  constructor(private readonly country: Country) {}

  getQuestion(countriesData: CountriesData): Question {
    throw new Error('Method not implemented.');
  }
}

export default class QuestionV2Service implements QuestionService {
  private getQuestionInstance = (country: Country): QuestionInstance => {
    const questionType = this.getRandomQuestion(country);

    if (questionType === QuestionTypes.COUNTRY_CAPITAL) {
      return new CountryCapitalQuestion(country);
    }

    if (questionType === QuestionTypes.COUNTRY_FRONTIER) {
      return new CountryFrontierQuestion(country);
    }

    return {} as QuestionInstance;
  };

  private getRandomQuestion = (country: Country): QuestionType => {
    if (country.questions) {
      const questionType =
        country.questions[getRandomIndex(country.questions.length)];

      return questionType;
    }

    return QuestionTypes.POPULATION_COUNTRY;
  };

  public getQuestionByCountry(
    randomCountry: Country,
    countriesData: CountriesData
  ): Question {
    const data = { ...countriesData };

    delete data.countries[randomCountry.id];

    return this.getQuestionInstance(randomCountry).getQuestion(data);
  }

  public getQuestionByType(): never {
    throw new Error(
      'This service does not support Question by type generation'
    );
  }
}
