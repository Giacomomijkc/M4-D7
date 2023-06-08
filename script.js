const productNameInput = document.getElementById("name-field");
const productDescriptionInput = document.getElementById("desc-field");
const productBrandInput = document.getElementById("brand-field");
const productPriceInput = document.getElementById("price-field");
const productImageInput = document.getElementById("upload-img");
const addProductButton = document.getElementById("create-btn");
const productIdInput = document.getElementById("id-field")
const deleteProductButton = document.getElementById("delete-btn");
const emptyFields = document.getElementById("empty-fields");
const alertMessage = document.getElementById("alert-message");
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const productsSection = document.getElementById("products-section");
const successMessage = document.getElementById("success-action");

addProductButton.addEventListener("click", addNewProduct);
deleteProductButton.addEventListener("click", deleteProduct);

// funzione per aggiungere nuovo post
async function addNewProduct() {

  if(productNameInput.value &&
    productDescriptionInput.value &&
    productBrandInput.value &&
    productPriceInput.value &&
    productImageInput.value){


        const payload = {
            "name": productNameInput.value,
            "description": productDescriptionInput.value,
            "brand": productBrandInput.value,
            "imageUrl": productImageInput.value,
            "price": productPriceInput.value
        };
    
        try {
            const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODYxMjg4NDMsImV4cCI6MTY4NzMzODQ0M30.gzC_Pzl_1gPar51Qg01hNkIbTtP2aJ8c9m2znFXIATo"
            }
            });
    
            if (response.ok) {
            // La richiesta è andata a buon fine
                console.log("Nuovo prodotto creato con successo!");
                // Inizializzare i campi input della create:
                productNameInput.value = "";
                productDescriptionInput.value = "";
                productBrandInput.value = "";
                productPriceInput.value = "";
                productImageInput.value = "";
                successMessage.classList.toggle("d-none");
                setTimeout(() => {
                    successMessage.classList.toggle("d-none");
                }, 5000);
                //riaggiorno il catalogo
                fetchProducts();
            } else {
                // La richiesta non è andata a buon fine
                console.log("Errore durante la creazione del prodotto:", response.status, response.statusText);
            }
        } catch (error) {
            // Errore durante la richiesta
            console.log("Errore durante la richiesta:", error);
        }
    } else {
        console.log("valorizza tutti i campi!")
        emptyFields.classList.toggle("d-none");
        setTimeout(() => {
            emptyFields.classList.toggle("d-none");
        }, 5000);
    }

}

//funzione per eliminare i prodotti
async function deleteProduct(){
    //inserisco la condizione per cui deve essere valorizzato il campo id
    if(productIdInput.value){
        // fetch di tipo delete 
        try{

            const response = await fetch(apiUrl + productIdInput.value, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODYxMjg4NDMsImV4cCI6MTY4NzMzODQ0M30.gzC_Pzl_1gPar51Qg01hNkIbTtP2aJ8c9m2znFXIATo"
                }
                });
        
                if (response.ok) {
                // La richiesta è andata a buon fine
                    console.log("Prodotto eliminato con successo!");
                    // Inizializzare i campi input della create:
                    productIdInput.value = "";
                    successMessage.classList.toggle("d-none");
                    setTimeout(() => {
                        successMessage.classList.toggle("d-none");
                    }, 5000);
                    //riaggiorno il catalogo
                    fetchProducts();
                } else {
                    // La richiesta non è andata a buon fine
                    console.log("Errore durante la creazione del prodotto:", response.status, response.statusText);
                }

        } catch (error) {
            console.log("Errore durante la richiesta:", error);
        }

    } else {
        console.log("valorizza il campo ID!")
        emptyFields.classList.toggle("d-none");
        setTimeout(() => {
            emptyFields.classList.toggle("d-none");
        }, 5000);
    }
}

const editButton = document.getElementById("edit-btn");
const editingSection = document.getElementById("editing-section");

//creo un listener sul bottone edit per rendere visibili i campi di input e popolarli con gli attuali valori tramite una fetch di tipo get
editButton.addEventListener("click", async () => {
    //inserisco la condizione per cui deve essere valorizzato il campo id
    if(editingId.value){
        editingSection.classList.remove("d-none");
        //fetc di tipo GET
        try{
            const response = await fetch(apiUrl + productIdInput.value, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODYxMjg4NDMsImV4cCI6MTY4NzMzODQ0M30.gzC_Pzl_1gPar51Qg01hNkIbTtP2aJ8c9m2znFXIATo"
                }
                });
        
                if (response.ok) {
                    // Inizializzre i campi input della create:
                    productIdInput.value = "";

                    const product = await response.json();
                    //richiamo la funzione per popolare i campi di imput con gli attuali valori del prodotto
                    renderProductDetails(product);

                } else {
                    // La richiesta non è andata a buon fine
                    console.log("Errore durante la creazione del prodotto:", response.status, response.statusText);
                }

        } catch (error) {
            console.log("Errore durante la richiesta:", error);
        }

    } else {
        console.log("valorizza il campo Editing ID!")
        emptyFields.classList.toggle("d-none");
        setTimeout(() => {
            emptyFields.classList.toggle("d-none");
        }, 5000);
    }
})

