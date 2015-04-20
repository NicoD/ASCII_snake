define(["jquery", "world", "player", "tileMapReaderASCII", "vector2D"], 
    function($, World, Player, TileMapReaderASCII, Vector2D) {
    
    "use strict";
      
    /*jslint bitwise:true, plusplus:true*/
   
    (function() {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    }());

    var Game = function() {
        var state = 'game',
        lastTimeStampUpdate = 0, world, player, buff, asciiBuffView;
        
        (function() { 
            var i, xCurr, yCurr, ch, tileMap = [[]],
                translation,
                strMap = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + "\n" +
                         'X                                                                  X' + "\n" +
                         'X                                    O        O                    X' + "\n" +
                         'X                                                                  X' + "\n" +
                         'X           O                O                                     X' + "\n" +
                         'X                                                                  X' + "\n" +
                         'X                                       O                 O        X' + "\n" +
                         'X                    O                                             X' + "\n" +
                         'X                                                                  X' + "\n" +    
                         'X                                                                  X' + "\n" +                         
                         'X                                                        O         X' + "\n" +
                         'X                      O             O                             X' + "\n" +
                         'X                                                                  X' + "\n" +
                         'X           O                                                      X' + "\n" +
                         'X                                                         O        X' + "\n" +
                         'X                                                                  X' + "\n" +
                         'X                                    O                             X' + "\n" +
                         'X                      O                    O                      X' + "\n" +    
                         'X                                                                  X' + "\n" +                         
                         'X                                                                  X' + "\n" +
                         'X               O                                                  X' + "\n" +                         
                         'X                                      O                           X' + "\n" +
                         'X           O                                             O        X' + "\n" +
                         'X                                                                  X' + "\n" +    
                         'X                           O                                      X' + "\n" +                         
                         'X                                                                  X' + "\n" +                         
                         'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
            xCurr = 0; yCurr = 0;
            
            for(i=0; i<strMap.length; i++) {
                ch = strMap[i];            
                if(ch === "\n") {
                    tileMap[++yCurr] = [];
                    xCurr = 0;
                } else {
                    tileMap[yCurr][xCurr++] = ch;
                }
            }
                
            translation = {
                getTileFromElement: function(element, tile) {
                    tile.ascii = element;
                    switch(element) {
                        case 'X':
                            tile.type = 'wall';
                        break;
                        
                        case 'O':
                            tile.type = 'bonus';
                        break;
                        
                        case ' ':
                            tile.type = 'ground';
                        break;
                    }
                },
                
                getElementFromTile: function(tile) {
                    switch(tile.type) {
                        case 'wall':
                            return 'X';
                        case 'bonus':
                            return 'O';
                        case 'ground':
                            return ' ';
                    }
                }
            };
        
        
            world = World.create(
                TileMapReaderASCII.create(tileMap, translation)
            );
            
            player = Player.create(Vector2D.create(Math.floor(world.getWidth()/2), Math.floor(world.getHeight()/2)));

            $(document).keypress(function(e) {
                switch(e.which) {
                    case 113:
                        player.direction = 'left';
                    break;
                    
                    case 115:
                        player.direction = 'up';
                    break;
                    
                    case 100:
                       player.direction = 'right';
                     break;
                    
                    case 122:
                        player.direction = 'down';
                    break;
                }
            });
        }());
            
        this.update = function(timestamp) {
            if((timestamp - lastTimeStampUpdate) < player.speed) {
                return;
            }
            lastTimeStampUpdate = timestamp;
            var rndPosition, lastPosition = player.position.clone();
            
            switch (player.direction) {
                case 'left':
                    player.moveLeft();
                break;
                case 'right':
                    player.moveRight();
                break;
                case 'up':
                    player.moveUp();
                break;
                case 'down':
                    player.moveDown();
                break;                  
            }
            if(player.hadCollideWithTail() || world.getTileAt(player.position).type === 'wall') {
                state = 'over';  
            } else {
                if(world.getTileAt(player.position).type === 'bonus') {
                    player.points += Math.floor(1000/player.speed) - (Math.floor(1000/player.speed)%5);
                    
                    world.setTileAt(player.position, {type: 'ground'});
                    rndPosition = Vector2D.create();
                    do {    
                        rndPosition.x = Math.floor(Math.random()*world.getWidth()-2);
                        rndPosition.y = Math.floor(Math.random()*world.getHeight()-2);
                    } while(world.getTileAt(rndPosition).type !== 'ground');
                    world.setTileAt(rndPosition, {type: 'bonus'});
                    player.addTail();
                }
            }
            
            this.draw();
        };


        
        buff = new ArrayBuffer(2 + 2*world.getWidth()*world.getHeight());
        asciiBuffView = new Int16Array(buff);
        
        this.updateBuffer = function() {
            var i=0, currPosition,
                iterator = world.getIterator();
            
            while(iterator.hasNext()) {
                currPosition = iterator.next();
                asciiBuffView[++i] = world.getTileAt(currPosition).ascii.charCodeAt(0);
            }
            
            asciiBuffView[player.position.x+1 + player.position.y*world.getWidth()] = '@'.charCodeAt(0);
            for(i=0; i < player.tail.length; i++) {
                asciiBuffView[player.tail[i].x+1 + player.tail[i].y*world.getWidth()] = '¤'.charCodeAt(0);                
            }            
        };
        
        
        this.draw = function() {
            var dispBuff = "", i;
                
            switch(state) {
                case 'over':
                    dispBuff += "================ GAME OVER ===================== ";
                break;
                case 'game':
                    this.updateBuffer();
                   
                    for (i=0; i<asciiBuffView.length; i++) {
                        dispBuff += String.fromCharCode(asciiBuffView[i]);
                        if(i%world.getWidth() === 0) {
                            dispBuff += "<br />";
                        }
                    } 
                break;
            }
            $('#point').html(player.points);
            $('#canvasASCII').html(dispBuff);
        };
        
        
        this.start = function() {
            var self = this,
            i = 0,
            animate = function(timestamp) {
                if(state === 'over') {
                    return;
                }
                self.update(timestamp); 
                window.requestAnimationFrame(animate);
            };
            window.requestAnimationFrame(animate);           
        };
    };
        
    return {
        create: function() {
            return new Game();
        }
    };
});
