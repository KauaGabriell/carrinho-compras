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

// Estado do carrinho (fonte da verdade)
let itensNoCarrinho = [];

/** Seleção de elementos da interface */
const listaProdutosElemento = document.querySelector('#lista-produtos');
const listaCarrinhoElemento = document.querySelector('#lista-carrinho');
const valorTotalElemento = document.querySelector('#valor-total');

/** Eventos */
// Adicionar produto ao carrinho (delegação)
listaProdutosElemento.addEventListener('click', function (event) {
  const elementoClicado = event.target;
  if (!elementoClicado.classList.contains('btn-adicionar-carrinho')) return;

  const produtoId = Number(elementoClicado.dataset.id);
  adicionarAoCarrinho(produtoId);
  renderizarCarrinho();
});

// Remover unidade do produto do carrinho (delegação)
listaCarrinhoElemento.addEventListener('click', function (event) {
  const elementoClicado = event.target;
  if (!elementoClicado.classList.contains('btn-remover')) return;

  const produtoId = Number(elementoClicado.dataset.id);
  removerUmaUnidadeDoCarrinho(produtoId);
  renderizarCarrinho();
});

/** Funções utilitárias */
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Regras de negócio */
function adicionarAoCarrinho(produtoId) {
  const itemExistente = itensNoCarrinho.find(function (item) { return item.id === produtoId; });
  if (itemExistente) {
    itemExistente.quantidade += 1;
    return;
  }
  const produto = produtosDaLoja.find(function (p) { return p.id === produtoId; });
  if (!produto) return;
  itensNoCarrinho.push({ ...produto, quantidade: 1 });
}

function removerUmaUnidadeDoCarrinho(produtoId) {
  const item = itensNoCarrinho.find(function (i) { return i.id === produtoId; });
  if (!item) return;
  if (item.quantidade > 1) {
    item.quantidade -= 1;
    return;
  }
  itensNoCarrinho = itensNoCarrinho.filter(function (i) { return i.id !== produtoId; });
}

/** Renderização */
function renderizarListaProdutos(lista) {
  const htmlProdutos = lista.map(function (produto) {
    return `
      <li class="product-card flex flex-col gap-2">
        <img src="${produto.imagemUrl}" class="img-tenis" alt="Imagem do produto ${produto.nome}">
        <div class="flex flex-col">
          <h3>${produto.nome}</h3>
          <span>Categoria: ${produto.categoria}</span>
          <span class="preco-produto">${formatarPreco(produto.preco)}</span>
        </div>
        <button class="btn-adicionar-carrinho" data-id="${produto.id}">Adicionar ao Carrinho</button>
      </li>
    `;
  }).join('');

  listaProdutosElemento.innerHTML = htmlProdutos;
}

function renderizarCarrinho() {
  const htmlCarrinho = itensNoCarrinho.map(function (item) {
    return `
      <li class="item-carrinho">
        <img src="${item.imagemUrl}" alt="${item.nome}">
        <div class="produto-info">
          <span class="nome-produto">${item.nome} (x${item.quantidade})</span>
          <span class="preco-produto">${formatarPreco(item.preco * item.quantidade)}</span>
        </div>
        <button class="btn-remover" data-id="${item.id}" title="Remover uma unidade">🗑️</button>
      </li>
    `;
  }).join('');

  listaCarrinhoElemento.innerHTML = htmlCarrinho;
  atualizarTotalCarrinho();
}

function atualizarTotalCarrinho() {
  const total = itensNoCarrinho.reduce(function (soma, item) {
    return soma + (item.preco * item.quantidade);
  }, 0);
  if (valorTotalElemento) {
    valorTotalElemento.textContent = formatarPreco(total);
  }
}

// Inicialização
renderizarListaProdutos(produtosDaLoja);
renderizarCarrinho();
