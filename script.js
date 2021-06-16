// Old code that is still functional, the newly added code starts from the row 46

const products = document.querySelectorAll('.products p');
const subProducts = document.querySelectorAll('.products ul');
const arrow = document.createTextNode('arrow');



const productsToggle = function() {
    for(let i = 0; i < products.length; i++) {
        products[i].addEventListener('click', function() {
            if (subProducts[i].classList[0] === 'subInactive') {
                subProducts[i].style.display = 'block';
                products[i].style.backgroundColor = 'darkgrey';
                products[i].style.color = 'black';
                subProducts[i].classList.remove('subInactive');
            } else if (subProducts[i].style.display === 'block') {
                subProducts[i].style.display = 'none';
                products[i].style.backgroundColor = '';
                products[i].style.color = '';
                subProducts[i].classList.add('subInactive');
            }
        })
    }
}

const modal = document.querySelector('.newsletter_modal-container');
const modalForm = document.querySelector('.newsletter_form');
const modalBtn = document.querySelector('.modal_btn');

const modalToggle = function() {
    modalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    })
    window.addEventListener('click', function(e) {
        if(e.target ===  modal) {
            modal.style.display = 'none';
        }
    })
}



// Newly added code in order to make this poor website a little bit more presentable :D

// Shoping cart logic
let shopCart = [];

let itemToBePushedToCart = {};
let totalPrice = 0;
const totalPriceEl = document.querySelector('.shop_cart_total_price')
const shopBtn = document.querySelectorAll('.buy_now-btn');
const shopCartBtn = document.querySelector('.cart-btn');
const shopcartNumEl = document.querySelector('.cart_item_num')
const shopCartTable = document.querySelector('.shop_cart_modal-container table');
const shopCartModal = document.querySelector('.shop_cart_modal_overlay');
let itemsIndexArray = []

shopBtn.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const elements = e.target.offsetParent.parentElement.childNodes;
        itemToBePushedToCart = {};
        for(let i = 0; i < elements.length; i++) {
            if(elements[i].classList === undefined) {
                continue
            } else {
                if(elements[i].classList[0] === 'card_title') {
                    itemToBePushedToCart.name = elements[i].textContent
                } else if(elements[i].classList[0] === 'card_price') {
                    itemToBePushedToCart.price = elements[i].textContent.replaceAll('$', '')
                }
                let randomNum = Math.random();
                if(itemsIndexArray.includes(randomNum)) {
                    randomNum = Math.random()
                    itemsIndexArray.push(randomNum)
                    randomNum = randomNum.toString().replaceAll('.', '')
                    itemToBePushedToCart.index = randomNum
                } else {
                    randomNum = randomNum.toString().replaceAll('.', '')
                    itemToBePushedToCart.index = randomNum
                }
                
            }
        }
        shopCart.push(itemToBePushedToCart)


        // Toggle on/off the number of shopcart items bubble
        const itemsNum = shopCart.length
        shopcartNumEl.textContent = itemsNum
        if(itemsNum < 1) {
            shopcartNumEl.style.display = 'none'
        } else {
            shopcartNumEl.style.display = 'block'
        }

        // Create shopcart table
        const tableRow = document.createElement('tr')
        tableRow.classList.add('shopcart_table_row')
        tableRow.id = itemToBePushedToCart.index

        const tableItemNum = document.createElement('td')
        const tableItemName = document.createElement('td')
        const tableItemPrice = document.createElement('td')

        tableItemNum.textContent = shopCart.length + '.';
        tableItemNum.classList.add('item_ordinal_num')
        tableItemName.textContent = itemToBePushedToCart.name;
        tableItemPrice.textContent = itemToBePushedToCart.price;

        shopCartTable.appendChild(tableRow)
        tableRow.appendChild(tableItemNum)
        tableRow.appendChild(tableItemName)
        tableRow.appendChild(tableItemPrice)

        const itemPriceToNum = itemToBePushedToCart.price

        totalPrice = totalPrice + parseFloat(itemPriceToNum)
        totalPrice = Math.round(totalPrice * 100) / 100
        totalPriceEl.textContent = totalPrice

        // Remove product from the cart
        tableRow.addEventListener('click', e => {
            shopCart = shopCart.filter(cartItem => {
                return cartItem.index !== e.currentTarget.id
            })
            e.currentTarget.remove()

            totalPrice = totalPrice - parseFloat(e.currentTarget.lastChild.textContent)
            totalPrice = Math.round(totalPrice * 100) / 100
            totalPriceEl.textContent = totalPrice

            // Adjust ordinal number of the shopcart items
            const itemOrdinalNumberEl = document.querySelectorAll('.item_ordinal_num')
            itemOrdinalNumberEl.forEach((num, numIndex) => {
                num.textContent = numIndex + 1 + '.'
            })

            // Toggle on/off the number of shopcart items bubble
            const itemsNum = shopCart.length
            shopcartNumEl.textContent = itemsNum
            if(itemsNum < 1) {
                shopcartNumEl.style.display = 'none'
            } else {
                shopcartNumEl.style.display = 'block'
            }

            // Close the shopcart modal if the last item is removed
            if(shopCart.length < 1) {
                shopCartModal.style.display = 'none'
            }
        })
    })
})

// Toggle shop cart modal
document.querySelector('.shop_cart_modal_overlay').addEventListener('click', e => {
    // Close shopcart
    if(e.target === shopCartModal) {
        shopCartModal.style.display = 'none'
    }
})
shopCartBtn.addEventListener('click', () => {
    // Adjust ordinal number of the shopcart items
    const itemOrdinalNumberEl = document.querySelectorAll('.item_ordinal_num')
    itemOrdinalNumberEl.forEach((num, numIndex) => {
        num.textContent = numIndex + 1 + '.'
    })
    // Open shopcart
    shopCartModal.style.display = 'flex'
})



modalToggle();
productsToggle();