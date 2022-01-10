const alice_dots = ( d ) => {

  let male_freqs = [];
  let female_freqs = [];

  let male_ratio = [];
  let female_ratio = [];

  let male_pts = [];
  let female_pts = [];

  let tot_dots = 10000;
  let pts_combined = [];

  d.preload = function(){

    d.loadStrings('assets/alice_in_wonderland_female_analysis.txt',d.setFemaleFreqs);
    d.loadStrings('assets/alice_in_wonderland_male_analysis.txt',d.setMaleFreqs);

  }

  d.setFemaleFreqs = function(input) {

    for (let i = 0; i < input.length; i++){
      female_freqs.push(d.float(input[i]));
    }


  }

  d.setMaleFreqs = function(input) {

    for (let i = 0; i < input.length; i++){
      male_freqs.push(d.float(input[i]));
    }

  }

  d.gen_ratio = function(){

    for (let i = 0; i < male_freqs.length; i++){
      male_ratio.push(male_freqs[i]/female_freqs[i]);
      female_ratio.push(female_freqs[i]/male_freqs[i]);
    }


  }

  d.setup = function(){

    let can = d.createCanvas(d.windowWidth*0.5,d.windowHeight*0.6);
    d.background('white');

    x_margin = d.width / 9;
    rect_width = d.width / 3;
    y_margin = d.height / 10;
    rect_height = y_margin * 2;

    d.gen_ratio();

  };

  d.draw_pts = function(x_low, y_low, x_high, y_high, ratio ) {

    let num_dots = d.int(ratio * tot_dots);
    let i = 0;

    while (i < num_dots){

      pts_combined.push(d.createVector(d.random(x_low,x_high),d.random(y_low,y_high)));
      i++;

    }

  }




  d.draw = function(){

    d.noLoop();

    // d.rect(x_margin,y_margin,rect_width,rect_height);
    d.draw_pts(x_margin, y_margin, x_margin+rect_width, y_margin+rect_height, male_ratio[0]);
    // d.rect(x_margin*5,y_margin,rect_width,rect_height);
    d.draw_pts(x_margin*5, y_margin, (x_margin*5)+rect_width, y_margin+rect_height, female_ratio[0]);

    //
    // d.rect(x_margin,y_margin*4,rect_width,rect_height);
    d.draw_pts(x_margin, y_margin*4, x_margin+rect_width, (y_margin*4)+rect_height, male_ratio[1]);
    // d.rect(x_margin*5,y_margin*4,rect_width,rect_height);
    d.draw_pts(x_margin*5, y_margin*4, (x_margin*5)+rect_width, (y_margin*4)+rect_height, female_ratio[1]);

    //
    // d.rect(x_margin,y_margin*7,rect_width,rect_height);
    d.draw_pts(x_margin, y_margin*7, x_margin+rect_width, (y_margin*7)+rect_height, male_ratio[2]);
    // d.rect(x_margin*5,y_margin*7,rect_width,rect_height);
    d.draw_pts(x_margin*5, y_margin*7, (x_margin*5)+rect_width, (y_margin*7)+rect_height, female_ratio[2]);

    d.strokeWeight(1.5);
    for (let i = 0; i < pts_combined.length; i++){
      d.point(pts_combined[i].x, pts_combined[i].y);
    }



  }

}

let myp5_2 = new p5(alice_dots, 'alice');
