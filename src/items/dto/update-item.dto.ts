import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly price?: number;
}