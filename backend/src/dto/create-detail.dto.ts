import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateDetailDto {
  @IsString()
  tukhoa: string;

  @IsString()
  trang: string;

  @IsNumber()
  vitri: number;

  @IsBoolean()
  isClick: boolean;

  @IsDate()
  @Type(() => Date) // ép chuỗi/number sang Date
  timestamp: Date;
}

export class CreateDetailListDto {
  @ValidateNested({ each: true })
  @Type(() => CreateDetailDto)
  details: CreateDetailDto[];
}
