import { PrismaClient } from '@prisma/client';

const dbQuestions = require('./quiz.json');

const prisma = new PrismaClient();

async function main() {
  for (const quiz of dbQuestions) {
    const quizQuestions = quiz.questions.map((question) => {
      return {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
        correct_answer: question.correct_answer,
        incorrect_answers: {
          create: question.incorrect_answers.map((answer) => {
            return {
              answer: answer,
            };
          }),
        },
      };
    });

    console.log(quizQuestions, 'quizQuestions');
    const newQuiz = await prisma.quiz.create({
      data: {
        name: quiz.name,
        questions: {
          create: [...quizQuestions],
        },
      },
    });
    console.log(newQuiz);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
