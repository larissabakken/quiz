import { Injectable } from '@nestjs/common';
import { type } from 'os';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const quiz = await this.prisma.quiz.findMany();

    const quizWithQuestions = await Promise.all(
      quiz.map(async (quiz) => {
        const questions = await this.prisma.question.findMany({
          where: {
            quizId: quiz.id,
          },
        });
        const incorrectAnswers = await this.prisma.incorrectAnswer.findMany({
          where: {
            question: {
              quizId: quiz.id,
            },
          },
        });
        return {
          ...quiz,
          questions: questions.map((question) => {
            const incorrect_answers = incorrectAnswers.filter(
              (incorrect_answer) => incorrect_answer.questionId === question.id,
            );
            return {
              ...question,
              incorrect_answers: incorrect_answers.map(
                (incorrect_answer) => incorrect_answer.answer,
              ),
            };
          }),
        };
      }),
    );

    return quizWithQuestions;
  }

  async findOne(id: any) {
    const idQuiz = parseInt(id);
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: idQuiz,
      },
    });

    const questions = await this.prisma.question.findMany({
      where: {
        quizId: quiz.id,
      },
    });

    const incorrectAnswers = await this.prisma.incorrectAnswer.findMany({
      where: {
        question: {
          quizId: quiz.id,
        },
      },
    });

    const quizWithQuestions = {
      ...quiz,
      questions: questions.map((question) => {
        const incorrect_answers = incorrectAnswers.filter(
          (incorrect_answer) => incorrect_answer.questionId === question.id,
        );
        return {
          ...question,
          incorrect_answers: incorrect_answers.map(
            (incorrect_answer) => incorrect_answer.answer,
          ),
        };
      }),
    };

    return quizWithQuestions;
  }
}
