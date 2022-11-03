const RabbitMQ = require("../libs/messaging/rabbitmq");
const User = require("./user.model");
require("dotenv").config();

const usersService = {
  createUser: async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password, newsletter } = req.body;

      const sendUserToDB = await User.create({ name, email, password, newsletter });

      const RMQ_URI = process.env.RMQ_URI;

      const rabbitmq = new RabbitMQ(RMQ_URI);
      await rabbitmq.start();
      const publish = await rabbitmq.sendToExchange({
        exchange: "amq.headers",
        routingKey: "users",
        pattern: "users",
        message: sendUserToDB._id,
        headers: {
          newUser: true,
          newsletter,
        },
      });

      res.status(201).send({ user: sendUserToDB, queued: publish });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};

module.exports = usersService;
