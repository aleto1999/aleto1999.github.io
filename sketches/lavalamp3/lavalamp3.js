const lavaLamp3 = ( c ) => {

	let leaders = [];
	let followers = [];
	let field = []; 

	let spacing; 
	let k; 
	let num_leaders;
	let num_followers;
	let vec_scale; 



	c.setup = function(){
		let canvas = c.createCanvas(c.windowWidth*0.5,c.windowHeight*0.6);
		c.background('black');
		field = c.createVector(c.width,c.height); // correct?

		num_leaders = 2; 
		num_followers = 1; 
		spacing = 20; 
		vec_scale = 3000; 

		for(let i = 0; i < num_leaders; i++){
			leaders.push(new c.Leader(c.random(0,c.width), c.height)); // TODO: adjust to leaders.push(new Leader(random(0,width), height));

		}

		leaders[0].velocity = c.createVector(0, -0.5);

		for(let i = 0; i < num_followers; i++){
	    	followers.push(new c.Follower(c.random(0,c.windowWidth), c.windowHeight));
	    	followers[i].findLeader();
	  	}

	  	c.new_field();

	};

	c.draw = function(){

		c.background('black');

		if (c.frameCount % 30 == 0){
			c.new_field();
		}

		for (let i = 0; i < num_leaders; i++){

			leaders[i].applyField();
			leaders[i].addDelay(); 
			leaders[i].move();
			leaders[i].edges(leaders[i].max_y);
			leaders[i].show();
		}

		for (let i = 0; i < num_followers; i++) {
			if (followers[i].time_following > 500){ // originally 1000
				// if (c.random(0,1)<0.3){
				// 	followers[i].findLeader();
				// } else {
				// 	followers[i].time_following = 800;
				// }
				followers[i].findLeader();
			}
			if (followers[i].following != '') {
				followers[i].follow_leader();
			}
			followers[i].applyField();
			followers[i].move(); 
			followers[i].edges(c.height);
			followers[i].show();
		
		}

	};


	c.new_field = function(){
		k = k + c.random(0,3); 
		for (let i = 0; i < c.height; i += spacing){
			let mag = c.map(i, 0, c.height, spacing/vec_scale, -spacing/vec_scale);
			for (let j = 0; j < c.width; j += spacing) {
				let loc = j * i + c.width; 
				let angle = c.map(c.noise(i,j,k), 0, 1, c.PI, 0);
				let temp_vec = p5.Vector.fromAngle(angle); // IDK
				temp_vec = temp_vec.mult(mag);
				field[location] = temp_vec; 
			}
		}

	}


	c.Ball = class Ball {
		constructor(x,y){
			this.col = 0;
			this.pos = c.createVector(x,y);
			this.rad = 90; 
			this.velocity;
		}
		show(){
			c.fill('#D426BD'); 
			c.stroke('#D426BD'); 
			c.ellipse(this.pos.x, this.pos.y, this.rad + c.random(0,3), this.rad + c.random(0,3));
		}
		applyField(){
			let near_x = c.int( this.pos.x - (this.pos.x % spacing) );
			let near_y = c.int( this.pos.y - (this.pos.y % spacing) );
			this.addForce(field[near_x + near_y * c.width]);
		}
		addForce(p){
			this.velocity.add(p); 
		}
		move(){
	    	this.pos.add(this.velocity);
	  	}
	   edges(max){
	   	    if(this.pos.x > c.width-2 || this.pos.x<2){
	      		this.pos.x = this.pos.x<2? this.rad : c.width-2;
	      		this.velocity.x = -1 * this.velocity.x;
	    	}
	    	if(this.pos.y > max-2 || this.pos.y<2){
	    		this.pos.y = this.pos.y<2 ? 2 : max-2;
	    		this.velocity.y = -1 * this.velocity.y;
	    	}
	   }
	}

	c.Leader = class Leader extends c.Ball {
		constructor(x, y) {
	    	super(x, y);
	    	this.velocity = c.createVector(0, c.random(0,1));
	    	this.max_y =  c.height - 30 + c.random(0,30);

		}
		addDelay(){
			if(this.pos.y > (c.windowHeight - 40) && this.velocity.heading() > 0){
				this.velocity.y += 0.0015;
			} else if((this.pos.y < 40)&&(this.velocity.heading() < 0)){
				this.velocity.y -= 0.001;
			}
		}
	}

	c.Follower = class Follower extends c.Ball {
		constructor(x, y) {
	    	super(x, y);
	    	this.velocity = c.createVector(0, c.random(0,2)); //can be whatever 
	    	this.max_y = c.random(0,c.height); // check this
	    	this.following = '';  
	    	this.time_following = 0;
	    	this.leaving_leader = false; 
	    	this.previous = '';
	    	this.time_leaving = 0; 
		}
		findLeader(){

			let nearest = '';
			this.previous = this.following; 
			let min_dist = 9999999; 

			for (let i = 0; i < num_leaders; i++) {
				if (leaders[i] != this.previous) {
					let temp = this.pos.dist(leaders[i].pos);
					if (temp < min_dist) {
						nearest = leaders[i]; 
						min_dist = temp; 
					}
				}
			}

			this.following = nearest; 
			this.time_following = 0; 
			this.leaving_leader = true; // signals animation for leaving previous leader
			this.time_leaving = 0; 

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
	    	if (this.leaving_leader == true){
				this.leaving();
				this.time_leaving++; 

				if (this.time_leaving == 100) {
					this.time_leaving = 0; 
					this.leaving_leader = false;
				}
			}
	    	this.time_following++;  //track frames following
		}

		leaving(){

			

			if (this.previous == ''){ // unsure why this is necessary 
				return; 
			}

			// calculate point exactly between leader and follower
			let centerPt = c.createVector(0,0);
			p5.Vector.lerp(this.previous.pos, this.pos, 0.5, centerPt); 
	
			// get vector between two shapes, calculate perpendicular vector
			let betweenVec = c.createVector(this.previous.pos.x - this.pos.x, this.previous.pos.y - this.pos.y);
			let perpVec = c.createVector(betweenVec.y,-betweenVec.x);

			// set magnitude of perpendicular vector to radius of leader
			let leaderVec = perpVec;
			leaderVec.setMag(this.previous.rad / 2);

			// calculate exact "top" and "bottom" of leader by adding perp vec to origin
			let leaderTop = c.createVector(0,0); 
			let leaderBot = c.createVector(0,0); 
			p5.Vector.add(this.previous.pos,leaderVec,leaderTop); 
			leaderVec.mult(-1);
			p5.Vector.add(this.previous.pos,leaderVec,leaderBot);
 
			// repeat above for follower
			let followerVec = perpVec;
			followerVec.setMag(this.rad / 2);

			let followerTop = c.createVector(0,0); 
			let followerBot = c.createVector(0,0); 
			p5.Vector.add(this.pos,followerVec,followerTop); 
			followerVec.mult(-1);
			p5.Vector.add(this.pos,followerVec,followerBot);


			// c.triangle(leaderBot.x,leaderBot.y,leaderTop.x,leaderTop.y,centerPt.x,centerPt.y);
			// c.triangle(followerBot.x,followerBot.y,followerTop.x,followerTop.y,centerPt.x,centerPt.y);

			c.stroke('white');
			c.strokeWeight(4); 
			c.noFill();

			let botControlLeader = c.createVector(0,0);
			let topControlLeader = c.createVector(0,0);
			p5.Vector.add(leaderBot,leaderVec,botControlLeader); 
			p5.Vector.mult(botControlLeader, -2, botControlLeader);
			leaderVec.mult(-1);
			p5.Vector.add(leaderTop,leaderVec,topControlLeader); 
			p5.Vector.mult(topControlLeader, -2, topControlLeader);

			let botControlFollower = c.createVector(0,0);
			let topControlFollower = c.createVector(0,0);
			p5.Vector.add(followerBot,followerVec,botControlFollower); 
			p5.Vector.mult(botControlFollower, -2, botControlFollower); 
			leaderVec.mult(-1);
			p5.Vector.add(followerTop,followerVec,topControlFollower);
			p5.Vector.mult(topControlFollower, -2, topControlLeader); 

			c.curve (botControlLeader.x, botControlLeader.y, leaderTop.x,leaderTop.y, followerBot.x,followerBot.y, topControlFollower.x,topControlFollower.y); 
			c.curve (topControlLeader.x, topControlLeader.y, leaderBot.x,leaderBot.y, followerTop.x,followerTop.y, topControlLeader.x,topControlLeader.y); 

			console.log(botControlLeader);
			console.log(topControlFollower);



		}

	}
};

let lavaLamp3P5 = new p5(lavaLamp3, 'lavaLamp3');

