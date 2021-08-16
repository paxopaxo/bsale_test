const width = screen.availWidth
const mainURL = location.origin 

// Defining Params
const urlSearchParams = new URLSearchParams(window.location.search)
let params = Object.fromEntries(urlSearchParams.entries())

params.page = Number(params.page)

// References
const catsID = [2,3,6,7,4,1,5]

const form = document.querySelector('.header-main')
const iconDrop = document.querySelector('.header-main .dropIcon')
const iconMagnify = document.querySelector('.header-main .searchIcon')
const inputText = document.querySelector('.header-main input')

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

    if( !location.search  || !params.search_query ) {
        location.replace( mainURL )
        return true
    }
    if(  Number.isNaN(params.page) || params.page < 0 ) {
        location.replace(`${ mainURL }/results?search_query=${ params.search_query }&page=0`)
        return true
    }
    return false
}

const init = async() => {

    const URL = `${mainURL}/api/search/products/${ params.search_query }?from=${ params.page*10 }`
    const response = await makePettition( URL )
    const { product } = await response.json()
 
    if( response.ok ) {

        if( product.length === 0 ) {
            const h2 = document.createElement('h2')
            h2.innerText = 'No se han encontrado coincidencias...'
            products.appendChild(h2)
        }

        const fragment = document.createDocumentFragment()
        product.forEach( ({ name, url_image, price, discount }) => {
            const div = document.createElement('DIV')
            const img = document.createElement('IMG')
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
    location.replace(`${ mainURL }/404`)
    throw new Error('Exit')

}


const redirectionBoolean = redirection()

if(width < 992 && !redirectionBoolean) { 
    categories.style.display = 'none' 

    init()
    .then( response => {
        if( response.length === 10 ) {
            nextPageBtn.addEventListener('click', () => {
                window.location.replace(`${ mainURL }/results?search_query=${ params.search_query }&page=${ params.page + 1 }`)
            })
        }
    })
    .catch( () => {} )


    if( 0 < params.page ) {
        previousPageBtn.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/results?search_query=${ params.search_query }&page=${ params.page - 1 }`)
        })
    }
 
    iconDrop.addEventListener('touchend', () => {
        if( categories.style.display === 'none') {
            categories.classList.add( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'block'
        } else {
            categories.classList.remove( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'none'
        }
    })
}
else if( width >= 992 && !redirectionBoolean ) {
    
    init()
    .then( response => {
        if( response.length === 10 ) {
            nextPageBtn.addEventListener('click', () => {
                window.location.replace(`${ mainURL }/results?search_query=${ params.search_query }&page=${ params.page + 1 }`)
            })
        } 
    })
    if( 0 < params.page ) {
        previousPageBtn.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/results?search_query=${ params.search_query }&page=${ params.page - 1 }`)
        })
    }
}

document.querySelector('.header-main h1').addEventListener('click',() => {
    location.replace( mainURL )
})

allItemsCategory.forEach( (cat, i) => {
    cat.addEventListener('click', () => {
        window.location.replace(`${ mainURL }/cats?cat=${ catsID[i] }&page=0`)
    })
})

form.addEventListener('submit', e => {
    e.preventDefault()
    if( inputText.value !== '' ) {
        location.replace( `${ mainURL }/results?search_query=${ inputText.value }&page=0`)
    }
})
