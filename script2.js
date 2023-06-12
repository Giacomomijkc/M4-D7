const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwNDhjYmQyYWRhNDAwMTQzYzFlOTciLCJpYXQiOjE2ODYxMjg4NDMsImV4cCI6MTY4NzMzODQ0M30.gzC_Pzl_1gPar51Qg01hNkIbTtP2aJ8c9m2znFXIATo";
const productsSection = document.getElementById("products-section");
const productDetailsContainer = document.getElementById("product-details");
const cardSection = document.getElementById('products-section');
const cartList = document.getElementById('cart-list');

//fetch per ottenere i prodotti
const fetchProducts = async () => {
    try {
        const response = await fetch (apiUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey 
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
        productName.classList.add('card-title');

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

        //EXTRA creazione carrello
        const addButton = document.createElement('button');
        addButton.textContent = 'Aggiungi al carrello';
        addButton.classList.add('btn', 'btn-success');
        addButton.style.marginTop = "2px";
        addButton.addEventListener("click", () =>{
            //effetto selezionato
            card.style.borderColor = "red";
            //istruzioni per aggiungere le info della candela come li alla ol
            let cartList = document.getElementById("cart-list");
            let newLi = document.createElement("li");
            newLi.innerText = "Nome: " + product.name + "Prezzo: " + product.price;
            cartList.appendChild(newLi);
            //creazione del bottone per rimuovere ogni li
            let deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-warning");
            deleteButton.textContent = "Delete";
            newLi.appendChild(deleteButton);
            let cartInfoContainer = document.getElementById("cart-info-container");
            cartInfoContainer.classList.remove("d-none");
            //istruzioni per settare l'attributo price e usarlo nella funzione updatePrice
            newLi.setAttribute("data-price", product.price);
            //creazione del lsitener sul bottone per rimuovere il li
            deleteButton.addEventListener("click", () => {
              newLi.remove();
              card.style.borderColor = "lightgrey";
              if (cartList.childElementCount === 0) {
                cartInfoContainer.classList.add("d-none");
              }
              //richiamo funzione per aggiornare il prezzo
              updateTotalPrice();
            });
            //richiamo funzione per aggiornare il prezzo
            updateTotalPrice();
    })

        cardBody.appendChild(productName);
        cardBody.appendChild(productDescription);
        cardBody.appendChild(productBrand);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(detailsButton);
        cardBody.appendChild(addButton);

        card.appendChild(image);
        card.appendChild(cardBody);

        productsSection.appendChild(card); 
    });
}

//EXTRA svuota carrello
function deleteCart() {
    let cartList = document.getElementById("cart-list");
    if (cartList.childElementCount > 0){
      while (cartList.firstChild) {
        cartList.firstChild.remove();
        }
  
    //istruzioni per far scomparire la sezione con i contenuti del carrello se non sono presenti contenuti
    let cartInfoContainer = document.getElementById("cart-info-container");
    cartInfoContainer.classList.add("d-none");
    //istruzioni per riportare il bordo colorato delle card selezionate al colore originale
    let cards = document.querySelectorAll(".card");
    for (let index = 0; index < cards.length; index++) {
        cards[index].style.borderColor  = "lightgray"; 
        }
    } 
}
  

////EXTRA funzione per mostrare il prezzo totale delle candele a carrello
function updateTotalPrice() {
    let cartList = document.getElementById("cart-list");
    let items = cartList.querySelectorAll("li");
    let totalPrice = 0;
  
    items.forEach((item) => {
      //istruzione per prendere il valore "prezzo" dal li
      let price = parseFloat(item.getAttribute("data-price"));
      if (!isNaN(price)) {
        totalPrice += price;
      }
    });
  
    let cartInfoTitle = document.getElementById("cart-info-title");
    cartInfoTitle.innerText = "Prezzo totale: " + totalPrice.toFixed(2);
}

//EXTRA funzione per cercare le candele dalla barra di ricerca
const searchCandles = (event) => {
    let query = event.target.value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    let hasResult = false;
  
    if (query === " ") {
      // Mostra tutte le card quando la query è vuota
      cards.forEach((card) => {
        card.style.display = "block";
      });
    } else {
      // Filtra le card in base alla query di ricerca
      cards.forEach((card) => {
        const title = card.querySelector(".card-body h5.card-title");
  
        if (title.innerText.toLowerCase().includes(query)) {
          card.style.display = "block";
          hasResult = true;
        } else {
          card.style.display = "none";
        }
      });
    }
  };

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
                "Authorization": "Bearer " + apiKey 
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