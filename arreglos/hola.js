var palabra = "aoertpser";
var elemento1 = [1,2,3,4,5,6,78,9,70];
// -- 
var contenedorPalabra = [];
var elemento2 = [10,5,4,8,7,8,10,2,1];

var contrario = elemento1.length- 1;

for(var i = 0; i < elemento1.length; i++){

    contenedorPalabra.push(palabra[i]);

    if(elemento1[i] == elemento2[contrario])
        console.log("Son iguales");
    else
        console.log("No son iguales");    

    contrario--;
}
console.log(contenedorPalabra);

