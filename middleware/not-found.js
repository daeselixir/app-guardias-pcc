//Middleware maneja las rutas que no existen
const notFoundMiddlware = (req, res) => {
    res.status(400).json({
        msg : 'Route not found!!'
    })
}

module.exports = notFoundMiddlware