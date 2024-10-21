//Claves de acceso a la api
pubkey='59c4b7ce3fec09b937eb5abbf876cd32';
pvtkey='fc83383207d1cd3e9b105aeebfbacfe7fd7c47aa';


//Obtiene la fecha actual
let ts = Date.now();

let hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString();

//Cadena de consulta a la api
let call = `ts=${ts}&apikey=${pubkey}&hash=${hash}`;

//EndPoint de la api
let endpoint = `https://gateway.marvel.com/v1/public/characters?${call}`;
let comics = `https://gateway.marvel.com/v1/public/comics?${call}`;
//Usando fetch
//Realiza la solicitud a la api
fetch(endpoint)
  .then((response) => {
    //Si se cumple
    if (response.ok) {
      return response.json(); //Se convierte la respuesta en un json
    } else {
      throw new Error("Error, la respuesta no es verdadera "); //Si la respuesta no es buena, nos devuelve un error
    }
  })
  .then((respuesta) => {
    //Obtenemos un array de personajes
    let personajes = respuesta.data.results;

    //Iteramos sobre el array
    for (let i = 0; i < personajes.length; i++) {
      //Obtenemos el personaje actual
      let personaje = personajes[i];

      //Obtenemos la card donde iremos añadiendo los personajes
      let card = document.querySelector(".card");

      //Creamos un elemento img
      let img = document.createElement("img");
      //Le asignamos una clase
      img.classList = "card-img-top";
      //Asociamos el valor del src de la img
      img.src = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;

      //Creamos un elemento parrafo
      let p = document.createElement("p");
      //Añadimos una clase
      p.classList = ".card-text";
      //Almacenamos el contenido del nombre del personaje
      p.textContent = personaje.name;

      //Se añaden como nodos hijos a la card
      card.appendChild(img);
      card.appendChild(p);
    }
  })
  //Manejar el error
  .catch((error) => {
    console.log(error);
  });

async function getAllCharacter() {
  let respuesta = await fetch(comics);

  if (!respuesta.ok) {
    console.log("Error al obtener la respuesta");
  }

  let respuestaJson = await respuesta.json();

  let personajes = respuestaJson.data.results;

  //Iteramos sobre el array
  for (let i = 0; i < personajes.length; i++) {
    //Obtenemos el personaje actual
    let personaje = personajes[i];

    //Obtenemos la card donde iremos añadiendo los personajes
    let card = document.querySelector(".card");

    //Creamos un elemento img
    let img = document.createElement("img");
    //Se le asigna una clase
    img.classList = "card-img-top";
    //Se le asocia el valor del src de la img
    img.src = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;

    //Se crea un elemento parrafo
    let p = document.createElement("p");
    //Se le añade una clase
    p.classList = ".card-text";
    //Almacena el contenido del nombre del personaje
    p.textContent = personaje.name;

    //Se añaden como nodos hijos a la card
    card.appendChild(img);
    card.appendChild(p);
  }
}

getAllCharacter();