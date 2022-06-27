import { QuestionType, QuestionTypes } from '@/core/domain/models/QuestionType';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { QuestionService } from '@/core/domain/services/Question.service';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { Question } from '@/core/domain/models/Question';
import { Country } from '@/core/domain/models/Country';
import {
  getAnswersWithCountryNameAsLabel,
  getRandomCountries,
  getRandomCountry,
  getRandomRegion,
  getSortedCountriesByPopulation,
} from '@/core/utils/countryUtils';
import { questionsCount } from '@/core/constants/questionsCount';
import { Answer } from '@/core/domain/models/Answer';
import {
  copyObject,
  getCorrectAnswer,
  getParsedStringName,
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
    let count = 0;

    while (
      randomWrongAnswers.length < questionsCount - 1 &&
      count < Object.keys(countryList).length
    ) {
      const country = getRandomCountry(countryList);

      if (country.capital) {
        randomWrongAnswers.push({
          label: country.capital || country.name,
          isCorrect: false,
        });
      }

      delete countryList[country.id];
      count += 1;
    }

    const correctAnswer = getCorrectAnswer(
      this.country.capital || this.country.name
    );

    const answers = [correctAnswer, ...randomWrongAnswers];

    const questionTypeLabel = questionLabels[this._questionType];

    return {
      answers: shuffleArrayOfObjects(answers),
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
    const countryList = { ...countriesData.countries };

    this.country.borders.forEach(
      (border: string) => delete countryList[border]
    );

    const randomWrongAnswers: Array<Answer> = getRandomCountries(
      countryList,
      questionsCount - 1
    ).map((item) => ({ label: item.name, isCorrect: false }));

    const randomBorderIndex = getRandomIndex(this.country.borders.length);

    const randomCountryBorder =
      countriesData.countries[this.country.borders[randomBorderIndex]];

    const correctAnswer = getCorrectAnswer(randomCountryBorder.name);

    const answers = [correctAnswer, ...randomWrongAnswers];

    return {
      answers: shuffleArrayOfObjects(answers),
      image: '',
      label: `${this.country.name} ${questionLabels[this._questionType]}`,
      type: this._questionType,
    };
  }
}

class CountryRegionQuestion implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.COUNTRY_REGION;

  constructor(private readonly country: Country) {}

  getQuestion(countriesData: CountriesData): Question {
    const regions = { ...countriesData.regions };
    const randomWrongAnswers: Array<Answer> = [];

    delete regions[getParsedStringName(this.country.region)];

    for (let i = 0; i < questionsCount - 1; i++) {
      const randomRegion = getRandomRegion(regions);

      randomWrongAnswers.push({
        label: randomRegion.name,
        isCorrect: false,
      });

      delete regions[randomRegion.id];
    }

    const correctAnswer = getCorrectAnswer(this.country.region);

    const answers = [correctAnswer, ...randomWrongAnswers];

    return {
      answers: shuffleArrayOfObjects(answers),
      image: '',
      label: ` ${this.country.name} ${questionLabels[this._questionType]}`,
      type: this._questionType,
    };
  }
}

class FlagCountryQuestion implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.FLAG_COUNTRY;

  constructor(private readonly country: Country) {}

  public getQuestion = (countriesData: CountriesData): Question => {
    const { countries } = countriesData;

    const randomCountries = getRandomCountries(
      { ...countries },
      questionsCount - 1
    );

    const answers = getAnswersWithCountryNameAsLabel(
      [...randomCountries, this.country],
      this.country.id
    );

    return {
      answers: shuffleArrayOfObjects(answers),
      image: this.country.flag,
      label: questionLabels[this._questionType],
      type: this._questionType,
    };
  };
}

class PopulationCountryQuestion implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.POPULATION_COUNTRY;

  constructor(private readonly country: Country) {}

  public getQuestion = (countriesData: CountriesData): Question => {
    const countries = getRandomCountries(
      { ...countriesData.countries },
      questionsCount - 1
    );

    const countriesSorted = getSortedCountriesByPopulation([
      ...countries,
      this.country,
    ]);

    const answers = getAnswersWithCountryNameAsLabel(
      countriesSorted,
      countriesSorted[0].id
    );

    return {
      answers: shuffleArrayOfObjects(answers),
      image: '',
      label: questionLabels['population-country'],
      type: this._questionType,
    };
  };
}

class QuestionServiceV2 implements QuestionService {
  private getQuestionInstance = (country: Country): QuestionInstance => {
    const questionType = this.getRandomQuestion(country);

    if (questionType === QuestionTypes.COUNTRY_CAPITAL) {
      return new CountryCapitalQuestion(country);
    }

    if (questionType === QuestionTypes.COUNTRY_FRONTIER) {
      return new CountryFrontierQuestion(country);
    }

    if (questionType === QuestionTypes.COUNTRY_REGION) {
      return new CountryRegionQuestion(country);
    }

    if (questionType === QuestionTypes.FLAG_COUNTRY) {
      return new FlagCountryQuestion(country);
    }

    if (questionType === QuestionTypes.POPULATION_COUNTRY) {
      return new PopulationCountryQuestion(country);
    }

    return new FlagCountryQuestion(country);
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
    const data = copyObject({ ...countriesData });

    delete data.countries[randomCountry.id];

    return this.getQuestionInstance(randomCountry).getQuestion(data);
  }

  public getQuestionByType(): never {
    throw new Error(
      'This service does not support Question by type generation'
    );
  }
}

export { QuestionServiceV2 };
