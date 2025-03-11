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

const livro = new Livro('10 razoes porque Javascript é inferior a Typescript',100);
const produto = new Produto('Produtex', 100)

console.log(livro.calcularDesconto())
console.log(produto.calcularDesconto())