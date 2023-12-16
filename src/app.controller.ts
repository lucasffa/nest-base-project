import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  /* Blocked until it's necessary
  
  @Get('csrf-token')
  getCsrfToken(@Req() request: Request, @Res() response: Response) {
    response.status(200).send({ csrfToken: request.csrfToken() });
  }
  */

}