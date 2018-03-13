const container = document.getElementById('container');
window.addEventListener('load', () => {
    getJson();
})


getJson = (e) => {
    fetch(`https://api.mercadolibre.com/sites/MLM/search?q=ecologico`)
        .then(response => {
            response.json().then(json => {
                fetch('https://api.mercadolibre.com/sites/MLM/search?q=sustentable').then(response => {
                    response.json().then(Json => {
                        paintDataJson(json, Json)
                    })
                })
            })
        })
        .catch(error => {
            console.log(error);
        });
}

paintDataJson = (json, Json) => {
    const products = json.results.concat(Json.results);    

    products.forEach(element => {    
            let output = `
                <div class="col-md-3 mb-3">
                    <div class="boxInner">
                        <div class="image">
                            <img src="${element.thumbnail}" alt="${element.title}">
                        </div>
                        <div class="text elements-data">${element.title}</div>
                        <div class="price">$${element.price} mxn</div> 
                        <a href="#modal" data-toggle="modal" class="elements-data" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}"> 
                            <img id="eye" src="assets/images/eye.png" class="elements-data border border-info rounded-circle p-1 mb-1" data-price="${element.price}" data-title="${element.title}" data-img="${element.thumbnail}" data-id="${element.id}" data-rating="${element.reviews.rating_average}" data-state="${element.address.state_name}">                    
                        </a>
                        <div class="buttonShop">Comprar</div>                   
                </div>
            `   
            container.insertAdjacentHTML('beforeend', output);        
    })
    let elementsData = document.getElementsByClassName('elements-data');
    elementEvent(elementsData);
}

elementEvent = (elementsData) => {
    let elementsEvents = Array.from(elementsData);
    elementsEvents.forEach(button => {
        button.addEventListener('click', getInfo);
    })
}

getInfo = (e) => {
    e.preventDefault();
    const dataSet = e.target.dataset;

    fetch(`https://api.mercadolibre.com//items/${e.target.dataset.id}/description`).then(response => {
        response.json().then(json => {
            const description = json.plain_text;
            paintInfoModal(dataSet, description);
        })
    })
}

paintInfoModal = (dataSet, description) => {
    const containerImg = document.getElementById('image');
    const titleStars = document.getElementById('description-modal');
    const modalBody = document.getElementById('modal-body');

    containerImg.innerHTML = `<img src="${dataSet.img}" alt="${dataSet.title}">`;

    titleStars.innerHTML = `
                        <h5 class="modal-title">${dataSet.title}</h5>
                        <div class="stars">${dataSet.rating}
                            <i class="fas fa-star"></i>                           
                        </div>         
    `;

    modalBody.innerHTML = `
                        <p>Lugar de origen: ${dataSet.state}</p>
                        <p>${description}</p>
                        <div class="priceProduct">$ ${dataSet.price} mxn</div>
    `;
}