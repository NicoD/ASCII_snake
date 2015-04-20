define(function() {
    
   "use strict";
   
   var Vector2D = function(x, y) {
       this.x = x;
       this.y = y;
       
       this.clone = function() {
           return new Vector2D(this.x, this.y);
       };
       
       this.equal = function(v) {
           return (this.x === v.x && this.y === v.y);
       };
       
       this.add = function(v) {
           this.x += v.x;
           this.y += v.y;
       };
       
       this.sub = function(v) {
           this.x -= v.x;
           this.y -= v.y;
       };
       
       this.multiply = function(v) {
           this.x *= v.x;
           this.y *= v.y;
       };
       
       this.divide = function(v) {
           this.x /= v.x;
           this.y /= v.y;
       };
       
       this.dot = function(v) {
           return this.x*v.x + this.y*v.y;
       };
       
       this.cross = function(v) {
           return this.x*v.y - this.y*v.x;
       };
       
       this.projection = function(v) {
            return this.multiply(this.dot(v) / v.dot(v));
       };
       
       this.perpendicular = function(v) {
           return this.substract(this.projection(v));
       };
   };
   
   return {
       create: function(x, y) {
           return new Vector2D(x, y);
       },
       
       VECTOR_ZERO: (function() {
           return new Vector2D(0, 0);
       }())
   };
});
