import { questionLabels } from '@/core/constants/questionLabels';
import { Answer } from '@/core/domain/models/Answer';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Country } from '@/core/domain/models/Country';
import { Question } from '@/core/domain/models/Question';
import { QuestionType } from '@/core/domain/models/QuestionType';
import { Region } from '@/core/domain/models/Region';
import { Regions } from '@/core/domain/models/Regions';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { getParsedStringName, suffleArrayOfObjects } from '@/core/utils';
import { getRandomCountry } from '@/core/utils/countryUtils';

export default class QuestionTypeCountryRegion implements QuestionInstance {
  private _questionType: QuestionType = 'country-region';

  private getRandomRegion = (regions: Regions): Region => {
    const regionKeys = Object.keys(regions);
    const randomKey = Math.floor(Math.random() * regionKeys.length);
    const randomRegion = regions[regionKeys[randomKey]];

    return randomRegion;
  };

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
      const randomRegion = this.getRandomRegion(regionList);

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
    const answers = suffleArrayOfObjects([correctAnswer, ...wrongAnswers]);

    return answers as Array<Answer>;
  };

  public getQuestion = (countriesData: CountriesData): Question => {
    const mainCountry = getRandomCountry(countriesData.countries);
    const questionTypeLabel = questionLabels[this._questionType];
    const answers = this.getAnswers(countriesData.regions, mainCountry);

    return {
      label: `${mainCountry.name} ${questionTypeLabel}`,
      image: '',
      type: this._questionType,
      answers,
    };
  };
}
