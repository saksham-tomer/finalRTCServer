
import {createServer} from 'http'
import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
import bodyParser from 'body-parser'
import {handleRoom} from './room.js'


const PORT = parseInt(process.env.PORT)||4000

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const server = createServer(app)

const io = new Server(server,{
  maxDisconnectionDuration: 2*60*1000,
  cors: {
    origin: ["http://localhost:3000"],
  },
})

io.on("connection",(socket)=>{

  handleRoom(socket)

  io.on("disconnect",()=>{
    console.log("A user disonnected")
  })
})

server.listen(PORT)
