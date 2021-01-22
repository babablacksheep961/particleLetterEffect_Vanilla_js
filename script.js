const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 100
} 

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;

});

ctx.fillStyle = 'white';
ctx.font = '25px Verdana';
ctx.fillText('NICHOLAS',5,40);
 const textCoordinates = ctx.getImageData(0, 0, 200, 200);

 class Particle {
     constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 1.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20);
     }
     draw(){
         ctx.fillStyle = 'white';
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
         ctx.closePath();
         ctx.fill();
     }
     update(){
         let dx = mouse.x - this.x;
         let dy = mouse.y - this.y;
         let distance = Math.sqrt(dx * dx + dy * dy);
         let forceDirectionX = dx / (distance) ;
         let forceDirectionY = dy / (distance) ;
         let maxDistance = 10000;
         let force = (maxDistance - distance) / maxDistance;
         let directionX = forceDirectionX * force * this.density * 2;
         let directionY = forceDirectionY * force * this.density * 2;
         if(distance < mouse.radius){
             this.x -= directionX;
             this.y -= directionY;
         } else {
             if (this.x !== this.baseX){
                 let dx = this.x - this.baseX;
                 this.x -= dx/25;
             }
             if (this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/5;
            }
             
         }
     }
 }

 function init() {
     particleArray = [];
     for (let y = 0, y2 = textCoordinates.height; y < y2; y += 1){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x += 1){
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle((positionX + 1) * 11,(positionY + 1) * 11));
                particleArray.push(new Particle((positionX + 1) * 11,(positionY + 1) * 11));
                particleArray.push(new Particle(positionX * 11,positionY * 11));
            }  
        } 
     }
     //particleArray.push(new Particle(50,50));
     //particleArray.push(new Particle(80,50));
 }
 init();
 console.log(particleArray);

 function animate(){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     for (let i = 0; i < particleArray.length; i++){
         particleArray[i].draw();
         particleArray[i].update();
     }
     requestAnimationFrame(animate);
 }
 animate();