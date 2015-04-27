window.onload = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;

    ctx.strokeStyle = "red";

    function Game(N,M) {
        this.N = N;
        this.M = M;
        this.field = {};
    }

    Game.prototype.start = function() {
        this.field = {
            cells: [],
            nextgen: []
        };     
        this.field.cells = new Array(this.N);
        this.field.nextgen = new Array(this.N);
        for (var i = 0; i < this.M; i++) {
            this.field.cells[i] = new Array(this.M);
            this.field.nextgen[i] = new Array(this.M);
        }
        this._rand(1);       
    };

    Game.prototype._rand = function(param) {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {
                this.field.cells[i][j] = 0; //Math.round(param*Math.random());     
                this.field.nextgen[i][j] = this.field.cells[i][j];    
            }
        } 
        
        this.field.cells[0][1] = this.field.nextgen[0][1] = 1;
        this.field.cells[1][2] = this.field.nextgen[1][2] = 1;
        this.field.cells[2][2] = this.field.nextgen[2][2] = 1;
        this.field.cells[2][1] = this.field.nextgen[2][1] = 1;
        this.field.cells[2][0] = this.field.nextgen[2][0] = 1;
            
    };

    Game.prototype.fill = function(c) {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {                
                if (c[i][j] === 0) {
                    ctx.fillStyle = 'white';
                } else {
                    ctx.fillStyle = 'black';
                }
                ctx.fillRect(i*w/this.N,j*h/this.M,(i+1)*w/this.N,(j+1)*h/this.M);
            }
        }        
    };

    Game.prototype.clear = function() {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {                
                ctx.fillStyle = 'white';
                ctx.fillRect(i*w/this.N,j*h/this.M,(i+1)*w/this.N,(j+1)*h/this.M);
            }
        }     
    };

    Game.prototype.check = function(c,n) {         
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {                
                
                var sum = this._sum(c,i,j);

                if (c[i][j] === 1) {
                    if (sum < 2) {
                        n[i][j] = 0;  // alone -> die
                    }
                    if (sum > 3) {
                        n[i][j] = 0; // to many neighbors -> die
                    }
                } else {
                    if (sum === 3) {
                        n[i][j] = 1;  // new life
                    }
                }                
            }
        } 
        //this.clear();
        this.fill(n);
        
        for(var i = 0; i < this.M; i++) {
            for (var j = 0; j < this.N; j++) {
                c[i][j] = n[i][j];
            }
        }
    };

    Game.prototype._sum = function(c,i,j) {        
        var sum = 0;
        for (var ii = i-1; ii <= i+1; ii++) {
            for (var jj=j-1; jj <= j+1; jj++) {
                if (!(ii === -1 || jj === -1 || ii === this.N || jj === this.M || (ii===i&&jj===j))) 
                    sum += c[ii][jj];
            } 
        } 
        
        return sum;
    }

    Game.prototype.cycle = function() {
        var that = this;        
        setInterval(function(){            
            that.check(that.field.cells,that.field.nextgen);    
        },400);  
    };

    var game = new Game(50,50);
    game.start();
    game.fill(game.field.cells);
    game.cycle();



};