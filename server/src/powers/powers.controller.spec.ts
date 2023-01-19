import { Test, TestingModule } from '@nestjs/testing';
import { PowersController } from './powers.controller';

describe('PowersController', () => {
  let controller: PowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PowersController],
    }).compile();

    controller = module.get<PowersController>(PowersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
