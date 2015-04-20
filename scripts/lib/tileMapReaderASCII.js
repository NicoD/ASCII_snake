define(["vector2D"], function(Vector2D) { 
    
    "use strict";


    var elements, translation,
    
    TileMapReaderASCII = function(elts, trans) {
        elements = elts;
        translation = trans;
        
        
        var tile = {};
        
        this.getHeight = function() {
            return elements.length;    
        };
        
        this.getWidth = function() {
            return (elements.length > 0 ? elements[0].length : 0);
        };
        
        this.getTileAt = function(position) {
            if(!elements[position.y]) {
                return {};
            }
            var element = elements[position.y][position.x] || null;
            translation.getTileFromElement(element, tile);
            
            return tile;
        };
        
        this.setTileAt = function(position, tile) {
          elements[position.y][position.x] = translation.getElementFromTile(tile);
        };
    };
    
    
    return {
        create: function(elements, translation) {
            return new TileMapReaderASCII(elements, translation);
        }
    };
});