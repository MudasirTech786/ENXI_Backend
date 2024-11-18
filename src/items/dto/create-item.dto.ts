import { IsString, IsNumber, Min } from 'class-validator';

export class CreateItemDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  @Min(0)
  readonly price: number;
}