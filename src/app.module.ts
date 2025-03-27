import { Module } from '@nestjs/common';
import { ChatService } from './modules/chat/services/chat.service';
import {DatabaseModule} from "./config/database.module";
import {ChatModule} from "./modules/chat/chat.module";

@Module({
  imports: [DatabaseModule, ChatModule],
})
export class AppModule {}
