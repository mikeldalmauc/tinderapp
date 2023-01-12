// El modelo incluye las condiciones del filtro junto con toda la lista de 
// de personas que hemos leído del fichero database.json, que no es sino un objeto JSON
// 
let model = {
    altura : 100,
    edad: 20,
    sexo: "hombre",
    database: []
};

function init(){
    
    // leemos los datos, hay que tener en cuenta que esta llamada, 
    // fetch, es asyncrona, eso quiere decir que la ejecución continua sin esperar respuesta
    // por lo que si llamaramos a la vista no veríamos nada ya que los datos no se habrían leído.
    // Por este motivo, la llamada a la vista está dentro de la función de abajo, esta función
    // se llama callback, y se va a ejecutar cuando la lectura haya terminado.
    fetch('database.json')
    .then((response) => response.json())
    .then((json) => {
        model.database = json.data
        view();
    });
}

function update(action){

    if(action == "sliderAltura")
        model.altura = document.getElementById("sliderAltura").value;

    if(action == "sliderEdad")
        model.edad = document.getElementById("sliderEdad").value;

    if(action == "hombre" || action == "mujer")
        model.sexo = action;


    view();
}

// La vista va a renderizarse a partir del modelo y SOLO del modelo 
function view(){

    document.getElementById("sliderAlturaValor").innerHTML = model.altura;
    document.getElementById("sliderEdadValor").innerHTML = model.edad;

    document.getElementById("cards").innerHTML = "";

    model.database.filter(persona => 
           persona.altura >= model.altura
        && persona.edad >= model.edad
        && persona.sexo === model.sexo
    ).forEach(persona => {
        document.getElementById("cards").append(viewCard(persona));
    });
}

function viewCard(persona){

    let card = document.createElement("div");
    card.className = "card";

    let title = document.createElement("h2");
    title.className= "card-title";
    title.innerText = persona.nombre;

    let image = document.createElement("img");
    image.src = persona.foto;
    image.alt = persona.nombre;

    let datosPersonales = document.createElement("p");
    datosPersonales.className = "card-data";
    
    datosPersonales.innerHTML = 
    "<b>Edad</b> :" + persona.edad + "<br />"
    +"<b>Sexo</b> :" + persona.sexo + "<br />"
    +"<b>Gustos</b> :" +persona.gustos+ "<br />"
    +"<b>Altura</b> :"+persona.altura+ "<br />";

    card.append(title);
    card.append(image);
    card.append(datosPersonales);


    return card;
}