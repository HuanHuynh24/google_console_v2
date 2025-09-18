import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Web } from './websites/web';
import { WebService } from './app.service';
import { Detail } from './websites/details';
import { CreateDetailListDto } from './dto/create-detail.dto';
import { KeywordGroupDto } from './interface/KeywordGroupDto ';
import { PageGroupDto } from './interface/PageGroupDto';
import { DateGroupDto } from './interface/DateGroupDto';

@Controller('website')
export class AppController {
  constructor(private readonly webService: WebService) {}
  @Post()
  async createWeb(@Body('websitename') websitename: string): Promise<Web> {
    return this.webService.createWeb(websitename);
  }
  @Post('update')
  async createWebWidthDetail(
    @Query('id') id: string,
    @Body() body: CreateDetailListDto,
  ): Promise<Detail[]> {
    return this.webService.createWebWidthDetails(id, body.details);
  }

  @Get('group-by-keyword')
  getGroupByKeyword(
    @Query('id') webId: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<KeywordGroupDto[]> {
    return this.webService.getDataGroupByKeyword(
      webId,
      fromDate ? new Date(fromDate) : undefined,
      toDate ? new Date(toDate) : undefined,
    );
  }

  // Group theo trang
  @Get('group-by-page')
  getGroupByPage(
    @Query('id') webId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<PageGroupDto[]> {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    return this.webService.getDataGroupByPage(webId, fromDate, toDate);
  }

  @Get('group-by-date')
  getGroupByDate(
    @Query('id') webId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<DateGroupDto[]> {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    return this.webService.getDataGroupByDate(webId, fromDate, toDate);
  }
}
