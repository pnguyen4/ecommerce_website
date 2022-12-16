const logout = async () => {
    const API_URL = "http://localhost:3000";
    const delay = ms => { return new Promise(resolve => setTimeout(resolve, ms)); }

    const res = await fetch(`${API_URL}/user/logout`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    if (res.status == 200) {
        document.getElementsByTagName('BODY')[0].innerHTML = '<br><br><h1 style="text-align: center";>Logging Out...</h1>';
        await delay(1000);
        location.href = "/";
    } else {
        const error = await res.json();
        document.getElementsByTagName('BODY')[0].innerHTML = `<h1>${error.msg}...</h1>`;
        await delay(1000);
        location.href = "/";
    }
};
