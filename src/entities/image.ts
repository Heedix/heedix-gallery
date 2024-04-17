import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {ImageInterface} from "../ImageInterface";
import {ImagesComponent} from "../app/images.component";

@Entity ('images')
export class Image implements ImageInterface {
  //private _visible = true;
  @PrimaryGeneratedColumn()
  _id: number | undefined;

  @Column({type: 'text'})
  _source: string | undefined;

  @Column({type: 'integer'})
  _downloads: number | undefined;

  @Column({type: 'integer'})
  _width: number | undefined

  @Column({type: 'integer'})
  _height: number | undefined

  @Column({type: 'integer'})
  _size: number | undefined

  @Column({type: 'boolean'})
  _visible: boolean | undefined

  constructor(_id: number, _source: string, _downloads: number, _width: number, _height: number, _size: bigint, _visible: boolean) {
  }

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
