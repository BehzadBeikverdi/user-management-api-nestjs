import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Controller, Get} from "@nestjs/common";
import {BaseResponseModel} from "./common/models/base-response-model";

@ApiTags('App')
@Controller('')
export class AppController {
    @Get('')
    @ApiOperation({ summary: 'Start!' })
    getHello() {
        return "Start from here!";
    }

}