import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Web } from './websites/web';
import { Detail } from './websites/details';
import { WebService } from './app.service';

@Module({
  imports: [TypeOrmModule.forFeature([Web, Detail])],
  providers: [WebService],
  exports: [WebService], // nếu muốn dùng ở module khác
})
export class WebModule {}
