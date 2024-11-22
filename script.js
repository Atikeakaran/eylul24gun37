const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const treeImg = new Image();
treeImg.src = "tree.png";
const dinoImg = new Image();
dinoImg.src = "dino.png";
//dinoX, dinoY, dinoWidth, dinoHeight
let dw = 29, dh = 32;
let dx = 0, dy = canvas.height / 2 - dh;
let basladi = false;
let mjh = dh * 2; // max jump height
let jh = 0; //yerde oturuyor
let jd = 0; //jump direction(zıplama yönü)
//jd = 0: duruyor     +1: yukarı      -1: aşağı
let js = 2; // jump speed ( atlama hızı katsayısı)

//agaçların uzaklıkları (x koordinatında)
let trees = [];
let tw = 17; // agacın genişliği
let th = 32; // agacin yüksekliği
let ty = canvas.height / 2 - th;
let sjs = 1; //slow jump speed (yükseklerdeki atlama hızı kat sayısı )

function zeminCiz() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.clientWidth, canvas.height / 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#535353";
    ctx.stroke();
}
//zeminCiz();

function ciz() {
    cizimiTemizle();
    zeminCiz();
    ziplamayiYonet();
    dinoCiz();
    agaclariCiz();
    sahneyiKaydir();
    requestAnimationFrame(ciz);
}

function dinoCiz() {
    ctx.drawImage(dinoImg, dx, dy - jh, dw, dh);
}

dinoImg.onload = function () {
    baslat();
}

function baslat() {
    basladi = true;
    loadTrees();
    //setInterval(ciz,10);
    requestAnimationFrame(ciz); //uygun olduğunda çiz
}

function cizimiTemizle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.onclick = function () {
    if (jd == 0) jd = +1;
}

function ziplamayiYonet() {
    if (jd == 0) return;

    if (jh < mjh * .8) //dino max yüksekliğin 5te 4 ün üstündeyse yavaş ilerlet
        jh += jd * js; // yerden yüksekliğini arrtır
    else
        jh += jd;

    if (jd > 0 && jh >= mjh) { //yukarı zıplıyorsa ve mac yük. ulaştıysa
        jd = -1; //düşmeye başla
    }
    if (jd < 0 && jh <= 0) { // aşağı düşüyor ve yere çarptıysa
        jd = 0; // zıplama bitti
    }
}

function loadTrees() {
    //ilk ağaç canvas bitiminde
    trees.push(canvas.width);

    /*   for (let i = 0; i < 1000; i++) {
          let otesi = rastgele(Math.floor(canvas.width / 3), canvas.width);
          let sonAgacUzakligi= trees[trees.length - 1];
          let yeniAgacUzakligi = sonAgacUzakligi + otesi
          trees.push(yeniAgacUzakligi) ;
      } */

    for (let i = 0; i < 1000; i++) {
        let otesi = rastgele(Math.floor(canvas.width / 3), canvas.width);
        trees.push(trees[trees.length - 1] + otesi);
    }
}

function rastgele(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function agacCiz(x) {
    ctx.drawImage(treeImg, x, ty, tw, th);
}

function agaclariCiz() {
    // sadece canvasın bölgesine denk gelen ağaçları çiz
    const cizilecekler = trees.filter(x => x > -tw && x < canvas.width);

    for (const x of cizilecekler)
        agacCiz(x);
}
function sahneyiKaydir() {
    // tüm ağaçları 1 birim sola kaydır
    trees = trees.map(x => x - 1);
}