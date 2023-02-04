import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.question.create({
    data: {
      category: 'Games',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'What is the name of the main character in the video game &quot;The Legend of Zelda&quot;?',
      correct_answer: 'Link',
      incorrect_answers: {
        create: [
            { answer: 'Zelda' },
            { answer: 'Ganondorf' },
            { answer: 'Epona' },
        ],
      },
    },
  });
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
