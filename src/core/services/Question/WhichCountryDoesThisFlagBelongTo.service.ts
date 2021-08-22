import { Answer } from '@/core/domain/models/Answer';
import { Countries } from '@/core/domain/models/Countries';
import { CountriesData } from '@/core/domain/models/CountriesData';
import { Question } from '@/core/domain/models/Question';
import { QuestionInstance } from '@/core/domain/services/QuestionInstance.service';
import { questionLabels } from '@/core/constants/questionLabels';
import { questionsCount } from '@/core/constants/questionsCount';
import { QuestionType } from '@/core/domain/models/QuestionType';
import { getRandomCountries } from '@/core/utils/countryUtils';

export default class WhichCountryDoesThisFlagBelongTo
  implements QuestionInstance
{
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
      answers: [correctAnswer, ...wrongAnswers],
      image: selected.flag,
      label: questionLabels['flag-country'],
      type: 'flag-country' as QuestionType,
    };
  };
}
