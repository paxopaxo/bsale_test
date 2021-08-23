const width = screen.availWidth
const mainURL = location.origin 

// Defining Params
const urlSearchParams = new URLSearchParams(window.location.search)
let params = Object.fromEntries(urlSearchParams.entries())

params.page = Number(params.page)


const form = document.querySelector('.header-main')
const iconDrop = document.querySelector('.header-main .dropIcon')
const iconMagnify = document.querySelector('.header-main .searchIcon')
const inputText = document.querySelector('.header-main input')

const categories = document.querySelector('.header-categories')
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

// Function that checks if params given on link are correct, otherwise it will redirect to another page 
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
// Function used to solicit data from server and make an initial render
const init = async() => {

    const [catResponse, response ] = await Promise.all([
        makePettition( `${ mainURL }/api/categories` ),
        makePettition( `${mainURL}/api/search/products/${ params.search_query }?from=${ params.page*10 }` )
    ])
    const [jsonCatResponse, { product }] = await Promise.all([
        catResponse.json(),
        response.json()
    ])

    if( catResponse.ok ) {
        const fragment = document.createDocumentFragment()
        jsonCatResponse.forEach( ( catName ) => {
            const li = document.createElement('LI')
            li.innerHTML = catName
            fragment.appendChild(li)
        })
        categories.appendChild(fragment)

        document.querySelectorAll('.header-categories li').forEach( (cat) => {
            cat.addEventListener('click', () => {
                window.location.replace(`${ mainURL }/cats?cat=${ cat.innerHTML }&page=0`)
            })
        })
    } else {
        location.replace(`${ mainURL }/404`)
        throw new Error('Exit')
    }

    if( response.ok ) {

        if( product.length === 0 ) {
            const h2 = document.createElement('h2')
            h2.innerText = 'No se han encontrado coincidencias...'
            products.appendChild(h2)
        } else {
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
                p3.innerHTML = discount ? discount + '% OFF' : ''
                div.appendChild(img)
                div.appendChild(p)
                div.appendChild(p2)
                div.appendChild(p3)
                fragment.appendChild(div) 
            })
            products.appendChild(fragment)
        }

        return product
    }
    location.replace(`${ mainURL }/404`)
    throw new Error('Exit')

}


const redirectionBoolean = redirection()

if(width < 992 && !redirectionBoolean) { 
    // Show categories button
    iconDrop.addEventListener('touchend', () => {
        if( categories.style.display === 'none' || categories.style.display === '' ) {
            categories.classList.add( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'block'
        } else {
            categories.classList.remove( 'animate__animated','animate__slideInDown' )
            categories.style.display = 'none'
        }
    })
}
// else if( width >= 992 && !redirectionBoolean ) {
// }

if( !redirectionBoolean ) {
    
    init()
    .then( response => {
        if( response.length === 10 ) {
            nextPageBtn.style.display = 'block'
            nextPageBtn.addEventListener('click', () => {
                window.location.replace(`${ mainURL }/results?search_query=${ params.search_query }&page=${ params.page + 1 }`)
            })
        }
    })
    .catch( () => {} )

    if( 0 < params.page ) {
        previousPageBtn.style.display = 'block'
        previousPageBtn.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/results?search_query=${ params.search_query }&page=${ params.page - 1 }`)
        })
    }
    
    // Search 
    form.addEventListener('submit', e => {
        e.preventDefault()
        if( inputText.value !== '' ) {
            location.replace( `${ mainURL }/results?search_query=${ inputText.value }&page=0`)
        }
    })
    
    // Go to main page
    document.querySelector('.header-main h1').addEventListener('click',() => {
        location.replace( mainURL )
    })
}


