var redis = require("redis"),
    client = redis.createClient('redis://85.143.209.210:6374');


//client.auth('dbff937e94ae4c66701a81855d327728');


// client.hmset('frameworks', {
//     'babel': 'Express'
// });
//
client.lpush('frameworks', 'hello', function(err, reply) {
    console.log(reply); //prints 2
});


var s = {
  code: {
    id: "id",
    autor: "uid",
    text: "",
    likes: ["uid"]
  },
  codes: function(callback){
    callback?void(0):callback=this.callback;
    client.lrange('codes',0, 10000, callback);
  },
  add: function(id, text){ // добавляем текст
    if(text&&id){
      client.set("text-"+id, text);
      client.lpush("likes-"+id, id);
    }
  },
  get: function(id, callback){ // получаем тектс и коллическво лайков
    if(id&&callback){
      //?void(0):callback=this.callback;
      client.llen("likes-"+id, function(e,n){
        client.get("text-"+id, function(e,t){ callback(t,n) });
      })
    }
  },
  like: function(id,id2){
    id&id2?
    client.lpush("likes-"+id,id2):false;
  },
  rem: function(id){
    if(id){
      client.del("text-"+id)
      client.del("likes-"+id)
    }
  },
  count: function(id, callback){
    if(id&&callback){
      //?void(0):callback=this.callback;
      client.llen("likes-"+id, callback)
    }
  },
  getall: function(){

  }
}

s.count("ars", function(e,o){ console.log(o); })




client.keys("*", function (err, obj) {
    console.dir(obj);
});

client.lrange('frameworks', function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
});




module.exports.models = {}
