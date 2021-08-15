const width = screen.availWidth
const mainURL = location.origin 

const urlSearchParams = new URLSearchParams(window.location.search)
let params = Object.fromEntries(urlSearchParams.entries())

params.page = Number(params.page) 
console.log(Object.entries(params.page).length === 0)
// Solucionar que 0 evalua en falso y eso provoca un bucle infinito...
if( Object.entries( params.page ).length === 0 ) {
    location.replace(`${ mainURL }/?page=${ 0 }`)
}

console.log(params.page)


const icon = document.querySelector('.header-main svg')
const categories = document.querySelector('.header-categories')
const allItemsCategory = document.querySelectorAll('.header-categorias div')
const products = document.querySelector('.products')

const previousPageBtn = document.querySelector('.footer button:nth-child(1)')
const nextPageBtn = document.querySelector('.footer button:nth-child(2)')

  
const makePettition = (url, data, method = 'GET') => {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Connection':'keep-alive'
        },
        body: JSON.stringify(data)
    }) 
}

const init = async() => {
    const URL = `${mainURL}/api/products/discount?from=${ params.page*10 }`
    const response = await makePettition( URL )
    const { product } = await response.json()

    if( response.ok ) {
        const fragment = document.createDocumentFragment()
        product.forEach( ({ name, url_image, price, discount }) => {
            const div = document.createElement('DIV')
            const img = document.createElement('IMG')
            img.src = url_image
            const p = document.createElement('P')
            p.innerHTML = name 
            const p2 = document.createElement('p') 
            p2.innerHTML = price + ' $'
            const p3 = document.createElement('p') 
            p3.innerHTML = discount + '% OFF'
            div.appendChild(img)
            div.appendChild(p)
            div.appendChild(p2)
            div.appendChild(p3)
            fragment.appendChild(div) 
        })
        products.appendChild(fragment)
        
    }

}


if(width < 576) { 
    categories.style.display = 'none' 
    init() 
 
    icon.addEventListener('touchend', () => {
        if( categories.style.display === 'none') {
            categories.classList.add( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'block'
        } else {
            categories.classList.remove( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'none'
        }
    }) 
}
else if( 992 > width > 576) { 

    categories.style.display = 'none'

    init()
 
    icon.addEventListener('touchend', () => {
        if( categories.style.display === 'none') {
            categories.classList.add( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'block'
        } else {
            categories.classList.remove( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'none'
        }
    }) 

}
else {
    
    init()
    nextPageBtn.addEventListener('click', () => {
        window.location.replace(`${ mainURL }/?page=${ params.page + 1 }`)
    })
    previousPageBtn.addEventListener('click', () => {
        window.location.replace(`${ mainURL }/?page=${ params.page - 1 }`)
    })

}