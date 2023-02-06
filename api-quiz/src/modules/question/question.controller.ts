import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionDTO } from './question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findAll() {
    return this.questionService.findAll();
  }

  // @Get(':id')
  // async getQuestion(@Param('id') id: string): Promise<QuestionDTO> {
  //   return this.questionService.getQuestion(id);
  // }
  
}
