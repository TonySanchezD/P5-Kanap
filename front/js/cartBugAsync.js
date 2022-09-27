const cartItems = document.querySelector("#cart__items")  
const cartPrice = document.querySelector(".cart__price") 
const addSection = document.createElement("section")
cartItems.insertBefore(addSection, cartPrice)
const sectionArticle = document.querySelector("#cart__items section")

let allPrice = []

const hasCart = () => {

    let productsLinea = localStorage.getItem("products");
    let productsJson = JSON.parse(productsLinea);

    let template = ""

    for (i = 0; i < productsJson.length; i++) {

        const product = productsJson[i]

        const getProduct = async () => {
            const res = await fetch("http://localhost:3000/api/products/" + product.id)
            const data = await res.json()
            return data
        }

        getProduct().then(data => { 

            const priceProduct = data.price * product.n

            const articleItem = `
                <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                    <div class="cart__item__img">
                        <img src="${data.imageUrl}" alt="${data.description}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${data.name}</h2>
                            <p>${product.color}</p>
                            <p>${priceProduct}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.n}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`

            template += articleItem

            sectionArticle.innerHTML =  template 

            //const inputValue = documentQuerySelector(".itemQuantity").value

            allPrice.push(priceProduct)
            
            addProduct()
            addPrice()

            console.log("i dans .then", i)
        })

        console.log("i", i)
    }

    console.log(sectionArticle.childElementCount, productsJson.length)
    if (sectionArticle.childElementCount === productsJson.length) {
        // Modification quantity
            const allQuantity = document.querySelectorAll(".itemQuantity")
            for (quantity of allQuantity) {
                quantity.addEventListener("change", changeQuanttity)
            }
            console.log(sectionArticle.childElementCount)
            console.log(productsJson.length)
    }
}

const addProduct = () => {
    const totalQuantity = document.querySelector("#totalQuantity")
    totalQuantity.textContent = allPrice.length
}

const addPrice =  () => {
    const totalPrice = document.querySelector("#totalPrice")

    let price = 0
    
    for (i = 0; i < allPrice.length; i++) {
        price += allPrice[i]
    }

    totalPrice.textContent = price
}


hasCart()