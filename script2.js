const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const productsSection = document.getElementById("products-section");
const productDetailsContainer = document.getElementById("product-details");

//fetch per ottenere i prodotti
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

// funzione che renderizza i prodotti in pagina
const renderProducts = (products) => {
    productsSection.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-3', 'p-2');
        card.style.width = '18rem';

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
        
        const productId = product._id;

        const detailsButton = document.createElement("button");
        detailsButton.classList.add("btn", "btn-primary");
        detailsButton.textContent = "Vai ai dettagli";
        detailsButton.addEventListener("click", ()=>{
            //richiamo della funzione per reindirizzare sulla pagina dettagli del prodotto al click sul bottone
            redirectToDetailsPage(productId);
        })

        cardBody.appendChild(productName);
        cardBody.appendChild(productDescription);
        cardBody.appendChild(productBrand);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(detailsButton);

        card.appendChild(image);
        card.appendChild(cardBody);

        productsSection.appendChild(card); 
    });
}

// Funzione per reindirizzare alla pagina dei dettagli con l'ID del prodotto come parametro
const redirectToDetailsPage = (productId) => {
    window.location.href = `dettagli.html?id=${productId}`;
  };

// Funzione per ottenere i search params e visualizzare i dettagli del prodotto corrispondente
const fetchProductsDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    try {
        const response = await fetch(apiUrl + productId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODYxMjg4NDMsImV4cCI6MTY4NzMzODQ0M30.gzC_Pzl_1gPar51Qg01hNkIbTtP2aJ8c9m2znFXIATo"
            }
        });
        if (response.ok) {
          const product = await response.json();
          renderProductDetails(product);
        } else {
          console.error('Si è verificato un errore nella risposta della API');
        }
      } catch (error) {
        console.error('Si è verificato un errore durante la richiesta dei dettagli del prodotto:', error);
      }
    };

// Funzione per renderizzare i dettagli del prodotto nella pagina dettagli.html
const renderProductDetails = (product) => {
    productDetailsContainer.style.marginLeft = "20px";
    productDetailsContainer.style.marginTop = "20px";

    let image = document.createElement("img");
    image.src = product.imageUrl;
    image.style.width = "150px";
   
    let name = document.createElement("p");
    name.innerText = "Nome: " + product.name;

    let description = document.createElement("p");
    description.innerText = "Descrizione: " + product.description;

    let brand = document.createElement("p");
    brand.innerText = "Brand: " + product.brand;

    let price = document.createElement("p");
    price.innerText = "Prezzo: " + product.price + " " + "Euro";

    let goBackButton = document.createElement("a");
    goBackButton.classList.add("btn", "btn-info");
    goBackButton.innerText = "Torna indietro";
    goBackButton.href = "index.html";

    productDetailsContainer.appendChild(image);
    productDetailsContainer.appendChild(name);
    productDetailsContainer.appendChild(description);
    productDetailsContainer.appendChild(brand);
    productDetailsContainer.appendChild(price);
    productDetailsContainer.appendChild(goBackButton);
}

// Funzione per avviare l'applicazione
const startApp = () => {
    if (window.location.pathname === '/dettagli.html') {
        fetchProductsDetails();
    } else {
      fetchProducts();
    }
  };
  
startApp();