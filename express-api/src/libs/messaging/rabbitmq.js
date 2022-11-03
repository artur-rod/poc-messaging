const amqplib = require("amqplib");

class RabbitMQ {
  constructor(uri) {
    this.uri = uri;
  }

  async start() {
    this.conn = await amqplib.connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publish(queue, pattern, message) {
    return this.channel.sendToQueue(queue, Buffer.from(JSON.stringify({ pattern, message })));
  }

  async sendToExchange({ exchange, routingKey, pattern, message, headers }) {
    return this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify({ pattern, message })),
      {
        headers,
      }
    );
  }
}

module.exports = RabbitMQ;
