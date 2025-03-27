import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Chat} from "./entity/chat.entity";
import {ChatService} from "./services/chat.service";
import {ChatGateway} from "./chat.gateway";

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    providers: [ChatService, ChatGateway],
})
export class ChatModule{}