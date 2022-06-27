import { questionLabels } from '@/core/constants/questionLabels';
import { Answer } from '@/core/domain/models/Answer';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Country } from '@/core/domain/models/Country';
import { Question } from '@/core/domain/models/Question';
import { QuestionType, QuestionTypes } from '@/core/domain/models/QuestionType';
import { Regions } from '@/core/domain/models/Regions';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { getParsedStringName, shuffleArrayOfObjects } from '@/core/utils';
import { getRandomCountry, getRandomRegion } from '@/core/utils/countryUtils';

export default class QuestionTypeCountryRegion implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.COUNTRY_REGION;

  private getCorrectAnswer = (country: Country): Answer => {
    return {
      label: country.region,
      isCorrect: true,
    };
  };

  private getRandomWrongAnswers = (
    regions: Regions,
    mainRegionId: string
  ): Array<Answer> => {
    const regionList = { ...regions };
    const wrongAnswers = [] as Array<Answer>;

    // Delete main country before start asnwers generation
    delete regionList[mainRegionId];

    for (let i = 0; i < 3; i++) {
      const randomRegion = getRandomRegion(regionList);

      wrongAnswers.push({
        label: randomRegion.name,
        isCorrect: false,
      });

      delete regionList[randomRegion.id];
    }

    return wrongAnswers;
  };

  private getAnswers = (
    regions: Regions,
    mainCountry: Country
  ): Array<Answer> => {
    const correctAnswer = this.getCorrectAnswer(mainCountry);
    const wrongAnswers = this.getRandomWrongAnswers(
      regions,
      getParsedStringName(mainCountry.region)
    );
    const answers = shuffleArrayOfObjects([correctAnswer, ...wrongAnswers]);

    return answers as Array<Answer>;
  };

  public getQuestion = (countriesData: CountriesData): Question => {
    const mainCountry = getRandomCountry(countriesData.countries);
    const questionTypeLabel = questionLabels[this._questionType];
    const answers = this.getAnswers(countriesData.regions, mainCountry);

    return {
      answers,
      image: '',
      label: `${mainCountry.name} ${questionTypeLabel}`,
      type: this._questionType,
    };
  };
}
