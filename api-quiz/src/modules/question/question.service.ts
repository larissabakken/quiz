import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { QuestionDTO } from './question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  // Find all questions
  async findAll() {
    const questions = await this.prisma.question.findMany();
    const incorrectAnswers = await this.prisma.incorrectAnswer.findMany();
    return questions.map((question) => {
      const incorrect_answers = incorrectAnswers.filter(
        (incorrect_answer) => incorrect_answer.questionId === question.id,
      );
      return {
        ...question,
        incorrect_answers: incorrect_answers.map(
          (incorrect_answer) => incorrect_answer.answer,
        ),
      };
    });
  }

  // Find one question by category
  async findOne(category: string) {
    const questions = await this.prisma.question.findMany({
      where: {
        category: category,
      },
    });
    const incorrectAnswers = await this.prisma.incorrectAnswer.findMany();
    return questions.map((question) => {
      const incorrect_answers = incorrectAnswers.filter(
        (incorrect_answer) => incorrect_answer.questionId === question.id,
      );
      return {
        ...question,
        incorrect_answers: incorrect_answers.map(
          (incorrect_answer) => incorrect_answer.answer,
        ),
      };
    });
  }
}
