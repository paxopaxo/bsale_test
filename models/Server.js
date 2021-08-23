const express = require('express')
const cors = require('cors')
const path = require('path')

const db = require( '../db/connection' )  

 
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            main: '/'
        }
        this.apiPaths = {
            products: '/api/products',
            search: '/api/search',
            categories: '/api/categories'
        }

        // db Connection
        this.connectionDB() 
        // Global middleweres
        this.middlewares()

        // Routes
        this.routes()

    }

    async connectionDB() { 
        try {
            await db.authenticate()
            console.log("Database connection has been established successfully.")
        
        } catch (error) {
            console.error("Unable to connect to the database:", error)
        }
    }

    middlewares() {
        this.app.use( cors() )
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }


    routes() {
        // Content
        this.app.use( this.paths.main , require('../routes/main') )
        // API
        this.app.use( this.apiPaths.products , require('../routes/api/products'))
        this.app.use( this.apiPaths.search , require('../routes/api/search'))
        this.app.use( this.apiPaths.categories, require('../routes/api/categories'))
        // 404 handle error
        this.app.get( '*', (req, res) => {
            res.sendFile( path.join( __dirname, '../public/404.html') )
        })

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log(`Server started on port ${ this.port }`)
        })
    }
}

module.exports = { Server }