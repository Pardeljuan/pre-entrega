// Establece la conexión con el servidor usando Socket.IO
const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const errorMessage = document.getElementById("error-message");
const btnDeleteProduct = document.getElementById("btn-delete-product");
const inputProductId = document.getElementById("input-product-id");


socket.on("products-list", (data) => {
    const products = data.products || [];

    productsList.innerText = "" ;

    products.forEach((product) => {
        productsList.innerHTML += `<li>ID: ${product.id} - Nombre: ${product.title}</li>`
    });
});

productsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);

    errorMessage.innerText = "";
    form.reset();

    socket.emit("insert-product", {
        title: formdata.get("title"),
        status: formdata.get("status") || "off",
        stock: formdata.get("stock"),
    });
});

    btnDeleteProduct.addEventListener("click", () => {
    const id = inputProductId.value;
    inputProductId.innerText = "";
    errorMessage.innerText = "";

    if(id > 0 ){
        socket.emit("delete-product", {id});
    }
    
});

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});
