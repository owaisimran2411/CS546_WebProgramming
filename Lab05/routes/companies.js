//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getComapnies() function in the /data/data.js file 3 to return the list of comapnies and call it in the /companies route.  You can also import your getComapny(id) function and call it in the :/id route.

import { Router } from 'express';
import {
    getCompanies,
    getCompanyById
} from './../data/data.js'

const router = Router();

router
    .route('/')
    .get(async (req, res) => {
        const data = await getCompanies()
        res.json(data)
    })
// Implement GET Request Method and send a JSON response See lecture code!

router
    .route('/:id')
    .get(async (req, res) => {
        const data = await getCompanyById(req.params.id)
        if(data.length > 0) {
            res.json(data[0])
        } else {
            res.status(404).json({error: "Company Not Found"})
        }
    })
//Implement GET Request Method and send a JSON response See lecture code!

export default router;
