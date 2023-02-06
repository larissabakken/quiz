import { PrismaClient } from '@prisma/client';

const dbQuestions = require('./questions.json');

const prisma = new PrismaClient();

async function main() {
  for (const question of dbQuestions) {
    const newQuestion = await prisma.question.create({
      data: {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
        correct_answer: question.correct_answer,
        incorrect_answers: {
          create: [
            { answer: question.incorrect_answers[0] },
            { answer: question.incorrect_answers[1] },
            { answer: question.incorrect_answers[2] },
          ],
        },
      },
    });
    console.log(`Created question with id: ${newQuestion.id}`);
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
