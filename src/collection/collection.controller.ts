import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto, @Req() req) {
    return this.collectionService.create(createCollectionDto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.collectionService.findAll(req.user);
  }
}
