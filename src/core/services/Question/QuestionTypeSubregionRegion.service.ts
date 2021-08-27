import { questionLabels } from '@/core/constants/questionLabels';
import { Answer } from '@/core/domain/models/Answer';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Question } from '@/core/domain/models/Question';
import { QuestionType, QuestionTypes } from '@/core/domain/models/QuestionType';
import { Region } from '@/core/domain/models/Region';
import { Regions } from '@/core/domain/models/Regions';
import { SubRegion } from '@/core/domain/models/SubRegion';
import { SubRegions } from '@/core/domain/models/SubRegions';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { getParsedStringName, shuffleArrayOfObjects } from '@/core/utils';

export default class QuestionTypeSubregionRegion implements QuestionInstance {
  private _questionType: QuestionType = QuestionTypes.SUBREGION_REGION;

  private getRandomRegion = (regions: Regions): Region => {
    const regionKeys = Object.keys(regions);
    const randomKey = Math.floor(Math.random() * regionKeys.length);
    const randomRegion = regions[regionKeys[randomKey]];

    return randomRegion;
  };

  private getRandomSubregion = (subregions: SubRegions): SubRegion => {
    const subregionsKey = Object.keys(subregions);
    const randomSubregionIndex = Math.floor(
      Math.random() * subregionsKey.length
    );
    const subregionKey = subregionsKey[randomSubregionIndex];

    return subregions[subregionKey];
  };

  private getCorrectAnswer = (region: Region): Answer => {
    return {
      label: region.name,
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
    mainRegion: Region
  ): Array<Answer> => {
    const correctAnswer = this.getCorrectAnswer(mainRegion);
    const wrongAnswers = this.getRandomWrongAnswers(
      regions,
      getParsedStringName(mainRegion.name)
    );
    const answers = shuffleArrayOfObjects([correctAnswer, ...wrongAnswers]);

    return answers as Array<Answer>;
  };

  public getQuestion = (countriesData: CountriesData): Question => {
    const mainRegion = this.getRandomRegion(countriesData.regions);
    const mainSubregions = this.getRandomSubregion(mainRegion.subRegions);
    const questionTypeLabel = questionLabels[this._questionType];
    const answers = this.getAnswers(countriesData.regions, mainRegion);

    return {
      answers,
      image: '',
      label: `${mainSubregions.name} ${questionTypeLabel}`,
      type: this._questionType,
    };
  };
}
