const width = screen.availWidth
const mainURL = location.origin 

// Defining Params
const urlSearchParams = new URLSearchParams(window.location.search)
let params = Object.fromEntries(urlSearchParams.entries())

params.page = Number(params.page)

// References
const catsID = [2,3,6,7,4,1,5]

const icon = document.querySelector('.header-main svg')
const categories = document.querySelector('.header-categories')
const allItemsCategory = document.querySelectorAll('.header-categories li')
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

// Redirections
const redirection = () => {
    if( location.search === '' || params.page < 0 || Number.isNaN(params.page) ) {
        location.replace(`${ mainURL }/?page=${ 0 }`)
        return true
    }
    return false
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
            // Resolver error cuando url_image = null
            img.src = url_image || 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg'
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
        return product
    } 
    window.location.replace(`${ mainURL }/404`)

}

document.querySelector('.header-main h1').addEventListener('click',() => {
    location.replace( mainURL )
})

if(width < 992 && !redirection()) { 
    categories.style.display = 'none' 

    init()
    .then( response => {
        if( response.length === 10 ) {
            nextPageBtn.addEventListener('click', () => {
                window.location.replace(`${ mainURL }/?page=${ params.page + 1 }`)
            })
        } 
    })

    if( 0 < params.page ) {
        previousPageBtn.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/?page=${ params.page - 1 }`)
        })
    }
 
    icon.addEventListener('touchend', () => {
        if( categories.style.display === 'none') {
            categories.classList.add( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'block'
        } else {
            categories.classList.remove( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'none'
        }
    })

    allItemsCategory.forEach( (cat, i) => {
        cat.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/cats?cat=${ catsID[i] }&page=0`)
        })
    })
}
else if( width >= 992 && !redirection() ) {
    
    init()
    .then( response => {
        if( response.length === 10 ) {
            nextPageBtn.addEventListener('click', () => {
                window.location.replace(`${ mainURL }/?page=${ params.page + 1 }`)
            })
        } 
    })
    if( 0 < params.page ) {
        previousPageBtn.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/?page=${ params.page - 1 }`)
        })
    }

    allItemsCategory.forEach( (cat, i) => {
        cat.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/cats?cat=${ catsID[i] }&page=0`)
        })
    })

}