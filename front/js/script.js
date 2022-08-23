const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products")
    const data = await res.json()
    return data
};

const sectionItems = document.querySelector("#items");

getProducts().then(data => {

    let template = ''

    for (i = 0; i < data.length; i++) {

        const product = data[i]

        const articleItem =  `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>` ;

          template += articleItem
    }
    
    sectionItems.innerHTML = template
});