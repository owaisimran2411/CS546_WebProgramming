//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.
import {
    getPeople,
    getPersonById
} from './../data/data.js'

import { Router } from 'express';

const router = Router();

router
    .route('/')
    .get(async (req, res) => {
        const data = await getPeople()
        res.json(data)
    })
// Implement GET Request Method and send a JSON response  See lecture code!

router
    .route('/:id')
    .get(async (req, res) => {
        const data = await getPersonById(req.params.id)
        if(data.length > 0) {
            res.json(data[0])
        } else {
            res.status(404).json({error: "Person Not Found"})
        }
    })
// Implement GET Request Method and send a JSON response See lecture code!

export default router;
