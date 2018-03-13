///agreagra al carrito 

function addToCart(eventBtn, productId) {

    if (eventBtn.classList.contains('clicked') == false) {
        increaseCounter();
        changeButtonStatus(eventBtn, false);

        let newArray = data.products.filter(function (element) {
            if (productId == element.id) {
                addcartProduct.push(element);
            }
        })
        console.log(addcartProduct);

    } else if (eventBtn.classList.contains('clicked') == true) {
        decreaseCounter()
        changeButtonStatus(eventBtn, true);
        removeFromCart(productId)
        console.log(addcartProduct);
    }

}

function removeFromCart(productId) {
    addcartProduct = addcartProduct.filter(function (element) {
        return element.id !== productId
        console.log(newArray);
    });

}
