const productImg = document.querySelector("img");
const productName = document.querySelector(".productName");
const productDescription = document.querySelector(".productDescription");


const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products")
    const data = await res.json()
    return data
};

getProducts().then(data => {
    productName.textContent = data[0].name
})

/*const insertProducts = () => {
    getProducts() 
};

insertProducts()*/

/* 1
const getProducts = () => {
    fetch("http://localhost:3000/api/products")
        .then(res => res.json())
        .then(data => data)
        .catch(e => console.log(e))
};


const insertProducts = async () => {
    getProducts()
    .then(productName.textContent = data[0].nom)
};

insertProducts()
*/