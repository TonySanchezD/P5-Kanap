const articleAccueil = document.querySelector("section.items a");
const sectionItems = document.querySelector("#items");

const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products")
    const data = await res.json()
    return data
};


const urlProducts = "http://127.0.0.1:5500/front/html/product.html";
const url = new URL(urlProducts);


getProducts().then(data => {
    for (i = 0; i < data.length; i++) {
        const urlProduct = url.searchParams.get(data[i]._id)
        if (i == 0){
            document.querySelector(".productName").textContent = data[i].name
            document.querySelector(".productDescription").textContent = data[i].description
            document.querySelector("section.items img").src = data[i].imageUrl
            document.querySelector("section.items a").href = urlProducts + "?id=" + data[i]._id
            console.log(urlProduct)   
            
        } else {
            const dupArticle = articleAccueil.cloneNode(true);
            const articleItem = sectionItems.appendChild(dupArticle)
            articleItem.querySelector(".productName").textContent = data[i].name
            articleItem.querySelector(".productDescription").textContent = data[i].description
            articleItem.querySelector("section.items img").src = data[i].imageUrl
            articleItem.href = urlProducts + "?id=" + data[i]._id
        }
    }
});