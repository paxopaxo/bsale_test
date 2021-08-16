const width = screen.availWidth
const mainURL = location.origin 

// Defining params
const urlSearchParams = new URLSearchParams(window.location.search)
let params = Object.fromEntries(urlSearchParams.entries())

params.page = Number(params.page)
params.cat = Number(params.cat)

// References
const catsID = [2,3,6,7,4,1,5]

const form = document.querySelector('.header-main')
const iconDrop = document.querySelector('.header-main .dropIcon')
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

//Redirections function 
const redirection = () => {

    if( Number.isNaN(params.cat) || params.cat > 9 || params.cat < 0 ) {
        location.replace( mainURL )
        return true
    }
    
    if( location.search === '' ||  Number.isNaN(params.page) || params.page < 0 ) {
        location.replace(`${ mainURL }/cats?cat=${ params.cat }&page=${ 0 }`)
        return true
    }
    return false
}

const init = async() => {
    
    const URL = `${mainURL}/api/products/cat/${ params.cat }?from=${ params.page*10 }`
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
            p3.innerHTML = discount ? discount + '% OFF' : ''
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
 

document.querySelector('.header-main h1').addEventListener('click', () => {
    location.replace( mainURL )
})

if(width < 992 && !redirection() ) { 
    categories.style.display = 'none' 

    init()
    .then( response => {
        if( response.length === 10 ) {
            nextPageBtn.addEventListener('click', () => {
                window.location.replace(`${ mainURL }/cats?cat=${ params.cat }&page=${ params.page + 1 }`)
            })
        } 
    })
    .catch( () => {} )

    if( 0 < params.page ) {
        previousPageBtn.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/cats?cat=${ params.cat }&${ params.page - 1 }`)
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

    // allItemsCategory.forEach( (cat, i) => {
    //     cat.addEventListener('click', () => {
    //         window.location.replace(`${ mainURL }/cats?cat=${ catsID[i] }`)
    //     })
    // })
}
else if( width >= 992 && !redirection() ) {

    init()
    .then( response => {
        if( response.length === 10 ) {
            nextPageBtn.addEventListener('click', () => {
                window.location.replace(`${ mainURL }/cats?cat=${ params.cat }&page=${ params.page + 1 }`)
            })
        } 
    })
    .catch( () => {} )

    if( 0 < params.page ) {
        previousPageBtn.addEventListener('click', () => {
            window.location.replace(`${ mainURL }/cats?cat=${ params.cat }&page=${ params.page - 1 }`)
        })
    }

    
}

allItemsCategory.forEach( (cat, i) => {
    cat.addEventListener('click', () => {
        window.location.replace(`${ mainURL }/cats?cat=${ catsID[i] }&page=0`)
    })
})
form.addEventListener('submit', e => {
    e.preventDefault()
    console.log( inputText.value )
    if( inputText.value !== '' ) {
        location.replace( `${ mainURL }/results?search_query=${ inputText.value }&page=0`)
    }
})