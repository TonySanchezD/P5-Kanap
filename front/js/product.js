const getProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products")
    const data = await res.json()
    return data
};

const params = window.location.search

getProducts().then(data => {
    for (i = 0; i < data.length; i++) {
        if (params == "?id=" + data[i]._id){
            document.querySelector("section.item img").src = data[i].imageUrl
            document.querySelector("section.item h1").textContent = data[i].name
            document.querySelector("section.item span#price").textContent = data[i].price
            document.querySelector("section.item p#description").textContent = data[i].description
            for (c = 0; c < data[i].colors.length; c++) {
                const dupOption = document.querySelector("section.item option").cloneNode(true)
                const optionColor = document.querySelector("select#colors").appendChild(dupOption)
                optionColor.value = data[i].colors[c]
                optionColor.textContent = data[i].colors[c]
            }
        }
    }
})
