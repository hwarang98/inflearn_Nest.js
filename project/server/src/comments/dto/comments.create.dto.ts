import { PickType } from '@nestjs/swagger';
import { Comments } from '../commnets.schema';

export class CommnetsCreateDto extends PickType(Comments, [
  'author',
  'contents',
] as const) {}
