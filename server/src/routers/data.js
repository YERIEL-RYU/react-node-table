import { readDB } from "../dbController.js"

const getDatas = () => readDB('data')

const dataRoute = [
  {
    method: 'get',
    route: '/data',
    handler: ({query: {page = 0}}, res) => {
      const datas = getDatas()
      res.send({count: datas.length, list: datas.splice(page*15, page*15+15)})
    }
  }
]

export default dataRoute
