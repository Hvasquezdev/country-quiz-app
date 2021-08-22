import { Question } from '../models/Question';
import { QuestionType } from '../models/QuestionType';

interface QuestionService {
  getQuestionByType(questionType: QuestionType): Question;
}

export { QuestionService };
