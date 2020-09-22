import { Controller, Get, Render, Post, Req} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHello(): Promise<object> {
    const res = await this.appService.getTestForm();
    
    let formToken = res.answer.formToken;
    return { message: 'Prueba - formulario inscrustado', formToken };
  }

  @Post('respuesta-pago')
  paymentResponse(@Req() request: Request) {
    const { body } = request
    return body['kr-answer']
    // return data
  }
}
