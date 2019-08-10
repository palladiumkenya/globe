import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

export class TestDbHelper {

  url = `mongodb+srv://livetest:maun@cluster0-v6fcj.mongodb.net/dwapiGlobeTest?retryWrites=true&w=majority`;

  options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  constructor(url?: string, opts?: any) {
    if (url) {
      this.url = url;
    }
    if (opts) {
      this.options = opts;
    }
    jest.setTimeout(30000);
  }

  async initConnection() {
    Logger.debug(`connecting...`);
    await mongoose.connect(this.url, { useNewUrlParser: true });
    Logger.debug(`connected to [${mongoose.connection.host}]`);
  }

  async seedDb(collectionName, documents: any[]) {
    Logger.debug(`seeding data [${collectionName}]`);

    for (const document of documents) {
      const { ops } = await mongoose.connection.db
        .collection(collectionName)
        .insertOne(document);
    }
  }

  async clearDb() {
    Logger.debug(`clearing...`);
    const collections = await mongoose.connection.db.listCollections().toArray();
    return Promise.all(
      collections
        .map(({ name }) => name)
        .map(collection => {
          Logger.debug(`clearing ${collection}`);
          mongoose.connection.db.collection(collection).drop();
        }),
    );
  }

  async closeConnection() {
    Logger.debug(`closing connection...`);
    mongoose.connection.close();
    Logger.debug(`connection closed`);
  }
}