class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.button2 = createButton("Reset");
    
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.button2.position(displayWidth/2 + 500, 100);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;

      if(player.index===1){
        player.positionX=400
      }
      else if(player.index===2){
        player.positionX=650
      }
      else if(player.index===3){
        player.positionX=900
      }
      else{
        player.positionX=1150
      }

      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      player.getDistance()
    });

    this.button2.mousePressed(()=>{
     game.update(0) 
     player.updateCount(0)});

    

  }
}
