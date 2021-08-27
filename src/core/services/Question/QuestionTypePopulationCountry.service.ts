import { Answer } from '@/core/domain/models/Answer';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { getAnswersWithCountryNameAsLabel } from '@/core/utils/countryUtils';
import { getRandomCountries } from '@/core/utils/countryUtils';
import { getSortedCountriesByPopulation } from '@/core/utils/countryUtils';
import { Question } from '@/core/domain/models/Question';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { questionLabels } from '@/core/constants/questionLabels';
import { questionsCount } from '@/core/constants/questionsCount';
import { QuestionTypes } from '@/core/domain/models/QuestionType';
import { shuffleArrayOfObjects } from '@/core/utils';

export default class QuestionTypePopulationCountry implements QuestionInstance {
  public getQuestion = (countriesData: CountriesData): Question => {
    const countries = getRandomCountries(
      countriesData.countries,
      questionsCount
    );

    const sortedCountries = getSortedCountriesByPopulation(countries);

    const answers = getAnswersWithCountryNameAsLabel(
      sortedCountries,
      sortedCountries[0].id
    );

    return {
      answers: shuffleArrayOfObjects(answers) as Array<Answer>,
      image: '',
      label: questionLabels['population-country'],
      type: QuestionTypes.POPULATION_COUNTRY,
    };
  };
}
