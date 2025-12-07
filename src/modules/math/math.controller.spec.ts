import { Test, TestingModule } from '@nestjs/testing';
import { MathController } from './math.controller';
import { AppService } from './math.service';

describe('MathController', () => {
  let appController: MathController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MathController],
      providers: [AppService],
    }).compile();

    appController = app.get<MathController>(MathController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
