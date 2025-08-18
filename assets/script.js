const produtosDaLoja = [
  {
    id: 1,
    nome: 'Nike Dunk Low Retro',
    categoria: 'Casual',
    preco: 799.99,
    imagemUrl: './assets/imgs/dunk.jpg',
  },
  {
    id: 2,
    nome: 'Air Jordan 1 High',
    categoria: 'Basquete',
    preco: 1299.99,
    imagemUrl: './assets/imgs/airjordan.jpg',
  },
  {
    id: 3,
    nome: 'Adidas Forum Low',
    categoria: 'Casual',
    preco: 599.99,
    imagemUrl: './assets/imgs/forumlow.jpg',
  },
  {
    id: 4,
    nome: 'New Balance 550',
    categoria: 'Casual',
    preco: 849.99,
    imagemUrl: './assets/imgs/newbalance.jpg',
  },
  {
    id: 5,
    nome: 'Nike Air Force 1',
    categoria: 'Clássicos',
    preco: 699.99,
    imagemUrl: './assets/imgs/airforce.jpg',
  },
];

// Nosso carrinho começa vazio
let itensNoCarrinho = [];

/**Selecionando Elementos */
const ul = document.querySelector('#lista-produtos');
const ulCarrinho = document.querySelector('#lista-carrinho');
const totalCarrinho = document.querySelector('#total-carrinho');

ul.addEventListener('click', function (e) {
  const el = e.target;
  const produtoId = Number(el.dataset.id);
  if (el.classList.contains('btn-adicionar-carrinho')) {
    const produtoAdicionado = produtosDaLoja.find(function (produto) {
      return produto.id === produtoId;
    });
    itensNoCarrinho.push(produtoAdicionado);
    renderizarCarrinho(itensNoCarrinho);
    atualizarTotal(itensNoCarrinho);
  }
});

/**Funções */

function atualizarTotal(listaDeProdutos) {
  let total = listaDeProdutos.reduce(function (acumulador, produto) {
    acumulador += produto.preco;
    return acumulador;
  }, 0);
  const precoFormatado = formataMoeda(total); //Formatando total para MOEDA REAL
  totalCarrinho.innerHTML = `
                <strong>Total:</strong>
                <span id="total-carrinho" class="preco-produto">${precoFormatado}</span>
                <button class="btn-adicionar-carrinho">Comprar</button>
  `;
}

/**Função Básica para formatar o total para Moeda BRL */
function formataMoeda(preco) {
  return preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/**Função Para Renderizar Produtos da Loja */
function renderizarProdutos(lista) {
  const produtoCriado = lista.map(function (obj) {
    return `
      <li class="product-card flex flex-col gap-2">
                    <img src="${
                      obj.imagemUrl
                    }" class="img-tenis" alt="imagem de um tênis da adidas, cinza com listras brancas">
                    <div class="flex flex-col">
                        <h3>${obj.nome}</h3>
                        <span>Categoria: ${obj.categoria}</span>
                        <span class="preco-produto">${obj.preco.toFixed(
                          2,
                        )}</span>
                    </div>
                    <button class="btn-adicionar-carrinho" data-id="${
                      obj.id
                    }">Adicionar ao Carrinho</button>
                </li>
      `;
  });
  const listaPronta = produtoCriado.join('');
  ul.innerHTML = listaPronta; //Mostrando os produtos na página
}
/**Função para Renderizar Carrinhos */
function renderizarCarrinho(listaCarrinho) {
  const produtoNoCarrinho = listaCarrinho.map(function (produto) {
    return `
      <li class="border-b-1">
                    <img src="${produto.imagemUrl}" alt="Tênis Nike Air Max 90">
                    <div class="produto-info">
                        <span class="nome-produto">${produto.nome}</span>
                        <span class="preco-produto">${produto.preco}</span>
                    </div>
                    <button class="btn-remover" aria-label="Remover do carrinho">🗑️</button>
                </li>
    `;
  });
  const listaCarrinhoPronta = produtoNoCarrinho.join('');
  ulCarrinho.innerHTML = listaCarrinhoPronta; //Mostrando os itens no carrinho
}

renderizarProdutos(produtosDaLoja);
