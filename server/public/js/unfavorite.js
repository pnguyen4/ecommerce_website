const btn = document.getElementById('unfavorite');

btn.addEventListener('click', async e => {
    await fetch(location.href, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.reload();
});
