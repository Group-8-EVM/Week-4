import {Controller, Get, Post, Param} from '@nestjs/common';
import {AppService} from './app.service';
import {Address} from "viem";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('token-address')
    getTokenAddress(): { address: string } {
        return {address: this.appService.getTokenAddress()};
    }

    @Post('mint/:address/:value')
    mintToken(@Param('address') address: Address,@Param('value') value: string) {
        return this.appService.mintToken(address, value)
    }
}
