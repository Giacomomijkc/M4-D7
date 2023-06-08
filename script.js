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

addProductButton.addEventListener("click", addNewProduct);
deleteProductButton.addEventListener("click", deleteProduct);

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

async function deleteProduct(){

    if(productIdInput.value){

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

editButton.addEventListener("click", () => {
    if(editingId.value){
        editingSection.classList.remove("d-none");
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

async function editProduct() {
    const IdtoEdit = editingId.value;
      
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
            editedName.value = "";
            editedDescription.value = "";
            editedBrand.value = "";
            editedImage.value = "";
            editedPrice.value = "";
        } else {
            // La richiesta non è andata a buon fine
            console.log("Errore durante la creazione del prodotto:", response.status, response.statusText);
        }
    } catch (error) {
        // Errore durante la richiesta
        console.log("Errore durante la richiesta:", error);
    }}