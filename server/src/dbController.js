import fs from 'fs'
import { resolve } from 'path'

const basePath = resolve()

const filenames = {
  data: resolve(basePath, 'src/db/data.json'),
  table: resolve(basePath, 'src/db/table.json'),
}

export const readDB = target => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'))
  } catch (err) {
    console.error(err)
  }
}

export const writeDB = (target, data) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}