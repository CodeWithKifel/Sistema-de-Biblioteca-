// Lista de livros na biblioteca
let biblioteca = [];

// Função para adicionar um livro
function adicionarLivro() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;

    if (!titulo || !autor) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const livro = {
        titulo: titulo,
        autor: autor,
        disponivel: true,
        emprestimos: 0
    };

    biblioteca.push(livro);
    atualizarLista();
    limparCampos();
}

// Função para atualizar a lista de livros disponíveis e emprestados
function atualizarLista() {
    // Atualizar livros disponíveis
    const livrosDisponiveis = biblioteca.filter(livro => livro.disponivel);
    const livrosEmprestados = biblioteca.filter(livro => !livro.disponivel);

    // Exibir livros disponíveis
    const listaDisponiveis = document.getElementById('livrosDisponiveis');
    listaDisponiveis.innerHTML = '';
    livrosDisponiveis.forEach(livro => {
        const li = document.createElement('li');
        li.textContent = `${livro.titulo} - ${livro.autor}`;
        listaDisponiveis.appendChild(li);
    });

    // Exibir livros emprestados
    const listaEmprestados = document.getElementById('livrosEmprestados');
    listaEmprestados.innerHTML = '';
    livrosEmprestados.forEach(livro => {
        const li = document.createElement('li');
        li.textContent = `${livro.titulo} - ${livro.autor}`;
        listaEmprestados.appendChild(li);
    });

    // Atualizar total de empréstimos
    const totalEmprestimos = biblioteca.reduce((total, livro) => total + livro.emprestimos, 0);
    document.getElementById('totalEmprestimos').textContent = totalEmprestimos;
}

// Função para emprestar um livro
function emprestarLivro() {
    const titulo = document.getElementById('livroEmprestimo').value;

    const livro = biblioteca.find(l => l.titulo === titulo);
    if (livro && livro.disponivel) {
        livro.disponivel = false;
        livro.emprestimos++;
        atualizarLista();
        alert(`Você emprestou o livro: ${titulo}`);
    } else if (!livro) {
        alert('Livro não encontrado');
    } else {
        alert('Livro não disponível para empréstimo');
    }

    document.getElementById('livroEmprestimo').value = '';
}

// Função para devolver um livro
function devolverLivro() {
    const titulo = document.getElementById('livroEmprestimo').value;

    const livro = biblioteca.find(l => l.titulo === titulo);
    if (livro) {
        livro.disponivel = true;
        atualizarLista();
        alert(`Você devolveu o livro: ${titulo}`);
    } else {
        alert('Livro não encontrado');
    }

    document.getElementById('livroEmprestimo').value = '';
}

// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
}
