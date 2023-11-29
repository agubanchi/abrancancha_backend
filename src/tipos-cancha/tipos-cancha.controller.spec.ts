import { Test, TestingModule } from '@nestjs/testing';
import { TiposCanchaController } from './tipos-cancha.controller';

describe('TiposCanchaController', () => {
  let controller: TiposCanchaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposCanchaController],
    }).compile();

    controller = module.get<TiposCanchaController>(TiposCanchaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
