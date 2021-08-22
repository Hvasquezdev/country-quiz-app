import { Answer } from './Answer';
import { QuestionType } from './QuestionType';

interface Question {
  image: string;
  label: string;
  type: QuestionType;
  answers: Array<Answer>;
}

export { Question };
