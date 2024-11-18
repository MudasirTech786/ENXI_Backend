import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  // Get all items
  findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  // Get one item by ID
  findOne(id: number): Promise<Item> {
    return this.itemsRepository.findOneBy({ id });
  }

  // Create a new item (using DTO for validation)
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemDto); 
    return this.itemsRepository.save(newItem); 
  }

  // Update an existing item (using DTO for validation)
  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemsRepository.update(id, updateItemDto);
    return this.itemsRepository.findOneBy({ id });
  }

  // Delete an item by ID
  async remove(id: number): Promise<void> {
    await this.itemsRepository.delete(id);
  }
}
