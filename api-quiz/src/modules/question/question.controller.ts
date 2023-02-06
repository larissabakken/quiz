import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { filter } from 'rxjs';
import { QuestionDTO } from './question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async findAll() {
    return this.questionService.findAll();
  }

  @Get(':category')
 
  async findOne(@Param('category') category: string) {
    return this.questionService.findOne(category);
  }
  
}
