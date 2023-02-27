import React, { useState, useEffect, useRef } from "react";

//Creando los componentes.
const Home = () => {
  const songURL = "https://assets.breatheco.de/apis/sound/songs"; // Contiene la URL de la API que proporciona la lista de canciones.
  const [listadesonidos, setListadecanciones] = useState([]); // Se almacenan la lista de canciones.
  const [lugar, setlugar] = useState(0); // Representa la posición actual en la lista de canciones.
  const [urlreproductor, seturlreproductor] = useState(null); // URL que representa la canción actual que se está reproduciendo.
  const [reproduciendo, setreproduciendo] = useState(false); // Indica si se está reproduciendo o no una canción.
  const escuchar = useRef(null); // Se utiliza para acceder al elemento de audio en la página.

  //La función "useEffect" se usa para realizar una tarea una vez que la página se ha cargado correctamente.
  useEffect(() => {
    console.log("La pagina se a cargado victoriosamente");
    fetch(songURL) //La función "fetch" permite obtener datos de una URL especificada.
      .then((response) => response.json()) // Esta línea convierte la respuesta de "fetch" en formato JSON.
      .then((data) => setListadecanciones(data)); // Esta línea actualiza el estado de la lista de canciones con los datos obtenidos por "fetch".
  }, []);
  console.log(listadesonidos);

  function playescuchar(url, index) {
    escuchar.current.src = "https://assets.breatheco.de/apis/sound/" + url; // Esta línea establece la propiedad "src" del objeto "escuchar.current" en una URL y el valor de "url".
    escuchar.current.play(); // Se reproduce el archivo de audio especificado en la propiedad "src".
    lugar(index);
  }
  const play = (index) => {
    seturlreproductor(index);
    setreproduciendo(true);
    escuchar.current.play(); // Se reproduce el archivo de audio especificado en la propiedad "src".
  };
  const pause = () => {
    setreproduciendo(false);
    escuchar.current.pause(); // Detiene la reproducción del archivo de audio.
  };

  //La función "back" se utiliza para reproducir el archivo de audio anterior en una lista de archivos de audio.
  const back = () => {
    setlugar(lugar - 1); //Esta línea invoca una función llamada "setlugar" con el argumento "lugar - 1", lo que actualiza la posición actual en la lista de archivos de audio para ir al archivo anterior en la lista.
    escuchar.current.src = `https://assets.breatheco.de/apis/sound/${listadesonidos[lugar].url}`;
    escuchar.current.play(); //reproduce el archivo anterior en la lista de archivos de audio.
  };

  // La función "next" se utiliza para reproducir el siguiente archivo de audio en una lista.
  const next = () => {
    setlugar(lugar + 1); // Se actualiza la posición actual en la lista de archivos de audio.
    escuchar.current.src = `https://assets.breatheco.de/apis/sound/${listadesonidos[lugar].url}`;
    escuchar.current.play(); //Reproduce el siguiente archivo de audio en la lista.
  };
  return (
    <>
      <div
        className="container w-50 bg-dark fw-bolder text-white "
        id="spotify"
      >
        Música De Juegos
        <img
          src="https://i0.wp.com/www.gamerfocus.co/wp-content/uploads/2017/09/Mario-Switch.gif?resize=400%2C240&ssl=1"
          width="50"
          height="50"
        ></img>
      </div>

      <div className="container w-50 bg-danger">
        {/* La clase "list-group" se usa para hacer que la lista se muestre en forma de grupo. */}
        {/* La clase "list-group-numbered" se usa  para numerar cada elemento de la lista. */}
        <ol className="list-group list-group-numbered ">
          {/* Se utiliza la función de "map" para iterar sobre los elementos de "listadesonidos" y crear un botón para cada elemento */}
          {listadesonidos.map((item, index) => (
            <button
              className="btn btn-light text-start p-1"
              // La función "playescuchar" se ejecuta cada vez que se hace clic en un botón y toma dos argumentos, la URL de la canción "item.url" y el índice del elemento en la matriz "index". Esta función se utiliza para cargar la canción correspondiente en un reproductor de audio que se encuentra debajo de la lista de canciones.
              onClick={() => playescuchar(item.url, index)}
            >
              <li
                className="list-group-item bg-success bg-gradient text-white "
                // El atributo aria-current se establece en true para indicar que el elemento de la lista está actualmente seleccionado.
                aria-current="true"
                // El atributo key se establece en item.id para proporcionar una clave única para cada elemento de la lista.
                key={item.id}
              >
                {item.name}
              </li>
            </button>
          ))}
        </ol>
        <div className="">
          {/* La propiedad ref se utiliza para hacer referencia al elemento de audio en el DOM. En este caso, la constante escuchar es un objeto de referencia que apunta al elemento de audio. */}
          <audio ref={escuchar} className="">
            {/* Este contenido se utiliza para proporcionar un contenido de respaldo en caso de que el navegador no pueda reproducir el audio. */}{" "}
          </audio>
          <div className="d-flex justify-content-center">
            {/* La función "back" se utiliza para retroceder a la canción anterior, la función "play" se utiliza para iniciar la reproducción de la canción actual, la función "pause" se utiliza para pausar la reproducción de la canción actual y la función "next" se utiliza para avanzar a la siguiente canción. */}
            <button
              onClick={back}
              type="button"
              className="btn btn-dark rounded-circle "
              style={{ height: 50, width: 50 }}
            >
              {" "}
              <i class="fa fa-backward"></i>
            </button>
            <button
              onClick={play}
              type="button"
              className="btn btn-dark rounded-circle"
              style={{ height: 50, width: 50 }}
            >
              {" "}
              <i class="fa fa-play"></i>
            </button>
            <button
              onClick={pause}
              type="button"
              className="btn btn-dark rounded-circle"
              style={{ height: 50, width: 50 }}
            >
              {" "}
              <i class="fa fa-pause"></i>
            </button>
            <button
              onClick={next}
              type="button"
              className="btn btn-dark rounded-circle"
              style={{ height: 50, width: 50 }}
            >
              {" "}
              <i class="fa fa-forward"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
