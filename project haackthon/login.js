document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginBox = document.querySelector('.form-box.login');
    const registerBox = document.querySelector('.form-box.register');

    // Show/Hide forms
    showRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    });

    showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
    });

    // Handle Login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Get stored users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store login status
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Redirect to home page
            window.location.href = 'hp1.html';
        } else {
            alert('Invalid email or password');
        }
    });

    // Handle Registration
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            alert('Email already registered');
            return;
        }

        // Add new user
        users.push({
            name,
            email,
            password
        });

        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful! Please login.');
        // Show login form
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
    });
}); 