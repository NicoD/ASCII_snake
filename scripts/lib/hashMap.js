define(function() { 
    
  "use strict";

  var keyField,
      map = {},
        
  HashMap = function(k) {
        
    keyField = k || "id";
    this.add = function(component) {
      map[component[keyField]] = component;
      return this;            
    };
        
    this.get = function(key) {
      return map[key] || null;
    };
        
    this.remove = function(mix) {
      var key = typeof(mix) === "object" ? mix[keyField] : mix;
      map[key] = null;
    };
        
    this.exists = function(mix) {
      var key = typeof(mix) === "object" ? mix[keyField] : mix;            
      return !!map[k];
    };
  };
    
  return {
    create: (function() {
      return new HashMap();
    }())      
  };
});

