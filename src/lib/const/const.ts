import { DocumentBuilder } from '@nestjs/swagger';

export const errorMessage = {
  USER_NOT_FOUND: 'User not found!',
  TRACK_NOT_FOUND: 'Track not found!',
  ARTIST_NOT_FOUND: 'Artist not found!',
  ALBUM_NOT_FOUND: 'Album not found!',
  INVALID_PASSWORD: 'Wrong password provided!',
} as const;

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Home library')
  .setDescription('Home library service api')
  .setVersion('1.0')
  .addTag('Home Library')
  .build();
