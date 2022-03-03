import { readDB } from "../dbController.js";

const getTable = () => readDB('table')

const tableRoute = [
  {
    method: 'get',
    route: '/table',
    handler: ({query: {page = 0}}, res) => {
      const datas = getTable()
      res.send({count: datas.length, list: datas.splice(page*15, 15)})
    }
  }
]

export default tableRoute