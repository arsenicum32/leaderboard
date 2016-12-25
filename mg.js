var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/slice', { promiseLibrary: require('bluebird') });

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function callback () {
    console.log('connect to penchat');
});



var code = mongoose.model('Codes', {
  owner: String,
  text: String,
  likes: Array,
  time : { type : Date, default: Date.now }
});

var models = {
  'code': code
}


var act = {
  getall: function(callback){
    code.find({}, function(e,ar){
      var data = [];
      for(var i in ar){
        data.push({
          id: ar[i].id,
          text: ar[i].text,
          likes: ar[i].likes.length
        })
      }
      callback(data.sort(function(a,b){
        return b.likes - a.likes;
      }));
    })
  },
  addlike: function(data){
    code.findById( data.id2  , function(err,o){
      if(o && o.likes.indexOf(data.id) == -1 && o.likes.owner != data.id ){
        o.likes.push(data.id );
        o.save();
      }
    })
  },
  add: function(ar){
    code.find({owner: ar.id }, function(err,o){
      if(o.length < 3){
        var ac = new code({
          owner: ar.id ,
          text:  ar.message ,
          likes: []
        });
        console.log(ac.save());
      }
    })
  }
}

code.find({}, function(err,data){
  console.log(err?err:data);
})

// var ac = new code({
//   owner: "ars",
//   text: "hello world",
//   likes: []
// });
// console.log(ac.save());



var gets = {
  '/upd/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      code.findById( req.params.id , function(err,o){
        if(o){
          for(var i in req.query){
            o[i] = req.query[i];
          }
          console.log(o.save());
        } else {
          console.log({error: "not found"});
        }
      })
    }else{
      console.log({error: "no model find"});
    }
  },
  '/rem/:id': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      if(req.query.token=='token'){
        code.findById(req.params.id , function(err,o){
          o? console.log(o.remove()) : console.log({error: "not found"})
        })
      }else{
        console.log({error: "no token passed"});
      }
    }else{
      console.log({error: "no model find"});
    }
  }
}

module.exports = act;
