//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro/2;

//velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150
let raqueteComprimento= 10;
let raqueteAltura= 90;

//variaveis do oponente
let xRaqueteOponente= 585;
let yRaqueteOponente= 150;
let velocidadeYOponente

let colidiu = false;

//placar do jogo
let meusPontos=0;
let pontosOponente=0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  

}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);  
}


function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}


function verificaColisaoBorda() {
    if(xBolinha + raio > width ||     xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
  }
  
  if(yBolinha + raio > height ||     yBolinha - raio <0) {
    velocidadeyBolinha *= -1;
  } 
} 
   
function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -=10
  }
   if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10
}
  
// Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
   yRaquete = constrain(yRaquete, 10, 310);
}


function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){ 
  velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y){
  colidiu=
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function mostraRaqueteOponente(){  rect(xRaqueteOponente,yRaqueteOponente,raqueteComprimento,raqueteAltura);
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento/2 -30
  yRaqueteOponente += velocidadeYOponente
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
  calculaChancedeErrar();
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10,40,20)
  fill(275);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450,10,40,20)
  fill(275);
  text(pontosOponente, 470,26)
}

function marcaPonto(){
  if (xBolinha>590){meusPontos +=1;
      ponto.play();
    }
 if(xBolinha<10){pontosOponente +=1;  
      ponto.play();
 }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}

