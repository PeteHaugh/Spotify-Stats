import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import styled from "styled-components";

const Turntable = () => {
  let a = 0;
  let b = 0;
  let canvas;
  let Angle;
  let AngleOld = 0;
  let record;
  let rotation = 0;
  let tonearm;
  let toneAngle = 0;
  let sliderKnob;
  let bx;
  let by;
  let overBox = false;
  let locked = false;
  let xOffset = 0.0;
  let boxWidth = 30;
  let boxHeight = 50;
  let range = 100;
  let size = 1;

  const preload = (p5) => {
    record = p5.loadImage(require("../assets/images/turntable.png"));
    tonearm = p5.loadImage(require("../assets/images/tonearm.png"));
    sliderKnob = p5.loadImage(require("../assets/images/slider.png"));
  };

  const setup = (p5) => {
    if (p5.windowWidth < 1024) {
      size = 0.5;
    } else if (p5.windowWidth < 1536) {
      size = 0.7;
    } else {
      size = 1;
    }

    canvas = p5
      .createCanvas(700 * size, 880 * size, "relative")
      .parent("canvasParent");
    p5.pixelDensity(1);
    p5.angleMode(p5.DEGREES);

    p5.rectMode(p5.CENTER);
    p5.frameRate(120);

    bx = 480 * size;
    by = 23 * size;
  };

  const draw = (p5) => {
    if (p5.windowWidth < 1024) {
      size = 0.5;
    } else if (p5.windowWidth < 1536) {
      size = 0.7;
    } else {
      size = 1;
    }
    p5.clear();
    p5.push();
    range = p5.constrain(bx, 380 * size, 580 * size);
    let val = (range / 480) * size;

    let d = p5.dist(p5.mouseX, p5.mouseY, 350, 440);

    if (d < 650 / 2) {
      b = p5.atan2(p5.mouseY - p5.height / 2, p5.mouseX - p5.width / 2);
      p5.cursor("grab");
    } else if (rotation === 1) {
      a += 3;
      p5.cursor("arrow");
    } else {
      p5.cursor("arrow");
    }

    Angle = a + b;

    p5.translate(p5.width / 2, 500 * size);
    p5.rotate(a * val + b);
    p5.image(record, -325 * size, -325 * size, 650 * size, 650 * size);
    p5.pop();

    AngleOld = Angle;

    p5.push();
    if (rotation === 1) {
      if (toneAngle < 20) {
        toneAngle += 2;
      }
    } else {
      if (toneAngle > 0) {
        toneAngle -= 2;
      }
    }
    p5.translate(170 * size, 120 * size);
    p5.rotate(toneAngle);
    p5.image(tonearm, -95 * size, -95 * size, 595 * size, 190 * size);

    p5.pop();

    p5.push();

    if (
      p5.mouseX > bx - boxWidth * size &&
      p5.mouseX < bx + boxWidth * size &&
      p5.mouseY > by - boxHeight * size &&
      p5.mouseY < by + boxHeight * size
    ) {
      overBox = true;
    } else {
      overBox = false;
    }

    p5.translate(range, 23 * size);

    p5.image(sliderKnob, 0, 0, 30 * size, 50 * size);
    p5.pop();

    p5.push();
    p5.noStroke();
    p5.fill(211, 216, 215);
    p5.rect(70 * size, 810 * size, 100 * size, 100 * size, 5 * size);

    p5.pop();
  };

  function mousePressed(p5) {
    if (overBox) {
      locked = true;
    } else {
      locked = false;
    }
    xOffset = p5.mouseX - bx;
    let f = p5.dist(p5.mouseX, p5.mouseY, 75 * size, 805 * size);
    if (f < 50 * size) {
      pause();
    }
  }

  function mouseDragged(p5) {
    if (locked) {
      bx = p5.mouseX - xOffset * size;
    }
  }

  function mouseReleased() {
    locked = false;
  }

  function pause() {
    if (rotation === 1) {
      rotation = 0;
    } else {
      rotation = 1;
    }
  }

  function windowResized(p5) {
    if (p5.windowWidth < 1024) {
      size = 0.5;
      xOffset = 0.0;
    } else if (p5.windowWidth < 1536) {
      size = 0.7;
      xOffset = 0.0;
    } else {
      size = 1;
    }
    p5.resizeCanvas(700 * size, 880 * size, true);
    bx = 480 * size;
    by = 23 * size;
  }

  return (
    <>
      <StyledTurntable id="canvasParent">
        <Sketch
          preload={preload}
          setup={setup}
          draw={draw}
          mousePressed={mousePressed}
          mouseDragged={mouseDragged}
          mouseReleased={mouseReleased}
          windowResized={windowResized}
        />
        <StyledImg src={require("../assets/images/body.webp")} />
        <StyledShadow src={require("../assets/images/TurntableShade.webp")} />
      </StyledTurntable>
    </>
  );
};

export default Turntable;

const StyledShadow = styled.img`
  width: 100%;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: -2;
`;
const StyledImg = styled.img`
  width: 100%;
  position: absolute;
  z-index: -1;
`;

const StyledTurntable = styled.div`
  padding: 0;
  margin: 0;
  width: 700px;
  height: 880px;
  position: relative;

  @media screen and (max-width: 1536px) {
    width: calc(700px * 0.7);
    height: calc(880px * 0.7);
  }

  @media screen and (max-width: 1024px) {
    width: calc(700px * 0.5);
    height: calc(880px * 0.5);
  }
`;
