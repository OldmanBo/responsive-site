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

modalToggle();
productsToggle();