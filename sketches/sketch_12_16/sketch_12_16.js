const colorGradient0 = ( c ) => {

  let colors = [c.color('#fe0202'), c.color('#ff001d'), c.color('#ff002f'), c.color('#ff0040'), c.color('#ff0050'), c.color('#ff0061'), c.color('#ff0072'), c.color('#f80084'), c.color('#ee0097'), c.color('#df00aa'), c.color('#cd00bc'), c.color('#b600ce'), c.color('#9800e0'), c.color('#6e00f0'), c.color('#041ffe')];
  let curr_x = 0;
  let rect_width;

  c.setup = function(){

    let can = c.createCanvas(c.windowWidth/2,c.windowWidth/4);

    rect_width = c.width / colors.length;



  };

  c.draw = function(){

    c.noLoop();

    for(let i = 0; i < colors.length; i++){
      c.fill(colors[i]);
      c.stroke(colors[i]);
      //c.stroke('white');
      c.rect(i*rect_width,0,rect_width,c.height);

    }


  };

};


const colorGradient1 = ( c ) => {

  let colors = [c.color('#fefd02'), c.color('#ffe600'), c.color('#ffcc00'), c.color('#ffb000'), c.color('#ff9200'), c.color('#ff6e21'), c.color('#ff3f3e'), c.color('#ff0056'), c.color('#ff006f'), c.color('#ff0089'), c.color('#ff00a3'), c.color('#f600bd'), c.color('#cd00d6'), c.color('#9300ec'), c.color('#041ffe')];
  let curr_x = 0;
  let rect_width;

  c.setup = function(){

    let can = c.createCanvas(c.windowWidth/2,c.windowWidth/4);

    rect_width = c.width / colors.length;



  };

  c.draw = function(){

    c.noLoop();

    for(let i = 0; i < colors.length; i++){
      c.fill(colors[i]);
      c.stroke(colors[i]);
      //c.stroke('white');
      c.rect(i*rect_width,0,rect_width,c.height);

    }


  };






};


let colorGradientP50 = new p5(colorGradient0, 'sketch_12_16_0');
let colorGradientP51 = new p5(colorGradient1, 'sketch_12_16_1');
