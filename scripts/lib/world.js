define(["vector2D"], function(Vector2D) { 
    
  "use strict";
  
  var mapReader, World, Iterator;
    
  World = function(reader) {
    mapReader = reader;
      
    this.getIterator = function(from, to) {
      return new Iterator(this, from, to);
    };
        
    this.getTileAt = function(position) {
      return reader.getTileAt(position);
    };
        
    this.setTileAt = function(position, tile) {
      reader.setTileAt(position, tile);
    };
        
    this.getWidth = function() {
      return reader.getWidth();
    };
        
    this.getHeight = function() {
      return reader.getHeight();
    };      
  };
    
  Iterator = function(world, from, to) {
    
    from = from || Vector2D.VECTOR_ZERO.clone();
    to   = to   || Vector2D.create(world.getWidth()-1, world.getHeight()-1);

       
    var current,
        moveVector = Vector2D.create(1, 0);

    this.current = function() {
      return current;
    };
        
    this.hasNext = function() {
      return !current || !current.equal(to);
    };
            
    this.next = function() {
      if (!current) {
        current = from;
      } else {
        current.add(moveVector);
      }

      if(current.x >= world.getWidth()) {
        current.x  = 0;
        current.y += 1;
      }
 
      return current;
    };
        
  };  
  
  return {
    create: function(mapReader) {
      return new  World(mapReader);
    }
  };

});
