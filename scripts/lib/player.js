define(function() {
   
  "use strict";
   
  /*jslint bitwise:true, plusplus:true*/   
   
  var Player = function(position) {
    this.points = 0;
    this.speed = 70;
    this.tail = [];
    this.position = position.clone();
       
    this.direction = null;
       
    var MAX_SPEED = 10, prevPosition;
    this.addTail = function() {
      this.tail[this.tail.length] = prevPosition.clone();
           
      this.speed = Math.max(MAX_SPEED, this.speed - 0.5);
    };
       
    this.hasTailAt = function(position) {
      var i;
           
      for(i=0; i<this.tail.length; i++) {
        if(this.tail[i].equal(position)) {
          return true;
        }
      }
    };
       
    this.hadCollideWithTail = function() {
      return this.hasTailAt(this.position) || ((this.tail.length === 1) && this.position.equal(prevPosition));
    };
              
    this.moveTail = function(headLastPosition) {
      var i, tmpPosition;
           
      prevPosition = headLastPosition.clone();
      for(i = 0; i < this.tail.length; i++) {
        tmpPosition = this.tail[i];
               
        this.tail[i] = prevPosition.clone();
        prevPosition = tmpPosition;
      }
    };
              
    this.moveUp = function() {
      this.moveTail(this.position);
      this.position.y++;     
    };
       
    this.moveDown = function() {
      this.moveTail(this.position);           
      this.position.y--;
    };
       
    this.moveLeft = function() {
      this.moveTail(this.position);           
      this.position.x--;
    };
       
    this.moveRight = function() {
      this.moveTail(this.position);          
      this.position.x++;
    };
  };
   
  return {
    create: function(position) {
      return new Player(position);
    }
  };
});
