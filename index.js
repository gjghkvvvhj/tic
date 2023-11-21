const  express = require('express')
const app = express()
const port = 8000
const http =require('http').createServer(app)
app.use(express.static(__dirname+'/pub'));

app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'))
http.listen(port, () => console.log(`Example app listening on port ${port}!`))

const io = require('socket.io')(http);
const users={};
io.on('connection',socket=>{
   console.log('server started:','st');
   socket.on('new-user-joined',data =>{
    console.log('server started:',data.name);
    users[socket.id]=data.name;
    socket.broadcast.emit('user-joined',{codes: data.codes,name:data.name});
   })

   socket.on('igetyourdata',data =>{
    console.log(data.codes+'    '+data.name);
    socket.broadcast.emit('icall-user-joined',{codes:data.codes,name:data.name});


   })

   socket.on('stbtnclick',data =>{

    socket.broadcast.emit('iclickinst',{codes: data.codes,name:data.name});


   })
   socket.on('turnupdate',data =>{

    socket.broadcast.emit('iturncom',{codes: data.codes,name:data.name,id:data.id,num:data.num});


   })









//    socket.on('new-user-joined',name =>{
//     console.log("new user:",name);
// users[socket.id]=name;
// socket.broadcast.emit('user-joined',name);
//    });


//    socket.on('send',message =>{
//     console.log(message);
//        socket.broadcast.emit('receive',{message: message, name: users[socket.id]});

//        });

   
// //  socket.on('deletsend',ids =>{
// //        if(users[socket.id]=="admin88"){
// //     socket.broadcast.emit('deletreceive',{ids: ids})
// //        }
// //    });
// //    socket.on('send',message =>{
// //        const time = new Date().toLocaleString([], { hour: 'numeric', minute: 'numeric',second: 'numeric' });
// //     socket.broadcast.emit('receive',{message: message, name: users[socket.id],time:time})
// //    });



})