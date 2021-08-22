import { Answer } from '@/core/domain/models/Answer';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Question } from '@/core/domain/models/Question';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { questionLabels } from '@/core/constants/questionLabels';
import { questionsCount } from '@/core/constants/questionsCount';
import { QuestionType } from '@/core/domain/models/QuestionType';
import { getRandomCountries } from '@/core/utils/countryUtils';
import { suffleArrayOfObjects } from '@/core/utils';

export default class QuestionTypeFlagCountry implements QuestionInstance {
  public getQuestion = (countriesData: CountriesData): Question => {
    const { countries } = countriesData;

    const [selected, ...rest] = getRandomCountries(countries, questionsCount);

    const correctAnswer: Answer = {
      label: selected.name,
      isCorrect: true,
    };

    const wrongAnswers = rest.map(
      (country): Answer => ({ label: country.name, isCorrect: false })
    );

    return {
      answers: suffleArrayOfObjects([correctAnswer, ...wrongAnswers]),
      image: selected.flag,
      label: questionLabels['flag-country'],
      type: 'flag-country' as QuestionType,
    };
  };
}
