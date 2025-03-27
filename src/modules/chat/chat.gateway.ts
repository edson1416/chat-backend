import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './services/chat.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:5174' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`User connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`User disconnected ${client.id}`);
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(client: Socket, room: string) {
      client.join(room);
      console.log('User joined');

      const message = await this.chatService.getMessage(room);
      console.log("los mensajes: ",message);
      client.emit('load_message', message);
  }

    @SubscribeMessage('send_message')
    async handleSendMessage(client: Socket, data: { room: string; author: string; message: string }) {
        console.log('la data:',data);
        console.log(`Mensaje recibido: ${data.message}`);

        // Guardar mensaje en la base de datos
        const savedMessage = await this.chatService.saveMessage(data.room, data.author, data.message);

        // Enviar el mensaje a los clientes de la sala
        this.server.to(data.room).emit('receive_message', data);

    }
}
