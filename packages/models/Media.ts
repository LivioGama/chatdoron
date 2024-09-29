import {z} from 'zod'
import {Z} from 'zod-class'

export default class Media extends Z.class({
  id: z.string(),
  date: z.coerce.date(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  picture: z.string(),
}) {
  public aspectRatio: number | undefined
}
