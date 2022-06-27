import { QuestionType } from './QuestionType';

interface Country {
  borders: Array<string>;
  capital: string;
  flag: string;
  id: string; // alpha3Code
  name: string;
  region: string;
  subregion: string;
  population: number;
  questions?: Array<QuestionType>;
}

export { Country };
