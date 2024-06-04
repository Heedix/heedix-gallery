import "reflect-metadata"
import { DataSource } from "typeorm"
import {ImageEntity} from "./entity/imageEntity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "heedix.de",
    port: 5432,
    username: "admin",
    password: "YaPfgnD2uwY0",
    database: "heedix-gallery",
    synchronize: true,
    logging: true,
    entities: [ImageEntity]
})

AppDataSource.initialize()
  .then(() => {
  })
  .catch((error) => console.log(error))
