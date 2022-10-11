//Affichage de la page produit
const urlParams = new URLSearchParams(window.location.search);
const idProduct = urlParams.get('id');

const getProduct = async () => {
    const response = await fetch("http://localhost:3000/api/products/" + idProduct)
    if (response.ok){
        const data = await response.json()
        return data
    } else {
        alert(`Erreur ${response.status}.
        Veuillez revenir plus tard`)
    }
};


const titrePage = document.querySelector("head title");

const item__img = document.querySelector("div.item__img");
const img = document.createElement("img");
const imgInser = item__img.appendChild(img);

const nameProduct = document.querySelector("h1#title");

const priceProduct = document.querySelector("span#price");

const descriptionProduct = document.querySelector("p#description");

const selectColor = document.querySelector("select#colors");
const option = document.querySelector("select#colors option");

getProduct().then(data => {

    titrePage.textContent = data.name + " - " + data.description

    img.src = data.imageUrl
    img.alt = data.altTxt

    nameProduct.textContent = data.name

    priceProduct.textContent = data.price

    descriptionProduct.textContent = data.description

    for(i = 0; i < data.colors.length; i++) {

        const cloneOption = option.cloneNode(true)
        const nouvelleColor = selectColor.appendChild(cloneOption)

        nouvelleColor.value = data.colors[i]
        nouvelleColor.textContent = data.colors[i]

    }
});


//Ajouter un article au panier
const quantityInput = document.querySelector("#quantity");

const settingColor = document.querySelector("div.item__content__settings__color")
const settingQuantity = document.querySelector("div.item__content__settings__quantity ")

const nonRemplie = (element) => {
    element.style.backgroundColor = "red"
    element.style.borderRadius = "20px"
}
const remplie = (element => {
    element.style.backgroundColor = ""
})

const ajoutPanier = () => {
    getProduct().then(data => {

        const quantity = parseInt(quantityInput.value)  
         
        let productsLinea = localStorage.getItem("products");
        let productsJson = JSON.parse(productsLinea);

        if (quantity != 0 && selectColor.value != "" ) {

            remplie(settingColor);
            remplie(settingQuantity);

            // Si localStorage est vide créé un tabeau 
            if (productsJson == null) {
                productsJson = [{
                    id : data._id,
                    color : selectColor.value,
                    n : quantity
                }]

            // Sinon on ajoute le produit au tableau  
            } else {

                // Si produit déjà dans tableau on implémente
                const produitDejaDansPanier = productsJson.find(product => product.id == data._id) && 
                                                productsJson.find(product => product.color == selectColor.value)
                if  (produitDejaDansPanier) {  

                      produitDejaDansPanier.n += quantity
                      
                // Sinon on ajoute le produit au tableau      
                } else {
                    productsJson.push({
                        id : data._id,
                        color : selectColor.value,
                        n : quantity
                    })
                } 
            }
            let productsLinea = JSON.stringify(productsJson)
            localStorage.setItem("products", productsLinea)    
        } else {

            if ( selectColor.value == "" && quantity != 0 ) {

                nonRemplie(settingColor)
                remplie(settingQuantity)
                alert(`Veuillez sectionner une couleur`)

            } else if ( quantity == 0 && selectColor.value != "") { 

                nonRemplie(settingQuantity)
                remplie(settingColor)
                alert(`Veuillez sectionner une quantitée`)

            } else {

                nonRemplie(settingColor)
                nonRemplie(settingQuantity)
                alert(`Veuillez sectionner une couleur et une quantitée`)

            }
        }
        console.log(productsJson)
    })
};

const clickAjoutPanier = document.querySelector("button#addToCart");
clickAjoutPanier.addEventListener("click", ajoutPanier);


