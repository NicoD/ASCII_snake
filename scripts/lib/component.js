define(function() { 
    
  "use strict";

  var id,
      name,
    
  Component = function() {
    this.setId = function(i) {
      id = i;
      return this;
    };
    this.setName = function(n) {
      name = n;
      return this;
    };
    this.getId = function() {
      return id;
    };
    this.getName = function() {
      return name;
    };
  };
    
  return {
    create: (function() {
      return new Component();
    }())
  };
});

