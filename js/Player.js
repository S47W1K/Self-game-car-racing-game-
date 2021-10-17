class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank= null;
    this.positionX=0;
    this.positionY=0;
  }
  

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
   
    
    database.ref(playerIndex).set({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY,
      distance:this.distance,
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

getCarsAtEnd(){
  database.ref("CarsAtEnd").on("value",(data)=>{
    this.rank=data.val();
  })
}

getDistance(){
var playerDistanceref=database.ref('players/player'+this.index)
playerDistanceref.on('value',data=>{
  var data= data.val()
  this.positionX=data.positionX;
  this.positionY=data.positionY;
})

}

static updateCarsAtEnd(rank){
  database.ref('/').update({
    CarsAtEnd:rank
  });
}
}
