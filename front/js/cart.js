//Je récuper les données du localStorage et de l'API
dataApi = []
localStorageProducts = []

const getApi = async (id) => {
    const res = await fetch("http://localhost:3000/api/products/" + id)
    const data = res.json()
    return data 
}

const getProducts = async () => {

    let productsLinea = localStorage.getItem("products");
    localStorageProducts = JSON.parse(productsLinea);
    
    for (i = 0; i < localStorageProducts.length; i++) {
        const product = localStorageProducts[i]
        
        let data = await getApi(product.id)
        dataApi.push(data)
    }
}


//Je crée une section qui va contenir tout les article de nôtre panier
const cartItems = document.querySelector("#cart__items")  
const cartPrice = document.querySelector(".cart__price") 
const addSection = document.createElement("section")
cartItems.insertBefore(addSection, cartPrice)
const sectionArticle = document.querySelector("#cart__items section")


//Je parcours les données récupérer pour les inserer dans le DOM
function insertHTML() {

    let template = ""

    let addTotalPrice = 0
    

    for (i = 0 ; i < localStorageProducts.length; i++) {

        const priceProduct = dataApi[i].price * localStorageProducts[i].n
        addTotalPrice += priceProduct

        const articleItem = `
                <article class="cart__item" data-id="${localStorageProducts[i]._id}" data-color="${localStorageProducts[i].color}">
                    <div class="cart__item__img">
                        <img src="${dataApi[i].imageUrl}" alt="${dataApi[i].description}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${dataApi[i].name}</h2>
                            <p>${localStorageProducts[i].color}</p>
                            <p>${priceProduct},00 €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProducts[i].n}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`

        template += articleItem
    }

    //Ajout du total articles et prix
    const totalPrice = document.querySelector("#totalPrice")
    totalPrice.textContent = `${addTotalPrice},00`
    const totalQuatity = document.querySelector("#totalQuantity")
    totalQuatity.textContent = localStorageProducts.length

    sectionArticle.innerHTML = template 
}


//Modifier la quantité 
function editQuantity() {
    const itemsQuantity = document.querySelectorAll(".itemQuantity")

    for (i = 0; i < itemsQuantity.length; i++) {

        itemsQuantity[i].addEventListener("change", function (event) {  

            const newQuantity = event.path[0].valueAsNumber
            const articleProduct = event.path[4]

            const positionChild = Array.prototype.indexOf.call(sectionArticle.children, articleProduct)

            localStorageProducts[positionChild].n = newQuantity

            let productsLinea = JSON.stringify(localStorageProducts)
            localStorage.setItem("products", productsLinea) 

            showProducts()
        })
    }
}


//Suppression d'un article dans le panier
function removeProduct() {
    const buttonsDelete = document.querySelectorAll(".deleteItem")

    for (i = 0; i < buttonsDelete.length; i++) {
        buttonsDelete[i].addEventListener("click", function (event) {
            console.log("delete", event)

            const articleProduct = event.path[4]

            const positionChild = Array.prototype.indexOf.call(sectionArticle.children, articleProduct)

            localStorageProducts.splice(positionChild, 1)

            sectionArticle.remove(articleProduct)
            
            let productsLinea = JSON.stringify(localStorageProducts)
            localStorage.setItem("products", productsLinea) 

            showProducts()
        })
    }
}




// ----- Exécution du code ----- //

const showProducts = async () => {
    let getData = await getProducts()

    insertHTML()

    editQuantity()
    removeProduct()
}

showProducts()