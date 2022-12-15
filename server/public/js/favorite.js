const button = document.getElementById('favorite');
button.addEventListener('click', async () => {
    await fetch(location.href, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.reload();
})
