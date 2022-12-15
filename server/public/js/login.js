const form = document.getElementById("userportal");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const delay = ms => { return new Promise(resolve => setTimeout(resolve, ms)); }
    const API_URL = "http://localhost:3000";

    try {
        // reset error messages
        userAlert = document.getElementById('userAlert');
        passwordAlert = document.getElementById('passwordAlert');
        userAlert.innerText = "";
        passwordAlert.innerText = "";

        let username = form.elements["inputUsername"].value;
        let password = form.elements["inputPassword"].value;
        let user = {username, password}

        const res = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });

        if (res.status >= 400) {
            const error = await res.json();
            // display errors messages
            if (error.msg.user) userAlert.innerText = error.msg.user;
            if (error.msg.password) passwordAlert.innerText = error.msg.password;
            if (error.msg.other) document.getElementById('msg').innerText = error.msg.other;
        } else {
            //const response = await res.json();
            //localStorage.setItem('token', response.token);
            document.getElementById('msg').innerText = "Signing in..."
            await delay(1000);
            location.href = "/";
        }
    } catch (error) {
        console.log(error);
    }
});