const editingId = document.getElementById("editng-id-field");
const submitButton = document.getElementById("submit-editing-button");
const editedName = document.getElementById("edited-name-field");
const editedDescription = document.getElementById("edited-desc-field");
const editedBrand = document.getElementById("edited-brand-field");
const editedPrice = document.getElementById("edited-price-field");
const editedImage = document.getElementById("edited-upload-img");

submitButton.addEventListener("click", editProduct);

//funzione per modificare un prodotto
async function editProduct() {
    const IdtoEdit = editingId.value;
    //fetch di tipo PUT
    try {
        const response = await fetch(apiUrl + IdtoEdit, {
        method: "PUT",
        body: JSON.stringify({        
            "name": editedName.value,
            "description": editedDescription.value,
            "brand": editedBrand.value,
            "imageUrl": editedImage.value,
            "price": editedPrice.value}),

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODYxMjg4NDMsImV4cCI6MTY4NzMzODQ0M30.gzC_Pzl_1gPar51Qg01hNkIbTtP2aJ8c9m2znFXIATo"
        }
        });
      
        if (response.ok) {
        // La richiesta è andata a buon fine
            console.log("Prodotto modificato con successo!");
            // Inizializzare i campi input della PUT:
            editingId.value = "";
            editedName.value = "";
            editedDescription.value = "";
            editedBrand.value = "";
            editedImage.value = "";
            editedPrice.value = "";
            editingSection.classList.add("d-none");
            successMessage.classList.toggle("d-none");
            setTimeout(() => {
                successMessage.classList.toggle("d-none");
            }, 5000);
            //richiamo la funzione per aggiornare il catalogo 
            fetchProducts();
        } else {
            // La richiesta non è andata a buon fine
            console.log("Errore durante la creazione del prodotto:", response.status, response.statusText);
        }
    } catch (error) {
        // Errore durante la richiesta
        console.log("Errore durante la richiesta:", error);
    }
}

// costante per renderizzare il catalogo prodotti in pagina
const fetchProducts = async () => {
    try {
        const response = await fetch (apiUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODYxMjg4NDMsImV4cCI6MTY4NzMzODQ0M30.gzC_Pzl_1gPar51Qg01hNkIbTtP2aJ8c9m2znFXIATo"
            }
        });
        if (response.ok){
            const products = await response.json();
            // se esito positivo richiamo la funzione che renderizza i prodotti in pagina
            renderProducts(products);
        }
    } catch (error) {
        console.error('Si è verificato un errore durante la richiesta dei libri:', error);
    }
}
    
// funzione che renderizza il catalogo in pagina
const renderProducts = (products) => {
    productsSection.innerHTML = "";
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-3', 'p-2');
        card.style.width = '12rem';
    
        const image = document.createElement("img");
        image.src = product.imageUrl;
        image.classList.add("card-img-top");
    
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
    
        const productName = document.createElement("h5");
        productName.textContent = product.name;
    
        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;
    
        const productBrand = document.createElement("p");
        productBrand.textContent = product.brand;
    
        const productPrice = document.createElement("p");
        productPrice.textContent = product.price + " " + "Euro";
            
        const productId =document.createElement("p");
        productId.textContent = "ID: " + " " + product._id;
    
        cardBody.appendChild(productName);
        cardBody.appendChild(productDescription);
        cardBody.appendChild(productBrand);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(productId);

    
        card.appendChild(image);
        card.appendChild(cardBody);
    
        productsSection.appendChild(card); 
    });
}
    
// funzione che renderizza nei campi editing i valori del prodotto
const renderProductDetails = (product) => {
    
    product.forEach(data => {
    
        editedName.value = data.name;
        editedDescription.value = data.description;
        editedBrand.value = data.brand;
        editedPrice.value = data.price;
        editedImage.value = data.imageUrl;
    });
}

//lancio la costante fetchProducts per renderizzare i prodotti in pagina al caricamento della pagina
window.onload = () => {
    fetchProducts();
}