import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from '../cats.schema';

export class ReadOnlyCat extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '4648392',
    description: 'id',
  })
  id: string;
}
