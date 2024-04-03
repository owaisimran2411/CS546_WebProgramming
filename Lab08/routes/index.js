//Here you will import route files and export them as used in previous labs
import movieRoute from './movies.js'

import path from 'path'
import {static as staticDir} from 'express'

const constructorMethods = (app) => {
    app.use('/', movieRoute)
}

export default constructorMethods