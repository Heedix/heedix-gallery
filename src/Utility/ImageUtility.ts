import {AppDataSource} from "../data-source";
import {Image} from "../entities/image";

const manager = AppDataSource.manager
const queryRunner = manager.queryRunner
export class images {
  imagesList = manager
    .createQueryBuilder()
    .select()
    .from(Image, "images")
    .where("user.name = :name", {name: "John"})
    .getMany()
}
