import CONSTANTS from "../utils/constants.js";
import { request } from "../utils/request.js";

const saveNewProductBtn = document.getElementById('save-new-product-btn');
const cancelAndCloseModalBtn = document.getElementById('cancel-and-close-modal-btn');
const editProductBtn = document.querySelectorAll('.table #edit-product-btn');
const toDeleteProductBtn = document.querySelectorAll('.table #to-delete-product-btn');
const deleteProductBtn = document.getElementById('delete-product-btn');

const getRowValue = ({ tr, index }) => {
    return tr.cells[index].textContent;
}

const getProductToDelete = event => {
    const tr = event.target.closest('tr');
    document.getElementById('id-delete').value = getRowValue({ tr,  index: 0 });
    document.getElementById('product-name-delete').value = getRowValue({ tr,  index: 1 });
    document.getElementById('product-amount-delete').value = getRowValue({ tr,  index: 2 });
    document.getElementById('product-validity-delete').value = getRowValue({ tr,  index: 3 });
}

const deleteProduct = async () => {
    const id = document.getElementById('id-delete').value;
    console.info(`Product id to delete: ${id}`);
    const response = await request({ method: CONSTANTS.METHODS.DELETE, path: '/product', id });
    if (response.status !== CONSTANTS.RESPONSE.STATUS.OK) {
        swal(CONSTANTS.MESSAGE.ERROR_TITLE, CONSTANTS.MESSAGE.ERROR, 'error');
    }
    swal(CONSTANTS.MESSAGE.SUCCESS_TITLE, CONSTANTS.MESSAGE.SUCCESSFULLY_DELETED_PRODUCT, 'success');
    console.info(`Product id deleted: ${id}`);
}

const buildOrCleanProduct = (id = '', productName = '', productAmount = '', productValidity = '') => {
    document.getElementById('id').value = id;
    document.getElementById('product-name').value = productName;
    document.getElementById('product-amount').value = productAmount;
    document.getElementById('product-validity').value = productValidity;
}

const getDataToEdit = async event => {
    const tr = event.target.closest('tr');

    document.getElementById('title').innerHTML = 'Editar Produto';

    const id = getRowValue({ tr, index: 0 });
    
    const product = await request({ method: CONSTANTS.METHODS.GET, path: '/product/findById', id, json: true });
    console.log('product', product);

    buildOrCleanProduct(id, product.name, product.amount, product.expirationDate);
}

const setTitleNewProtuct = () => {
    document.getElementById('title').innerHTML = 'Novo Produto';
    buildOrCleanProduct();
}

saveNewProductBtn.addEventListener('click', setTitleNewProtuct);
cancelAndCloseModalBtn.addEventListener('click', buildOrCleanProduct);
editProductBtn.forEach(e => e.addEventListener('click', getDataToEdit));
toDeleteProductBtn.forEach(e => e.addEventListener('click', getProductToDelete));
deleteProductBtn.addEventListener('click', deleteProduct);