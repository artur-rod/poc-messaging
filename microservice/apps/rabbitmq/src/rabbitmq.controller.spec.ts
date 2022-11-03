import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqService } from './rabbitmq.service';

describe('RabbitmqController', () => {
  let rabbitmqController: RabbitmqController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RabbitmqController],
      providers: [RabbitmqService],
    }).compile();

    rabbitmqController = app.get<RabbitmqController>(RabbitmqController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rabbitmqController.getHello()).toBe('Hello World!');
    });
  });
});
