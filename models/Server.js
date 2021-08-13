const express = require('express')
const cors = require('cors')

const db = require( '../db/connection' )  


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            main: '/'
        }
        

        // db Connection
        this.connectionDB()
        // Global middleweres
        this.middleweres()
        // Routes

        this.routes()

    }

    async connectionDB() {
        try {
            await db.authenticate()
            // await setRelations()
            console.log("Database connection has been established successfully.")
        
        } catch (error) {
            console.error("Unable to connect to the database:", error)
        }
    }

    middleweres() {
        this.app.use( cors() )
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }


    routes() {
        // Content
        this.app.use( this.paths.main , require('../routes/main') )
        // API
        this.app.use('/api/products', require('../routes/api/products'))
        this.app.use('/api/search', require('../routes/api/search'))
        // 404 handle error
        // this.app.get( '*', (req, res) => {
        //     res.sendFile( path.join(__dirname, '../public/index.html') )
        // })

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log(`Server started on port ${ this.port }`)
        })
    }
}

module.exports = { Server }