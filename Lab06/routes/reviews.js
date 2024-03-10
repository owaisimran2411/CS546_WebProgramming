// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from 'express';

const router = Router()

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
  })
  .patch(async (req, res) => {
    //code for PATCH
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });

export default router