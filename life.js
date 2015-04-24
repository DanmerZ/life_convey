window.onload = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;

    ctx.strokeStyle = "black";

    function Game(N,M) {
        this.N = N;
        this.M = M;
        this.field = {};
    }

    Game.prototype.start = function() {
        this.field = {
            cells: []          
        };     
        this.field.cells = new Array(this.N);
        for (var i = 0; i < this.M; i++) {
            this.field.cells[i] = new Array(this.M);
        }
        this._rand(.525);       
    };

    Game.prototype._rand = function(param) {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {
                this.field.cells[i][j] = Math.round(param*Math.random());
            }
        } 
    };

    Game.prototype.fill = function() {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {                
                if (this.field.cells[i][j] === 0) {
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

    Game.prototype.check = function() {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {                
                var cells = this.field.cells;
                var sum = this._sum(i,j);

                if (cells[i][j] === 1) {
                    if (sum === 0) {
                        cells[i][j] = 0;  // alone -> die
                    }
                    if (sum > 3) {
                        cells[i][j] = 0; // to many neighborers -> die
                    }
                } else {
                    if (sum === 3) {
                        cells[i][j] = 1;  // new life
                    }
                }
            }
        }  
    };

    Game.prototype._sum = function(i,j) {
        var c = this.field.cells;  
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
            that.check();
            that.clear();
            that.fill();          
        },1000);  
    };

    var game = new Game(50,50);
    game.start();
    game.fill();
    game.cycle();



};