import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {ImageInterface} from "../ImageInterface";
import {ImagesComponent} from "../app/images.component";

@Entity ('images')
export class Image {
  //private _visible = true;
  @PrimaryGeneratedColumn()
  imageId: number | undefined;

  @Column({type: 'text', name: 'source'})
  source: string | undefined;

  @Column({type: 'integer'})
  downloads: number | undefined;

  @Column({type: 'integer'})
  width: number | undefined;

  @Column({type: 'integer'})
  height: number | undefined;

  @Column({type: 'integer'})
  size: number | undefined;

  @Column({type: 'boolean'})
  visible: boolean | undefined;

  //constructor(_id: number, _source: string, _downloads: number, _width: number, _height: number, _size: bigint, _visible: boolean) {
  //}

  /*get id() {return this._id}

  get source() {return this._source;}

  get downloads() {return this._downloads}

  set downloads(downloads: number) {this._downloads = downloads}

  get width() {return this._width}

  get height() {return this._height}

  get size() {return this._size}

  get visible() {return this._visible}

  set visible(visible: boolean) {this._visible = visible}*/
}
