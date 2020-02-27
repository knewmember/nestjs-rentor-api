import { Controller, Post, Get, Patch, Delete, Body, Param, Headers, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { GenresService } from './genres.service'
import { AuthGuard, PassportModule } from '@nestjs/passport';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) { }

  @Post()
  async addGenre(@Body('name') genName: string, @Headers('token') token: string) {
    if (token) {
      const genre = await this.genresService.addGenre(genName);
      return genre;
    } else {
      throw new UnauthorizedException('invalid token')
    }
  }

  @Get()
  async getAllGenres(@Headers('token') token: string) {
    if (token) {
      const genres = await this.genresService.getAllGenres();
      return genres
    } else {
      throw new UnauthorizedException('invalid token')
    }
  }

  @Get(':id')
  async getOneGenre(@Param('id') genId: string, @Headers('token') token: string) {
    if (token) {
      const genre = await this.genresService.getOneGenre(genId)
      return genre;
    } else {
      throw new UnauthorizedException('invalid token')
    }
  }

  @Patch(':id')
  async updateGenre(@Param('id') genId: string, @Body('name') genName: string, @Headers('token') token: string) {
    if (token) {
      const result = await this.genresService.updateGenre(genId, genName);
      return 'The Genre Has been Updated';
    } else {
      throw new UnauthorizedException('invalid token')
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id') genId: string, @Headers('token') token: string) {
    if (token) {
      const result = await this.genresService.deleteGenre(genId);
      return 'The Genre has been deleted'
    } else {
      throw new UnauthorizedException('invalid token')
    }
  }

  @Post('/test')
  test(@Req() req) {
    return req

  }
}


