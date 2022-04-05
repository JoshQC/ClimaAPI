const key = "b29a6fef7b586c354d7b7d687e36a1a2";
const ciudades = ["Heredia", "Cartago", "Puntarenas", "Guanacaste", "Lima"];
const contenedor = document.querySelector("#contenedor");

const obtenerDatos = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);
  crearDivClima(data);
};

const crearDivClima = ({ name, coord, main, weather, wind }) => {
  const { description, icon } = weather[0];

  let html = `
  <div class="contenedor-clima">
    <h2 class="ciudad">${name}</h2>
    <h3>Coordenadas</h3>
    <ul class="coordenadas">
        <li>Latitud: ${coord.lat}</li>
        <li>Longitud: ${coord.lon}</li>
    </ul>
    <h3>Sensacion: <span class="contenido-categoria-clima">${main.feels_like}</span></h3>
    <h3>Humedad: <span class="contenido-categoria-clima">${main.humidity}</span></h3>
    <h3>Temperatura: <span class="contenido-categoria-clima">${main.temp_max} max, ${main.temp_min} min</span></h3>
    <h3>Tipo de Clima: <span class="contenido-categoria-clima">${description}</span></h3>
    <h3>Velocidad del viento: <span class="contenido-categoria-clima">${wind.speed} km</span></h3>
    <div class="contenedor-imagen-clima">
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Imagen de ${description}">
    </div>
  </div>
  `;

  contenedor.innerHTML += html;
};

const llamarCiudades = () => {
  ciudades.map((ciudad) => {
    let endPoint = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&lang=es`;
    obtenerDatos(endPoint);
  });
};

llamarCiudades();
