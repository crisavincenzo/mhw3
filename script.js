const ID='d765bc347c7a4fe4a67645ad9efe3893';
const SECRET='761626cadc9d41219ff8f23511fb9a7f';
let token;

function onJsonQuote(json)
{
    console.log('JSON ricevuto');
    console.log(json);
    const risultato = document.querySelector('#risultato');
    risultato.innerHTML = '';
    
    for(let i=0;i<5;i++)
    {
        const doc=json[i];
        const title=doc.anime;
        const character=doc.character;
        const quote=doc.quote;

        const titolo=document.createElement('h3');
        titolo.textContent='Titolo: '+title;
        const personaggio= document.createElement('p');
        personaggio.textContent='Personaggio: '+character;
        personaggio.classList.add('grassetto');
        const frase=document.createElement('em');
        frase.textContent='\"'+quote+'\"';

        risultato.appendChild(titolo);
        risultato.appendChild(personaggio);
        risultato.appendChild(frase);
    }
    
}

function onJsonNews(json)
{
    const notizie = document.querySelector('.notizie');
    const blocco = notizie.querySelector('.blocco');
    //blocco.innerHTML = '';

    console.log(json);

    for(let i=0;i<10;i++)
    {
        const doc=json.results[i];
        const title=doc.title;
        const article=doc.description;
        const link=doc.link;

        const titolo=document.createElement('h3');
        titolo.textContent=title;
        const testo=document.createElement('p');
        testo.textContent=article;
        const l=document.createElement('a');
        l.textContent='Link notizia';
        l.href=link;

        blocco.appendChild(titolo);
        blocco.appendChild(testo);
        blocco.appendChild(l);
    }
    
}


function onResponse(response) 
{
    return response.json();
}

function searchByTitle(event)
{
  event.preventDefault();
  const input = event.currentTarget.querySelector('#testo');
  const value = encodeURIComponent(input.value);
  
  url = 'https://animechan.vercel.app/api/quotes/anime?title=' + value;
  
  fetch(url).then(onResponse).then(onJsonQuote);
}

function searchByCharacter(event)
{
  event.preventDefault();
  const input = event.currentTarget.querySelector('#testo');
  const value = encodeURIComponent(input.value);
  
  url = 'https://animechan.vercel.app/api/quotes/character?name=' + value;
  
  fetch(url).then(onResponse).then(onJsonQuote);
}

const form_title = document.querySelector('#title');
form_title.addEventListener('submit', searchByTitle);

const form_character= document.querySelector('#character');
form_character.addEventListener('submit', searchByCharacter);

fetch('https://newsdata.io/api/1/news?apikey=pub_2045097d87deb3f576b96fcb6a60b0b5788ab&q=film&language=it')
.then(onResponse).then(onJsonNews);

function onJsonMusic(json)
{
    const aside=document.querySelector('#view');
    console.log(json);
    aside.innerHTML='';

    for(let i=0;i<4;i++)
    {
        const doc=json.tracks.items[i];
        const name=doc.name;
        const link_img=doc.album.images[0].url;
        const artist=doc.artists[0].name;
        const link=doc.external_urls.spotify;

        const container=document.createElement('div');
        container.classList.add('container');

        const nome=document.createElement('p');
        nome.textContent=name;
        nome.classList.add('grassetto');

        const artista=document.createElement('p');
        artista.textContent='artista: '+artist;

        const img=document.createElement('img');
        img.src=link_img;

        const spotify=document.createElement('img');
        spotify.src="spotify.jpeg";
        spotify.classList.add('logo');
        const rif=document.createElement('a');
        rif.href=link;
        rif.appendChild(spotify);
        
        container.appendChild(nome);
        container.appendChild(img);
        container.appendChild(artista);
        container.appendChild(rif);
        aside.appendChild(container);
    }
    
}

function searchMusic(event)
{
  event.preventDefault();
  const input = document.querySelector('aside #testo');
  const value = encodeURIComponent(input.value);

  fetch("https://api.spotify.com/v1/search?type=track&q=" + value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJsonMusic);
}

function hideAside(event)
{
  const button = event.currentTarget;

  const aside=document.querySelector('aside');
  aside.classList.add('hidden');

  button.removeEventListener('click',hideAside);
  button.addEventListener('click',showAside);

}

function showAside(event)
{
  const button = event.currentTarget;

  const aside=document.querySelector('aside');
  aside.classList.remove('hidden');

  button.removeEventListener('click',showAside);
  button.addEventListener('click',hideAside);
}

const form_music=document.querySelector('#music_title');
form_music.addEventListener('submit',searchMusic);

const button=document.querySelector('button');
button.addEventListener('click',showAside);

function onTokenJson(json)
{
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(ID + ':' + SECRET)
   }
  }
).then(onTokenResponse).then(onTokenJson);
