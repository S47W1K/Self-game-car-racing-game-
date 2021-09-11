class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    player.getDistance();

    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 220 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x=allPlayers[plr].positionX

        //position the cars a little away from each other in x direction
        //x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].positionY;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }


    if(keyIsDown(LEFT_ARROW)&& player.index !== null){
      player.positionX=player.positionX-5
      player.update()
      }
  
      if(keyIsDown(RIGHT_ARROW)&& player.index !== null){
        player.positionX=player.positionX+5
        player.update()
        }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      //ellipse(displayWidth/2+500,700,200,200)
      //text(10,displayWidth/2+500,700)
      player.positionY= player.positionY+5
      player.update();
    }

    if(player.distance>100 && keyDown(UP_ARROW)){
    player.distance +=10
    player.update();
    }

    if(player.distance>200 && keyDown(UP_ARROW)){
      player.distance +=15
      player.update();
      }
    if(player.distance>300 && keyDown(UP_ARROW)){
     player.distance +=20
     player.update();
     }
     if(player.distance>400 && keyDown(UP_ARROW)){
      player.distance +=25
      player.update();
      }
      if(player.distance>500 && keyDown(UP_ARROW)){
        player.distance +=30
        player.update();
        }
        if(player.distance>600 && keyDown(UP_ARROW)){
          player.distance +=35
          player.update();
          }
 
          if(player.distance>800 && keyDown(UP_ARROW)){
            player.distance +=40
            player.update();
            }

    if(player.distance > 4200){
      gameState = 2;
      player.rank= player.rank+1
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
    /*if(keyWentDown(UP_ARROW) && player.distance){
      ellipse(displayWidth/2+500,camera.position.y,200,200)
      text(10,displayWidth/2+500,camera.position.y)
    }*/
  }

  end(){
    console.log("Game Ended")
    console.log(player.rank);
  }
}
