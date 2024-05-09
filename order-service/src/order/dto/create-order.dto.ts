import {
  IsEmail,
  IsNotEmpty,
  Matches,
  IsAlpha,
  MinLength,
  Min,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  user: string;

  @MinLength(1)
  @IsAlpha()
  @IsNotEmpty()
  itemName: string;

  @MinLength(1)
  @IsAlpha()
  @IsNotEmpty()
  success: string;

}
