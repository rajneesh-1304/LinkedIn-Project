import { Injectable } from "@nestjs/common";
import { RabbitConnection } from "src/infra/rabbitMq/rabbit.connection";

@Injectable()
export class PublisherService {
  constructor(private readonly rabbit: RabbitConnection) {}

  async publish(message: any) {
    const channel = await this.rabbit.connect(process.env.RABBITMQ_URL);
    

    await channel.assertExchange('post.fanout', 'fanout', { durable: true });
    const postQueue = await channel.assertQueue('post.postQueue', {durable:true});
    await channel.bindQueue(postQueue.queue, 'post.fanout', '');
    channel.publish(
      'post.fanout',
      'fanout',
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    )
  }
}