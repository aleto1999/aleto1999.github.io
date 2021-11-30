
let tetras = []; // hold Tetra objects

let p1; // points for next Tetra
let p2;
let p3;
let p4;

let colors = [];
let fill_color = 0;
let lines;
// indices = [7, 8, 9, 7, 6, 7, 6, 5, 5];
let indices = [6, 5, 4, 6, 7, 6, 7, 8, 8];





function setup() {

  let canvas = createCanvas(windowWidth * 0.5, windowHeight * 0.5,WEBGL);
  canvas.parent('animation');
  background('black');
  ortho();
  ambientLight(100);

  p1 = new Point(10,10,10);
  p2 = new Point(10,-10,-10);
  p3 = new Point(-10,10,-10);
  p4 = 'NULL'; 

  // color scheme of structure 
  colors = [color('#fa6e6e'), color('#f0677b'), color('#e36386'), color('#d3608f'), color('#c16095'), color('#ae609a'), color('#9a609b'), color('#855f9a'), color('#715e96'), color('#5e5d8f'), color('#4d5a86'), color('#3f577c'), color('#345271'), color('#2d4d64'), color('#2a4858')];

}

// runs repeatedly for animation 
function draw() {

  // clear canvas on each iteration 
  background('black');

  // rotate entire structure around y axis 
  rotateY(frameCount * 0.1);
  frameRate(15);

  // randomly select color, create new tetra 
  print(fill_color);
  if (fill_color < colors.length){
    curr_color = colors[indices[fill_color]];
    let temp = new Tetra(p1,p2,p3,p4,curr_color);
    tetras.push(temp);

    // select three of four points to choose plane for next tetra 
    let points = [temp.p1,temp.p2,temp.p3,temp.p4];
    let exclude = int(random(points.length));
    points.splice(exclude,1);

    p1 = points[0]; 
    p2 = points[1];
    p3 = points[2];
    p4 = 'NULL';

    if (tetras.length % 50 == 0) {
      fill_color++;
    }
  }


  for (let i = 0; i < tetras.length; i++){
    tetras[i].display();
  }

  


}


class Tetra {

  constructor(p1,p2,p3,p4,fill_color) {

    this.p1 = p1; 
    this.p2 = p2; 
    this.p3 = p3; 

    if ( p4 == 'NULL' ) {
      this.calc_p4();
    } else {
      this.p4 = p4; 
    }

    this.fill_color = fill_color;    

    
  }

  calc_p4() {

    // calculate normal vector of given three points
    let U_vec = [(this.p2.x - this.p1.x),(this.p2.y - this.p1.y),(this.p2.z - this.p1.z)];  // U = p2 - p1   
    let V_vec = [(this.p3.x - this.p1.x),(this.p3.y - this.p1.y),(this.p3.z - this.p1.z)];  // V = p3 - p1

    let nx = (U_vec[1]*V_vec[2]) - (U_vec[2]*V_vec[1]); // Normal.x to (multiply U.y by V.z) minus (multiply U.z by V.y)
    let ny = (U_vec[2]*V_vec[0]) - (U_vec[0]*V_vec[2]); // Normal.y to (multiply U.z by V.x) minus (multiply U.x by V.z)
    let nz = (U_vec[0]*V_vec[1]) - (U_vec[1]*V_vec[0]); // Normal.z to (multiply U.x by V.y) minus (multiply U.y by V.x)

    // normalize the vector
    let n_mag = this.magnitude(nx,ny,nz);
    let n = [(nx/n_mag), (ny/n_mag), (nz/n_mag)];

    // get height of tetra
    let sl =  this.magnitude(this.p2.x-this.p1.x, this.p2.y-this.p1.y, this.p2.z-this.p1.z);
    let h = (sqrt(6)/3) * sl; 

    let center = new Point((this.p1.x+this.p2.x+this.p3.x)/3,(this.p1.y+this.p2.y+this.p3.y)/3,(this.p1.z+this.p2.z+this.p3.z)/3);

    // get fourth point 
    let vec_add = [n[0]*h,n[1]*h,n[2]*h];
    this.p4 = new Point(-vec_add[0] + (center.x), ( -vec_add[1] + center.y ), (-vec_add[2] + center.z));  


  }

  magnitude(x,y,z) {

    return sqrt((x*x)+(y*y)+(z*z));

  }

  display() { 

    let x = 100; 
    let sl = 141.42; 

    push();

    strokeWeight(1);
    stroke('white');
    fill(color(this.fill_color)); 
    
    
    // draw faces individually based on four points
    beginShape(); 
    vertex(this.p1.x,this.p1.y,this.p1.z); 
    vertex(this.p2.x,this.p2.y,this.p2.z);
    vertex(this.p3.x,this.p3.y,this.p3.z);
    endShape(); 

    beginShape(); 
    vertex(this.p1.x,this.p1.y,this.p1.z); 
    vertex(this.p2.x,this.p2.y,this.p2.z);
    vertex(this.p4.x,this.p4.y,this.p4.z);
    endShape(); 

    beginShape(); 
    vertex(this.p1.x,this.p1.y,this.p1.z); 
    vertex(this.p4.x,this.p4.y,this.p4.z);
    vertex(this.p3.x,this.p3.y,this.p3.z);
    endShape();

    beginShape(); 
    vertex(this.p2.x,this.p2.y,this.p2.z); 
    vertex(this.p4.x,this.p4.y,this.p4.z);
    vertex(this.p3.x,this.p3.y,this.p3.z);
    endShape();

    pop();

  }


}


class Point {

  constructor(x,y,z) {

    this.x = x; 
    this.y = y; 
    this.z = z; 


  }


}
