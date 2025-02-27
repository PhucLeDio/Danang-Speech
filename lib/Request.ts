export enum IType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  TEXT = "TEXT",
  IMG_DATA = "IMG_DATA"
}

export default class Request {
  type: IType
  payload: any
  meta: Record<string, any>

  constructor(type: IType, payload: any, meta?: Record<string, any>) {
    this.type = type
    this.payload = payload
    this.meta = meta
  }
}
