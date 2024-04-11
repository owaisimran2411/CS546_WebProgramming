//Here you will require route files and export them as used in previous labs.
import textDecodeRoutes from './textdecoder.js'



const constructorMethods = (app) => {
    app.use('/', textDecodeRoutes)
    app.use('*', (req, res) => {
        res.redirect('/')
    })
}

export default constructorMethods