import { Test, TestingModule } from '@nestjs/testing';
import { PowersService } from './powers.service';

describe('PowersService', () => {
  let service: PowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PowersService],
    }).compile();

    service = module.get<PowersService>(PowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
