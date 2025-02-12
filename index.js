let nota_1 = 6;
let nota_2 = 10;
let nota_3 = 6;

let media = ((nota_1 + nota_2 + nota_3) / 3).toFixed(2);

let nota_array = [nota_1, nota_2, nota_3];
let maiorNota = 0;

for(let i=0;i<3;i++) {
    let nota_numero = i+1
    console.log('NOTA '+nota_numero+': '+nota_array[i])
}

console.log('\n📃 MEDIA: '+media)
if (media >= 7) {
  console.log("😁 APROVADO!");
} else {
  console.log("😭 REPROVADO!");
}

for (let i = 0; i < nota_array.length; i++) {
    if(maiorNota < nota_array[i]) {
        maiorNota = nota_array[i]
    }
}
console.log('Sua maior nota foi: '+maiorNota)
