import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService]
})
export class QuestionModule {}
