
let users = [];


function generateFakeUsers(usersFromApi) {
    return usersFromApi.map(user => ({
        ...user,
        age: Math.floor(Math.random() * (50 - 18 + 1)) + 18 
    }));
}


async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); 
        users = generateFakeUsers(data);
        displayUsers(users);
    } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
    }
}


function displayUsers(usersToDisplay) {
    const container = document.getElementById('users-container');
    container.innerHTML = ''; 

    if (usersToDisplay.length === 0) {
        container.innerHTML = '<p>Нет пользователей для отображения.</p>';
        return;
    }

    usersToDisplay.forEach(user => {
        console.log(user); 
        const userElement = document.createElement('div');
        userElement.className = 'user';
        userElement.innerHTML = `
            <h3>${user.name || 'Имя не указано'}</h3>
            <p><strong>Email:</strong> ${user.email || 'Email не указан'}</p>
            <p><strong>Возраст:</strong> ${user.age || 'Возраст не указан'}</p>
            <p><strong>Компания:</strong> ${user.company.name || 'Компания не указана'}</p>
        `;
        container.appendChild(userElement);
    });
}


function filterUsersByNumber() {
    const numberOfUsers = parseInt(document.getElementById('number-of-users').value, 10);
    if (isNaN(numberOfUsers) || numberOfUsers <= 0) {
        displayUsers(users);
        return;
    }
    const filteredUsers = users.slice(0, numberOfUsers);
    displayUsers(filteredUsers);
}


function filterUsersByAge() {
    const maxAge = parseInt(document.getElementById('age-filter').value, 10);
    if (isNaN(maxAge) || maxAge <= 0) {
        displayUsers(users);
        return;
    }
    const filteredUsers = users.filter(user => user.age <= maxAge);
    displayUsers(filteredUsers);
}


document.getElementById('apply-number').addEventListener('click', filterUsersByNumber);
document.getElementById('apply-age').addEventListener('click', filterUsersByAge);


window.onload = fetchUsers;
