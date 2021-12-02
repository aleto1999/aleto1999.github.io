let leaders = [];
let followers = [];
let field = []; 

let spacing; 
let k; 
let orb_size; 
let num_leaders;
let num_followers;
let vec_scale; 



function setup() {
	let canvas = createCanvas(windowWidth*0.5,windowHeight*0.6);
	canvas.parent('lavalamp1');
	background('black');
	field = createVector(windowWidth,windowHeight);

	num_leaders = 4; 
	num_followers = 8; 
	spacing = 20; 
	vec_scale = 3000; 
	orb_size = 2; 

	for(let i = 0; i < num_leaders; i++){
		leaders.push(new Leader(random(0,width), random(0,height))); // TODO: adjust to leaders.push(new Leader(random(0,width), height));

	}

	leaders[0].velocity = createVector(0, -0.5);

	for(let i = 0; i < num_followers; i++){
    	followers.push(new Follower(random(0,windowWidth), windowHeight));
    	followers[i].findLeader();
  	}

  	new_field();

}

function draw() {

	background('black');

	if (frameCount % 30 == 0){
		new_field();
	}

	for (let i = 0; i < num_leaders; i++){

		leaders[i].applyField();
		leaders[i].addDelay(); 
		leaders[i].move();
		leaders[i].edges(leaders[i].max_y);
		leaders[i].show();
	}

	for (let i = 0; i < num_followers; i++) {
		if (followers[i].time_following > 1000){
			if (random(0,1)<0.3){
				followers[i].findLeader();
			} else {
				followers[i].time_following = 800;
			}
		}
		if (followers[i].following != '') {
			followers[i].follow_leader();
		}
		followers[i].applyField();
		followers[i].move(); 
		followers[i].edges(height);
		followers[i].show();
	
	}

}


function new_field(){
	k = k + random(0,3); 
	for (let i = 0; i < height; i += spacing){
		let mag = map(i, 0, height, spacing/vec_scale, -spacing/vec_scale);
		for (let j = 0; j < width; j += spacing) {
			let loc = j * i + width; 
			let angle = map(noise(i,j,k), 0, 1, PI, 0);
			let temp_vec = p5.Vector.fromAngle(angle);
			temp_vec = temp_vec.mult(mag);
			field[location] = temp_vec; 
		}
	}

}


class Ball {
	constructor(x,y){
		this.col = 0;
		this.pos = createVector(x,y);
		this.rad = 800; 
		this.velocity;
	}
	show(){
		fill('#D426BD'); 
		stroke('#D426BD'); 
		ellipse(this.pos.x, this.pos.y, (orb_size * 90) + random(0,3), (orb_size * 90)+ random(0,3));
	}
	applyField(){
		let near_x = int( this.pos.x - (this.pos.x % spacing) );
		let near_y = int( this.pos.y - (this.pos.y % spacing) );
		this.addForce(field[near_x + near_y * width]);
	}
	addForce(p){
		this.velocity.add(p); 
	}
	move(){
    	this.pos.add(this.velocity);
  	}
   edges(max){
   	    if(this.pos.x > width-orb_size || this.pos.x<orb_size){
      		this.pos.x = this.pos.x<orb_size? orb_size : width-orb_size;
      		this.velocity.x = -1 * this.velocity.x;
    	}
    	if(this.pos.y > max-orb_size || this.pos.y<orb_size){
    		this.pos.y = this.pos.y<orb_size ? orb_size : max-orb_size;
    		this.velocity.y = -1 * this.velocity.y;
    	}
   }
}

class Leader extends Ball {
	constructor(x, y) {
    	super(x, y);
    	this.velocity = createVector(0, random(0,2));
    	this.max_y =  height - 30 + random(0,30);

	}
	addDelay(){
		if(this.pos.y > (windowHeight - 40) && this.velocity.heading() > 0){
			this.velocity.y += 0.0015;
		} else if((this.pos.y < 40)&&(this.velocity.heading() < 0)){
			this.velocity.y -= 0.001;
		}
	}
}

class Follower extends Ball {
	constructor(x, y) {
    	super(x, y);
    	this.velocity = createVector(0, random(0,2)); //can be whatever 
    	this.max_y = random(0,windowHeight);
    	this.following = '';  
    	this.time_following = 0;
	}
	findLeader(){
		let nearest = '';
		let last = this.following; 
		let min_dist = 9999999; 

		for (let i = 0; i < num_leaders; i++) {
			if (leaders[i] != last) {
				let temp = this.pos.dist(leaders[i].pos);
				if (temp < min_dist) {
					nearest = leaders[i]; 
					min_dist = temp; 
				}
			}
		}

		this.following = nearest; 
		this.time_following = 0; 

	}
	follow_leader(){
		if(this.following == ''){ 
			return; 
		} 
		let desired = p5.Vector.sub( this.following.pos ,this.pos);
		this.velocity.lerp(desired, 0.002);
		if(this.velocity.mag()>2){
      		this.velocity.setMag(2);  //don't let Followers move too fast, looks bad
    	}
    	this.time_following++;  //track frames following
	}

}