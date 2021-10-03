function calcular(){
    let num1= parseInt(document.getElementById("num-1").value);
    let num2= parseInt(document.getElementById("num-2").value);
    var opera= document.getElementById("operacion").value;
    if(opera == 1){
        document.getElementById("resultado").value= num1 + num2;
    }else{
        document.getElementById("resultado").value= num1 - num2;
    }
}