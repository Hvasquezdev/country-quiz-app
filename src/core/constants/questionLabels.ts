import { QuestionType, QuestionTypes } from '../domain/models/QuestionType';

type QuestionLabels = {
  [type in QuestionType]: string;
};

const questionLabels = {
  [QuestionTypes.COUNTRY_CAPITAL]: 'Which of these is capital of',
  [QuestionTypes.COUNTRY_FRONTIER]: 'borders with?',
  [QuestionTypes.COUNTRY_REGION]: 'belongs to which region?',
  [QuestionTypes.FLAG_COUNTRY]: 'Which country does this flag belong to?',
  [QuestionTypes.POPULATION_COUNTRY]: 'Which country has more population?',
  [QuestionTypes.SUBREGION_REGION]: 'is a subregion that belongs to:',
} as QuestionLabels;

export { questionLabels };
