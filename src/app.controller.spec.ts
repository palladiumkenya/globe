import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { countySchema } from './core/application/locations/schemas/county-schema';

describe('AppController', () => {
  const url = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobeTest?retryWrites=true&w=majority`;
  let module: TestingModule;
  let appController: AppController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(url, { useNewUrlParser: true }),
      ],
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "dwapi Globe"', () => {
      expect(appController.getAppName()).toBe('dwapi Globe');
    });
  });
});
