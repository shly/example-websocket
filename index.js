var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userName;

/*访问静态资源*/
app.use(express.static('public'));

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
io.on('connection',function(socket){
	socket.on('disconnect',function(){
		 io.emit('disconnect', 'a user disconnected');
	});
	socket.on('chat message', function(msg){
    	 io.emit('chat message', userName+":"+msg);
    });
});


http.listen(3000, function () {
  console.log('Example app listening at 3000');
});

