import { v4 as uuid } from 'uuid'

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: 'hooli 360',
    description: 'Fastest yet the coolest processor ever',
  },
  {
    _id: uuid(),
    categoryName: 'snapdragon 780',
    description: 'fast buy hot processor',
  },
  {
    _id: uuid(),
    categoryName: 'mediatek X',
    description: 'slowest and the hottest processor ever',
  },
]
