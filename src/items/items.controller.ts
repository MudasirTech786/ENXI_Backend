import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body(new ValidationPipe()) updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.itemsService.remove(id);
  }
}
