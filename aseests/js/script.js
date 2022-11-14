let actorsList=[];
async function loadActorsProfiles() {
    // get actors 
    let actors = await getActors();  
    let html = "";
    actors.forEach(function(actor, key) { 
      // only show 4 actors data 
      if(key>3)
      {
        return;
      }
      actorsList[key]=actor;
      html+=actorTemplate(actor,key);
    });
    console.log(actorsList);
    document.getElementById("actors-container").innerHTML = html;
  }
async function getActors() {  
  const ACTORSURL='https://swapi.dev/api/people';
  try {
      let res = await fetch(ACTORSURL);      
      if (!res.ok) {
        throw new Error("NETWORK RESPONSE ERROR");
      } 
      const actors = await res.json(); 
      return actors.results;
      
  } catch (error) {
      console.log(error);
  }
}

async function getFilms(url) {  
  try {
    
      let res = await fetch(url);      
      if (!res.ok) { 
        throw new Error("NETWORK RESPONSE ERROR");
      } 
      const film= await res.json();   
      return film;
      
  } catch (error) {
      console.log(error);
  }
}

function actorTemplate(data,key)
{
  let myId="actor"+key+"-films";
   
  loadActorFilms(data.films,myId);
  let html=`
  <div class="row actor-div">
  <div class="col-3">
    <div class="card">
      <div class="text-center p-2">
        <img src="aseests/images/actor.png" width="150"  class="rounded" alt="actor profile image">
      </div>                  
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="myp">Skin : ${data.skin_color} </p>
        <p class="myp">Height : ${data.height} </p>
        <p class="myp">Birth Year : ${data.birth_year} </p>         
      </div>
    </div>
  </div>
   <div class="col-9">
    <div class="row" id="${myId}"></div>             
    </div>                         
  </div>`;
  return html;
}
async function loadActorFilms(filmsUrl,myId)
{
  let filmInTemplate=""; 
 

  // only load 3 movies 
  let film1=await getFilms(filmsUrl[0]); 
  let film2=await getFilms(filmsUrl[1]); 
  let film3=await getFilms(filmsUrl[2]); 
  filmInTemplate+=filmTemplate(film1);
  filmInTemplate+=filmTemplate(film2);
  filmInTemplate+=filmTemplate(film3);
  document.getElementById(myId).innerHTML = filmInTemplate; 

}
function filmTemplate(film)
{ 
  let filmHtml=`
  <div class="col-4">
  <div class="card" >
    <div class="text-center p-2">
      <img src="aseests/images/film.jpg" width="180"  class="rounded" alt="film">
    </div>                  
    <div class="card-body">
      <h5 class="card-title">${film.title}</h5>      
      <button class="btn btn-primary" onclick="showFilmDetails()">View details</button>
    </div>
  </div> 
</div>`
return filmHtml;
}
async function showFilmDetails()
{ 
  let film=await getFilms('https://swapi.dev/api/films/2/');
  $('#modal').modal('show');
  document.getElementById('modal-content').innerHTML = modelTemplate(film); 

} 
 
function modelTemplate(film)
{
   
  let modelHTML=
  `<div class="modal-content" >
  <div class="modal-header">
    <h5 class="modal-title">${film.title}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
  <div class="row">
    <div class="col-3">
    <div class="text-center p-2">
        <img src="aseests/images/film.jpg" width="150"  class="rounded" alt="film">
      </div>  
    </div>
    <div class="col-9">
    <p>${film.opening_crawl}</p>
    </div>
  </div>
    
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    
  </div>
</div>`;
return modelHTML;

}
  