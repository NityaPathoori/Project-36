class Food {
   constructor () {
      this.foodStock = null;
      this.lastFed = null;
      this.milkImage = loadImage("milkImg.png");
}

  
   
   
   
   getfoodStock() {
      var foodRef = database.ref("Food");
      foodRef.on("value",function(data){
      this.foodStock = data.val();
   })
      

   }

   updatefoodStock(A) {
      database.ref("/").update({
         Food:A
      })
      
      
   }

   deductFood() {
      this.foodStock = this.foodStock-1

   }

   updatelastFed(time) {
      database.ref("/").update({
         lastFed:time
      })
   }

   display() {
      var x=80, y=100;

      imageMode(CENTER);
      image(this.milkImage,720,220,70,70);

      if(this.foodStock!=0) {
         for(var i=0;i<this.foodStock;i++){
            if(i%10==0) {
               x=80;
               y=y+50
            }
            image(this.milkImage,x,y,50,50);
            x=x+30;
         }
      }
   }

   bedroom() {
      background(bedroom,550,500);
    }
  
     garden() {
      background(garden,550,500);
    }
  
    washroom() {
      background(washroom,550,500)
    }

    currentTime=hour();
    if(currentTime==(lastFed+1)){
       update("Playing");
       foodObj.garden();
    }else if(currentTime==(lastFed+2)){
      update("Sleeping");
      foodObj.bedroom();
    }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
       update("Bathing");
       foodObj.washroom();
    }else{
       update("Hungry");
      foodObj.display();
    }
}