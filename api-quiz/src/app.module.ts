import { Module } from '@nestjs/common';
import { QuestionModule } from './modules/question/question.module';

@Module({
  imports: [QuestionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
