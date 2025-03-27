import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Chat} from "../entity/chat.entity";
import {Repository} from "typeorm";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    ) {
    }

    async saveMessage(room: string,author: string,message: string): Promise<Chat> {
        const newMessage = this.chatRepository.create({room,author,message});
        return await this.chatRepository.save(newMessage);
    }

    async getMessage(room: string): Promise<Chat[]> {
        return await this.chatRepository.find({where:{room}, order:{created_at: 'ASC'}});
    }
}
