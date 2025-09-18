import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Web } from './websites/web';
import { Repository } from 'typeorm';
import { Detail } from './websites/details';
import { CreateDetailDto } from './dto/create-detail.dto';
import { KeywordGroupDto } from './interface/KeywordGroupDto ';
import { PageGroupDto } from './interface/PageGroupDto';
import { DateGroupDto } from './interface/DateGroupDto';

@Injectable()
export class WebService {
  constructor(
    @InjectRepository(Web)
    private webRepository: Repository<Web>,

    @InjectRepository(Detail)
    private detailRepository: Repository<Detail>,
  ) {}

  async createWeb(webName: string): Promise<Web> {
    const webNew = this.webRepository.create({ name: webName });
    return await this.webRepository.save(webNew);
  }

  async createWebWidthDetails(
    webId: string,
    details: CreateDetailDto[],
  ): Promise<Detail[]> {
    const web = await this.webRepository.findOneBy({ id: +webId });
    if (!web) {
      throw new NotFoundException('Website không tồn tại');
    }

    const detailEntities = details.map((d) =>
      this.detailRepository.create({ ...d, web }),
    );

    return await this.detailRepository.save(detailEntities);
  }

  async getDataGroupByKeyword(
    webId: string,
    from?: Date,
    to?: Date,
  ): Promise<KeywordGroupDto[]> {
    const query = this.detailRepository
      .createQueryBuilder('detail')
      .select('detail.tukhoa', 'query')
      .addSelect('COUNT(detail.id)', 'impressions')
      .addSelect('SUM(detail.isClick)', 'clicks')
      .addSelect(
        `ROUND(
        SUM(detail.isClick) * 100.0 / NULLIF(COUNT(detail.id), 0),
        2
      )`,
        'ctr',
      )
      .addSelect('ROUND(AVG(detail.vitri), 2)', 'position')
      .where('detail.webId = :webId', { webId });

    if (from && to) {
      query.andWhere('detail.timestamp BETWEEN :from AND :to', { from, to });
    }

    query.groupBy('detail.tukhoa');

    return query.getRawMany<KeywordGroupDto>();
  }

  async getDataGroupByPage(
    webId: string,
    from?: Date,
    to?: Date,
  ): Promise<PageGroupDto[]> {
    const query = this.detailRepository
      .createQueryBuilder('detail')
      .select('detail.trang', 'trang')
      .addSelect('COUNT(detail.id)', 'impressions')
      .addSelect('SUM(detail.isClick)', 'clicks')
      .addSelect(
        `ROUND(
        SUM(detail.isClick) * 100.0 / NULLIF(COUNT(detail.id), 0),
        2
      )`,
        'ctr',
      )
      .addSelect('ROUND(AVG(detail.vitri), 2)', 'position')
      .where('detail.webId = :webId', { webId });

    if (from && to) {
      query.andWhere('detail.timestamp BETWEEN :from AND :to', { from, to });
    }

    query.groupBy('detail.trang');

    return query.getRawMany<PageGroupDto>();
  }

  async getDataGroupByDate(
    webId: string,
    from?: Date,
    to?: Date,
  ): Promise<DateGroupDto[]> {
    const query = this.detailRepository
      .createQueryBuilder('detail')
      .select("DATE_FORMAT(detail.timestamp, '%e/%c/%y')", 'date')
      // chỉ lấy ngày
      .addSelect('COUNT(detail.id)', 'impressions')
      .addSelect('SUM(detail.isClick)', 'clicks')
      .addSelect(
        `ROUND(
      SUM(detail.isClick) * 100.0 / NULLIF(COUNT(detail.id), 0),
      2
    )`,
        'ctr',
      )
      .addSelect('ROUND(AVG(detail.vitri), 2)', 'position')
      .where('detail.webId = :webId', { webId });

    if (from && to) {
      query.andWhere('detail.timestamp BETWEEN :from AND :to', { from, to });
    }

    query.groupBy("DATE_FORMAT(detail.timestamp, '%e/%c/%y')");

    return query.getRawMany<DateGroupDto>();
  }
}
