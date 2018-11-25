document.addEventListener("DOMContentLoaded", function(event) {
    const loginUrl = '/api/login/signup';

    const firstName = document.getElementById('firstName');
    const email = document.getElementById('email');
    const lastName = document.getElementById('lastName');
    const userName = document.getElementById('username');
    const passWord = document.getElementById('password') ;
    const singup = document.getElementById('singup');
    const growl = document.getElementById('app-growl');

    singup.addEventListener('click', (event) => {
        console.log('clicked');
        event.preventDefault();

        let formData = new FormData();
        formData.append('firstName', firstName.value);
        formData.append('email', email.value);
        formData.append('lastName', lastName.value);
        formData.append('username', userName.value);
        formData.append('password', passWord.value);

        fetch(loginUrl, {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                let growlBody = document.createElement('div');
                growlBody.classList.add('alert', 'alert-dark', 'alert-dismissible', 'fade', 'show');
                growlBody.setAttribute('role', 'alert');
                const text = document.createTextNode('Пользователь успешно создан. Войдите в систему под своей новой учетной записью');
                growlBody.appendChild(text);
                growl.appendChild(growlBody);
                setTimeout(() => {
                    growl.innerHTML = '';
                    window.location = '/signin'
                }, 2*1000);
            } else {
                let growlBody = document.createElement('div');
                growlBody.classList.add('alert', 'alert-dark', 'alert-dismissible', 'fade', 'show');
                growlBody.setAttribute('role', 'alert');
                const text = document.createTextNode(response.message);
                growlBody.appendChild(text);
                growl.appendChild(growlBody);

                setTimeout(() => {
                    growl.innerHTML = '';
                }, 2*1000);
            }
        })
        .catch(e => console.error(e));
    });
});
