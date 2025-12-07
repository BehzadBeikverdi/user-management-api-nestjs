import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './math.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SumCalculateDto } from './sum-calculate.dto';
import { BaseResponseModel } from '../../common/models/base-response-model';

@ApiTags('Math')
@Controller('math')
export class MathController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @ApiOperation({ summary: 'Say Hello!' })
  getHello() {
    const data = this.appService.getHello();
    return BaseResponseModel.success('Hello fetched', data);
  }

  @Get('/goodbye')
  @ApiOperation({ summary: 'Say Goodbye!' })
  getGoodbye() {
    const data = this.appService.getGoodbye();
    return BaseResponseModel.success('Goodbye fetched', data);
  }

  @Post('/sumCalculate')
  @ApiOperation({ summary: 'Calculate sum' })
  sumCalculate(@Body() body: SumCalculateDto) {
    const result = this.appService.sumCalculate(body.a, body.b);
    return BaseResponseModel.success('Sum calculated', result);
  }

  @Post('/negCalculate')
  @ApiOperation({ summary: 'Calculate subtraction' })
  negCalculate(@Body() body: SumCalculateDto) {
    const result = this.appService.negCalculate(body.a, body.b);
    return BaseResponseModel.success('Subtraction calculated', result);
  }

  @Post('/multiCalculate')
  @ApiOperation({ summary: 'Calculate multiplication' })
  multiCalculate(@Body() body: SumCalculateDto) {
    const result = this.appService.multiCalculate(body.a, body.b);
    return BaseResponseModel.success('Multiplication calculated', result);
  }

  @Post('/divideCalculate')
  @ApiOperation({ summary: 'Calculate division' })
  divideCalculate(@Body() body: SumCalculateDto) {
    const result = this.appService.divideCalculate(body.a, body.b);
    return BaseResponseModel.success('Division calculated', result);
  }
}
