# Questões objetivas
### 1) Considerando a execução do código abaixo, indique a alternativa correta e justifique sua resposta.
```javascript
console.log(x);
var x = 5;
console.log(y);
let y = 10;
```
a) <u>A saída será undefined seguido de erro</u>

**Justificativa:** No caso do x, o código está tentando usar um ```console.log()``` em uma variavel global, mas ela ainda não foi definida no codigo. Já no caso de y, por ser uma variavel local que ainda não foi definida isso resulta em um erro.

### 2) O seguinte código JavaScript tem um erro que impede sua execução correta. Analise e indique a opção que melhor corrige o problema. Justifique sua resposta

```javascript
function soma(a, b) {
    if (a || b === 0) {
        return "Erro: número inválido";
    }
    return a + b;
}
console.log(soma(2, 0));
```
d) <u> Remover completamente a verificação if (a || b === 0) </u>

**Justificativa:** Na função, o ```if (a || b === 0)```  não é necessario pois é possível somar 0 com outro número sem ter erros.
______
**3) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
function calcularPreco(tipo) {
    let preco;

    switch(tipo) {
        case "eletrônico":
            preco = 1000;
        case "vestuário":
            preco = 200;
            break;
        case "alimento":
            preco = 50;
            break;
        default:
            preco = 0;
    }

    return preco;
}

console.log(calcularPreco("eletrônico"));
```

b) <u> O código imprime 200. </u>

**Justificativa:** O código imprime 200 pois dentro do switch no ```case "eletronico"``` não tem um ```break``` que terminaria o switch, então o codigo avança para o próximo case e define o preço para 200 em vez de 1000.
______
**4) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
let numeros = [1, 2, 3, 4, 5];

let resultado = numeros.map(x => x * 2).filter(x => x > 5).reduce((a, b) => a + b, 0);

console.log(resultado);
```
d) <u> 24 </u>

**Justificativa:** O código primeiro pega os números do array e os multiplica por 2. Depois, ele remove todos os números menores que 5 do array e soma os números restantes para obter um valor único.
______
**5) Qual será o conteúdo do array lista após a execução do código? Indique a alternativa correta e justifique sua resposta.**

```javascript
let lista = ["banana", "maçã", "uva", "laranja"];
lista.splice(1, 2, "abacaxi", "manga");
console.log(lista);
```
c) <u> ["banana", "abacaxi", "manga", "laranja"] </u>

**Justificativa:** O ```lista.splice()``` substitui o segundo e terceiro elemento dentro do array, por abacaxi e manga, resultando na lista acima.
______
**6) Abaixo há duas afirmações sobre herança em JavaScript. Indique a alternativa correta e justifique sua resposta**

I. A herança é utilizada para compartilhar métodos e propriedades entre classes em JavaScript, permitindo que uma classe herde os métodos de outra sem a necessidade de repetir código.  
II. Em JavaScript, a herança é implementada através da palavra-chave `extends`.

a) <u> As duas afirmações são verdadeiras, e a segunda justifica a primeira. </u>

**Justificativa:** A primeira alternativa é correta, no javascript a herança pode ser utilizada entre classes e permite que uma outra classe utilize elementos de outra classe com o elemento extends.
______
**7) Dado o seguinte código. Indique a alternativa correta e justifique sua resposta.**

```javascript
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

class Funcionario extends Pessoa {
  constructor(nome, idade, salario) {
    super(nome, idade);
    this.salario = salario;
  }

  apresentar() {
    super.apresentar();
    console.log(`Meu salário é R$ ${this.salario}.`);
  }
}
```


I) A classe Funcionario herda de Pessoa e pode acessar os atributos nome e idade diretamente.  
II) O método `apresentar()` da classe Funcionario sobrepõe o método `apresentar()` da classe Pessoa, mas chama o método da classe pai usando `super`.  
III) O código não funciona corretamente, pois Funcionario não pode herdar de Pessoa como uma classe, já que o JavaScript não suporta herança de classes.

Quais das seguintes afirmações são verdadeiras sobre o código acima?

a) <u> I e II são verdadeiras. </u>

**Justificativa:** 

1: Verdadeira, A classe funcionario consegue utilizar o nome e idade da classe pessoa
2: Verdadeira, o metodo ```apresentar()``` faz o print da classe pessoa e também o da classe funcionario
3: Falsa, o código funciona corretamente e javascript suporta herança de classes.

______

**8) Analise as afirmações a seguir. Indique a alternativa correta e justifique sua resposta.**

**Asserção:** O conceito de polimorfismo em Programação Orientada a Objetos permite que objetos de diferentes tipos respondam à mesma mensagem de maneiras diferentes.  
**Razão:** Em JavaScript, o polimorfismo pode ser implementado utilizando o método de sobrecarga de métodos em uma classe.

b) A asserção é verdadeira e a razão é falsa.

**Justificativa:** A asserção é verdadeira pois em componentes diferentes é possível ter métodos com nomes iguais. Já a razão é falsa pois o Javascript não suporta sobrecarga de métodos, ele apenas suporta sobrescrita de métodos.


______

# Questões dissertativas
9) O seguinte código deve retornar a soma do dobro dos números de um array, mas contém erros. Identifique os problema e corrija o código para que funcione corretamente. Adicione comentários ao código explicado sua solução para cada problema.

```javascript
function somaArray(numeros) {

    for (i = 0; i < numeros.size; i++) {
        soma = 2*numeros[i];
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```

**CODIGO CORRIGIDO:**
```javascript
function somaArray(numeros) {
    // adiciona a variavel soma, que não era especificada no código original
    let soma;

    // muda o numeros.size para numeros.length, que é o tamanho real do array
    for (i = 0; i < numeros.length; i++) {
        soma = 2*numeros[i];
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```
______
10) Crie um exemplo prático no qual você tenha duas classes:

- Uma classe `Produto` com atributos `nome` e `preco`, e um método `calcularDesconto()` que aplica um desconto fixo de 10% no preço do produto.
- Uma classe `Livro` que herda de `Produto` e modifica o método `calcularDesconto()`, aplicando um desconto de 20% no preço dos livros.

Explique como funciona a herança nesse contexto e como você implementaria a modificação do método na classe `Livro`.

```javascript
class Produto {
    constructor(nome,preco) {
        this.nome = nome;
        this.preco = preco;
    }

    calcularDesconto() {
        return this.preco * 0.9;
    }
}

class Livro extends Produto {
    constructor(nome,preco) {
        super(nome,preco) 
    }

    calcularDesconto() {
        return this.preco * 0.8;
    }
}

```
**Explicação:**

Nesse contexto a classe livro herda os atributos nome e preco da classe produto, mas a função não é herdada, e sua função apesar de ter o mesmo nome retorna um valor diferente.
