const CONSTANTS = {
    URL: 'http://localhost:3000',
    METHODS: {
        GET: 'GET',
        DELETE: 'DELETE',
    },
    RESPONSE: {
        STATUS: {
            OK: 200,
            NO_CONTENT: 204,
            ERROR: 400
        },
    },
    MESSAGE: {
        SUCCESS_TITLE: 'Deu certo!',
        SUCCESSFULLY_DELETED_PRODUCT: 'Produto deletado com sucesso',
        ERROR_TITLE: 'Erro',
        NO_CONTENT: 'Ops, parece que não tem dados.',
        ERROR: 'Ops, ocorreu um erro.'
    }
};

export default CONSTANTS;