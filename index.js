const app = require('express')()
const cors = require('cors')
app.use(cors())

const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"]
  }
})
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('someone connected ! ')

  socket.on('join', data => {
    console.log('[join] data', data)
    io.emit('join_'+data.room_id, data)
  })

  socket.on('decline', data => {
    console.log('[decline] data', data)
    io.emit('decline_'+data.room_id, data)
  })

  socket.on('out', data => {
    console.log('[out] data', data)
    io.emit('out_'+data.room_id, data)
  })

  socket.on('kill', data => {
    console.log('[kill] data', data)
    io.emit('kill_'+data.room_id, data)
  })

  socket.on('chat', data => {
    console.log('[chat] data', data)
    io.emit('chat_'+data.room_id, data)
  })

  socket.on('loc_state', data => {
    console.log('[loc_state] data', data)
    io.emit('loc_state_'+data.room_id, data)
  })

  socket.on('step_state', data => {
    console.log('[step_state] data', data)
    io.emit('step_state_'+data.room_id, data)
  })
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})