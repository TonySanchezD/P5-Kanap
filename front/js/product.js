const urlParams = new URLSearchParams(window.location.search);
const idProduct = urlParams.get('id');

const getProduct = async () => {
    const res = await fetch("http://localhost:3000/api/products/" + idProduct)
    const data = await res.json()
    return data 
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


const quantity = document.querySelector("input#quantity");

const ajoutPanier = () => {
    getProduct().then(data => {

        let productsLinea = localStorage.getItem("products");
        let productsJson = JSON.parse(productsLinea);
        console.log("haut")
        console.log(productsJson)

        if (quantity.value != 0 && selectColor.value != "" ) {
            if (productsJson == null) {
                productsJson = [{
                    id : data._id,
                    color : selectColor.value,
                    n : quantity.value
                }]
            } else {
                productsJson.push({
                id : data._id,
                color : selectColor.value,
                n : quantity.value
                })
            }
            let productsLinea = JSON.stringify(productsJson)
            localStorage.setItem("products", productsLinea)    
        } else {

        }
        console.log("bas")
        console.log(productsJson)
    })
};

const clickAjoutPanier = document.querySelector("button#addToCart");
clickAjoutPanier.addEventListener("click", ajoutPanier);




/* test
let test = [
    {
        id : 6542,
        color : "red",
        n : 1  
    },
    {
        id : 6434,
        color : "blue",
        n : 1
    }           
]

test.push({
    id : 1,
    color : "vert",
    n : 23
})

console.log("test") */