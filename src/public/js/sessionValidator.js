const validateSession = () => {
    const user = sessionStorage.getItem('user');

    if (!user) {
        window.location.href = '/';
    }
}