// -_-_-_-_-_- Afficher les produits dans le panier -_-_-_-_-_- \\


//Je récuper les données du localStorage et de l'API
let dataApi = []
let productsLocalStorage = []
let products = []

const getApi = async (id) => {
    const res = await fetch("http://localhost:3000/api/products/" + id)
    const data = res.json()
    return data 
}

const getProducts = async () => {

    let productsLinea = localStorage.getItem("products");
    productsLocalStorage = JSON.parse(productsLinea);
    
    for (i = 0; i < productsLocalStorage.length; i++) {
        const product = productsLocalStorage[i]
        
        products.push(product.id)

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

    //Variable pour stoker le total des article et des prix
    let addTotalPrice = 0
    let addTotalQuantity = 0

    for (i = 0 ; i < productsLocalStorage.length; i++) {

        const priceProduct = dataApi[i].price * productsLocalStorage[i].n

        //Incremente les totaux
        addTotalPrice += priceProduct
        addTotalQuantity += productsLocalStorage[i].n

        const articleItem = `
                <article class="cart__item" data-id="${productsLocalStorage[i]._id}" data-color="${productsLocalStorage[i].color}">
                    <div class="cart__item__img">
                        <img src="${dataApi[i].imageUrl}" alt="${dataApi[i].description}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${dataApi[i].name}</h2>
                            <p>${productsLocalStorage[i].color}</p>
                            <p>${priceProduct},00 €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsLocalStorage[i].n}">
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
    totalQuatity.textContent = addTotalQuantity

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

            products[positionChild].n = newQuantity

            let productsLinea = JSON.stringify(products)
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
            console.log(event)

            //event.target.parent
            //dataset

            

            const articleProduct = event.path[4] //Cause du bug?

            const positionChild = Array.prototype.indexOf.call(sectionArticle.children, articleProduct)

            products.splice(positionChild, 1)

            sectionArticle.remove(articleProduct)
            
            let productsLinea = JSON.stringify(productsLocalStorage)
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



// -_-_-_-_-_- Formulaire -_-_-_-_-_- \\


//Envoi les données du formulaire a l'API
async function post(dataForm) {
    
    let data = {}
    data.products = products
    data.contact = dataForm

    const res = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const dataRes = res.json()
    return dataRes 
}


const form = document.querySelector(".cart__order__form")
const formFields = document.querySelectorAll(".cart__order__form__question")

form.addEventListener("submit", function (event) {
    event.preventDefault()

    let contact = {}

    for (i = 0; i < formFields.length; i++) {
        
        const nameField = formFields[i].querySelector("label").control.id
        const valueField = formFields[i].querySelector("input").value
        
        contact[nameField] = valueField   
    }

    async function postAndGoConfiramation() {
        let resPost = await post(contact)
        console.log(resPost.orderId)
        document.location.href = `./confirmation.html?orderId=${resPost.orderId}`;
    }

    postAndGoConfiramation()
})