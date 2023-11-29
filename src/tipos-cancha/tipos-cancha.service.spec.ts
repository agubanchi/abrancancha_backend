import { Test, TestingModule } from '@nestjs/testing';
import { TiposCanchaService } from './tipos-cancha.service';

describe('TiposCanchaService', () => {
  let service: TiposCanchaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposCanchaService],
    }).compile();

    service = module.get<TiposCanchaService>(TiposCanchaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
