import { Test, TestingModule } from '@nestjs/testing';
import { AgendasController } from './agendas.controller';

describe('AgendasController', () => {
  let controller: AgendasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendasController],
    }).compile();

    controller = module.get<AgendasController>(AgendasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
