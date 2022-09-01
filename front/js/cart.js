const cartItems = document.querySelector("#cart__items")   



const afficherPanier = () => {

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
        
            const articleItem = `
                <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                    <div class="cart__item__img">
                        <img src="${data.imageUrl}" alt="${data.description}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${data.name}</h2>
                            <p>${product.color}</p>
                            <p>${data.price}</p>
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
            
            if (i = productsJson.length - 1) {
                cartItems.innerHTML =  template 
            }
        })
    } 
}

afficherPanier().then()


const numberProduct = document.querySelector("#itemQuantity")
numberProduct.addEventListener("intup", editQuantity())

const editQuantity = () => {

    console.log("editQuantity")    


}