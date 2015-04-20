define(['map'], function(Map) { 
    
  "use strict";

  var compIn,
      compOut,
        
  Transformation = function() {
    this.setCompIn = function(cIn) {
      if (cIn instanceof Map) {
        compIn = cIn;
      } else {
        compIn = new Map();
        compIn.add(cIn);
      }
      return this;            
    };
        
    this.setCompOut = function(cOut) {
      cOut = compOut;            
      return this;
    };
        
    this.getCompIn = function() {
      return compIn;
    };
        
    this.getCompOut = function() {
      return compOut;
    };
  };
    
  return {
    create: (function() {
      return new Transformation();
    }())
  };
});

