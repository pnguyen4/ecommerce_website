const favorites_list = document.getElementById('favorites_list');

// using event delegation
favorites_list.addEventListener('click', async e => {
    const API_URL = "http://localhost:3000";
    const product = e.target.id;

    await fetch(`${API_URL}/products/details/${product}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    window.location.reload();
});
