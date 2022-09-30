//Récupere le numéro de commande
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

//Afficher le numéro de commande à l'utilisateur
const showOrderId = document.querySelector("#orderId")
showOrderId.textContent = orderId