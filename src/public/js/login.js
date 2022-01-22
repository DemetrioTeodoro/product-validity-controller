const validate = () => {
    const username = document.formLogin.username.value;
    const password = document.formLogin.password.value;
    if(!username || !password) {
        swal('Ops', 'Digite o usuario e a senha.', 'warning');
        return false;
    } else {
        switch (true) {
            case username.trim() !== '' && password !== '':
                const user = { username, password };
                sessionStorage.setItem('user',JSON.stringify(user));
                return true;
                
            default:
                swal('Ops', 'Digite o usuario e a senha validos.', 'error');
                return false;
        }
    }
}