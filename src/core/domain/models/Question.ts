import { Answer } from './Answer';

interface Question {
  image: string;
  label: string;
  answers: Array<Answer>;
}

export { Question };
