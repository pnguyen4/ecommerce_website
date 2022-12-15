const form = document.getElementById("userportal");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:3000";
    const delay = ms => { return new Promise(resolve => setTimeout(resolve, ms)); }

    try {
        const userAlert = document.getElementById('userAlert');
        const passwordAlert = document.getElementById('passwordAlert');
        const emailAlert = document.getElementById('emailAlert');
        const confirmAlert = document.getElementById('confirmAlert');

        // reset
        userAlert.innerText = "";
        passwordAlert.innerText = "";
        emailAlert.innerText = "";
        confirmAlert.innerText = "";

        let username = form.elements["inputUsername"].value;
        let email = form.elements["inputEmail"].value;
        let password = form.elements["inputPassword"].value;
        let confirm_password = form.elements["confirmPassword"].value;

        if (confirm_password != password) {
            confirmAlert.innerText = "Passwords do not match."
            return;
        }

        let user = {username, email, password}
        const res = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });

        if (res.status >= 400) {
            const error = await res.json();
            console.log(JSON.stringify(error));

            // display errors
            if (error.msg.user) userAlert.innerText = error.msg.user;
            if (error.msg.email) emailAlert.innerText = error.msg.email;
            if (error.msg.password) passwordAlert.innerText = error.msg.password;
        } else {
            document.getElementById('msg').innerText = "Account created successfully. Redirecting...";
            await delay(1000);
            location.href = "/";
        }
    } catch (error) {
        console.log(error);
    }
});
