import { Test, TestingModule } from '@nestjs/testing';
import { PracticesController } from './practices.controller';
import { PracticesModule } from '../practices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

describe('Practices Controller', () => {
  const url = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobeTest?retryWrites=true&w=majority`;
  jest.setTimeout(10000);
  let controller: PracticesController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CqrsModule,
        MongooseModule.forRoot(url, { useNewUrlParser: true }),
        PracticesModule,
      ],
    }).compile();

    controller = module.get<PracticesController>(PracticesController);
  });

  beforeEach(async () => {
    controller = module.get<PracticesController>(PracticesController);
  });

  it('should create new', async () => {
    const result = await controller.createOrUpdateAgency({
      name: 'MAUN', display: 'Maun',
    });
    expect(result).not.toBeNull();
    Logger.debug(result);
  });
});
