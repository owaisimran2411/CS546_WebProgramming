//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js

import peopleRouter from './people.js'
import companyRouter from './companies.js'

const configurationMethod = (app) => {
    app.use('/people', peopleRouter)
    app.use('/companies', companyRouter)

    app.use('*', (req, res) => {
        return res.status(404).json({error: 'Not Found'})
    })
}

export default configurationMethod