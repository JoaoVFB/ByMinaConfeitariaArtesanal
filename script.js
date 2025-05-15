// Seleciona os elementos do DOM
const form = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userList = document.getElementById('user-list');
const searchInput = document.getElementById('search');
const clearFieldsBtn = document.getElementById('clear-fields');
const clearListBtn = document.getElementById('clear-list');

// Carrega usuários do Local Storage e exibe na lista
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const li = createListItem(user, index);
        userList.appendChild(li);
    });
}


function createListItem(user, index) {
    const li = document.createElement('li');
    li.style.display = 'flex'; // Habilita o flexbox
    li.style.alignItems = 'center'; // Alinha os itens verticalmente no centro
    li.style.justifyContent = 'space-between'; // Espaço entre o texto e o botão

    const text = document.createTextNode(`${user.name} - ${user.email} (Enviado em: ${user.date})`);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.addEventListener('click', () => deleteUser(index));

    li.appendChild(text); // Adiciona o texto primeiro
    li.appendChild(deleteBtn); // Adiciona o botão depois
    return li;
}


// Adiciona um novo usuário ao Local Storage e à lista
function addUser(name, email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${
        (currentDate.getMonth() + 1).toString().padStart(2, '0')
    }/${currentDate.getFullYear()}`;

    const newUser = { name: name.trim(), email: email.trim(), date: formattedDate };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Remove um usuário específico do Local Storage e da lista
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Remove todos os usuários do Local Storage e da lista com confirmação
function clearUsers() {
    if (confirm('Deseja realmente excluir todos os itens?')) {
        localStorage.removeItem('users');
        loadUsers();
    }
}

// Evento do botão "Limpar Lista"
clearListBtn.addEventListener('click', clearUsers);

// Filtra a lista de usuários com base no termo de pesquisa
function searchUsers(query) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) || 
        user.email.toLowerCase().includes(query.toLowerCase())
    );

    userList.innerHTML = '';
    filteredUsers.forEach((user, index) => {
        const li = createListItem(user, index);
        userList.appendChild(li);
    });
}

// Eventos do formulário e botões
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addUser(nameInput.value, emailInput.value);
    nameInput.value = '';
    emailInput.value = '';
});

clearFieldsBtn.addEventListener('click', () => {
    nameInput.value = '';
    emailInput.value = '';
});

clearListBtn.addEventListener('click', clearUsers);

searchInput.addEventListener('input', (e) => {
    searchUsers(e.target.value);
});

// Inicializa a lista ao carregar a página
loadUsers();
