let musicas = [
  {titulo:'Guitar solo', artista:'Jimmy Page', src:'audio/We Ride! - Reed Mathis.mp3', img:'images/rock.jpg'},
  {titulo:'Samba raiz', artista:'Zeca', src:'audio/projeto_spotify_parte_1_musicas_Ella Vater - The Mini Vandals.mp3', img:'images/samba.jpg'},
  {titulo:'Piano solo', artista:'Frédéric Chopin', src:'audio/A Brand New Start - TrackTribe (1).mp3', img:'images/piano.jpg'}
];


let music = document.querySelector('audio');
let indexMusica = 0;
let duracaoMusica = document.querySelector('.fim');
let image = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArt = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// EVENTOS
document.querySelector('.botao-play').addEventListener('click', tocarMusica);
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
// essas duas linhas de codigos, puxam a classe do html e adiciona um evento a elas!

music.addEventListener('timeupdate', atualizarBarra);
// nesse evento enquanto a musica estiver tocando, a barra de musica ande conforme o audio

document.querySelector('.anterior').addEventListener('click', () => {
  indexMusica--;
  if (indexMusica < 0 ){
    indexMusica = 2;
  }
  renderizarMusica(indexMusica);
});
// função anonima

document.querySelector('.proxima').addEventListener('click', () => {
  indexMusica++;
  if (indexMusica > 2){
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
});


// FUNÇÕES
function renderizarMusica(index){
  music.setAttribute('src', musicas[index].src);
  music.addEventListener('loadeddata', () => {
    nomeMusica.textContent = musicas[index].titulo;
    nomeArt.textContent = musicas[index].artista;
    image.src = musicas[index].img;
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(music.duration));
  });
}

function tocarMusica(){
  // essa função inicia a musica
  music.play();
  // pega a variavel music e chama o metodo play
  document.querySelector('.botao-pause').style.display = 'block';
  // vai aparecer o botao pause que esta escondido, atraves da classe .botao-pause do css!!
  document.querySelector('.botao-play').style.display = 'none';
  // invertemos os botoes, oq estava visivel passou a ficar oculto, mexendo no proprio estilo
}

function pausarMusica(){
  // essa funçao realiza a pausa da musica
  music.pause();
  // pega a variavel music e chama o metodo pause
  document.querySelector('.botao-pause').style.display = 'none';
  document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
  let barra = document.querySelector('progress');
  barra.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
  let tempoDecorrido = document.querySelector('.inicio');
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(music.currentTime));
}

function segundosParaMinutos(segundos){
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10){
    campoSegundos = '0' + campoSegundos;
  }

  return campoMinutos + ':' + campoSegundos;
}