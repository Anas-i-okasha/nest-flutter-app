import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway,WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
	@WebSocketServer()
	server: Server;

	onModuleInit() { // handle socket connection
		this.server.on('connection', (client) => {
			console.log('client', client.id);
		});
	}

	@SubscribeMessage('sendMessageToAll') // rooms or channels
	sendMessageToAll(@MessageBody() message: string) {
		this.server.emit('sendMessageToAll', message);
	}

	@SubscribeMessage('singleMessage')
	handlePrivateMessage(@MessageBody() data: {targetUser: string, message: string}) {
		
	}
}
