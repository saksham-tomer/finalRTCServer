
import {v4 as uuidV4} from 'uuid'
import {Socket} from 'socket.io'

const rooms = {}
export const handleRoom = (socket)=>{

const createRoom = ({peerId})=>{
  let roomId = uuidV4()
    rooms[roomId] = []
  soket.emit("room-created",{roomId})
    joinRoom({roomId,peerId})
  }

  const joinRoom = ({roomId,peerId})=>{
    if(rooms[roomId]){
      rooms[roomId].push(peerId)
      socket.join(roomId)
      socket.to(roomId).emit("user-joined",{roomId,peerId})
      socket.emit("get-users",{
        roomId,
        participants: rooms[roomId]
      })
    }
    else{
      createRoom({peerId})
    }

  socket.on("disconnect",leaveRoom({peerId,roomId})) 
  }

  const leaveRoom = ({roomId,peerId})=>{
    console.log("The user ${peerId} disconnected")
    socket.in(roomId).emit("user-disconnected",peerId)
    rooms[roomID]=rooms[roomId]?.filter((id)=>id !== peerId)
  }


  socket.on("create-room",createRoom)
  socket.on("leave-room",leaveRoom)
  socket.on("join-room",joinRoom)

}
