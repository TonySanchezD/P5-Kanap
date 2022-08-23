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