const RabbitMQ = require("../libs/messaging/rabbitmq");
const Order = require("./order.model");
require("dotenv").config();

const ordersService = {
  createOrder: async (req, res) => {
    try {
      console.log(req.body);
      const { product, price, email } = req.body;

      const sendOrderToDB = await Order.create({ product, price, email });

      const RMQ_URI = process.env.RMQ_URI;
      const RMQ_QUEUE = process.env.RMQ_ORDERS_QUEUE;

      const rabbitmq = new RabbitMQ(RMQ_URI);
      await rabbitmq.start();
      const publish = await rabbitmq.publish(RMQ_QUEUE, "new_order", sendOrderToDB._id);

      res.status(201).send({ order: sendOrderToDB, queued: publish });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};

module.exports = ordersService;
