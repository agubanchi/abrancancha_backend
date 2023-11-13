import { Test, TestingModule } from '@nestjs/testing';
import { CanchasController } from './canchas.controller';

describe('CanchasController', () => {
  let controller: CanchasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanchasController],
    }).compile();

    controller = module.get<CanchasController>(CanchasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
