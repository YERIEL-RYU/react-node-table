import express from 'express'
import cors from 'cors'
import dataRoute from './routers/data.js'
import tableRoute from './routers/table.js'

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true
  })
)

const routes = [...dataRoute, ...tableRoute]
routes.forEach(({ method, route, handler }) => {
  app[method](route, handler)
})

app.listen(8000, ()=>{
  console.log('server listening on 5000....')
})