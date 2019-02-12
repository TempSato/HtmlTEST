const analogClockCanvas = document.getElementById("analogClock");
let content = analogClockCanvas.getContext("2d");
let paintRadius = analogClockCanvas.height / 2;
// canvasのtranslate関数を利用して、時計の描画位置を調整
content.translate(paintRadius, paintRadius);

// paintRadiusは時計の描画する領域を指定
// 「paintRadius = paintRadius * 0.80;」の処理を取り除くと、時計の描画が、枠の外にはみ出す
paintRadius = paintRadius * 0.80;

let ang;
let num;
content.font = paintRadius * 0.15 + "px arial";
content.textBaseline = "middle";
content.textAlign = "center";

//時計を描画
DrawClock();

function DrawClock() {
  //1秒ごとに、描画を行う処理の作成
  setTimeout(DrawClock, 1000);
  drawFace(content, paintRadius);
  drawNumbers(content, paintRadius);
  drawTime(content, paintRadius);
}

function drawFace(content, paintRadius) {
  //時計の描画
  content.beginPath();
  content.arc(0, 0, paintRadius, 0, 2 * Math.PI);
  content.fillStyle = 'white';
  content.fill();

  let grad;
  grad = content.createRadialGradient(0, 0,paintRadius * 0.95, 0, 0, paintRadius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'blue');
  grad.addColorStop(1, '#333');
  content.strokeStyle = grad;
  content.lineWidth = paintRadius * 0.1;
  content.stroke();
  content.beginPath();

  //秒針の長さを設定
  content.arc(0, 0, paintRadius * 0.1, 0, 2 * Math.PI);
  content.fillStyle = '#333';
  content.fill();
}

function drawNumbers(content, paintRadius){
  for(num = 1; num < 13; num++)
  {
    ang = num * Math.PI / 6;
    content.rotate(ang);
    content.translate(0, -paintRadius * 0.85);
    content.rotate(-ang);
    content.fillText(num.toString(), 0, 0);
    content.rotate(ang);
    content.translate(0, paintRadius * 0.85);
    content.rotate(-ang);
  }
}

function drawTime(content, paintRadius){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    //時間の設定
    hour = hour % 12;
    hour = (hour * Math.PI / 6)+ (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(content, hour, paintRadius*0.5, paintRadius*0.07);

    //分の設定
    minute = (minute * Math.PI / 30)+(second * Math.PI / (30 * 60));
    drawHand(content, minute, paintRadius*0.8, paintRadius * 0.07);

    // 秒の設定
    second=(second * Math.PI / 30);
    drawHand(content, second, paintRadius * 0.5, paintRadius * 0.01);
}

function drawHand(content, pos, length, width) {
    content.beginPath();
    content.lineWidth = width;
    content.lineCap = "round";
    content.moveTo(0,0);
    content.rotate(pos);
    content.lineTo(0, -length);
    content.stroke();
    content.rotate(-pos);
}
