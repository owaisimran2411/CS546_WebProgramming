/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.

*/

import * as products from "./data/products.js";

import {
    dbConnection,
    closeConnection
} from "./config/mongoConnection.js"


let main = async () => {
    const db = await dbConnection();
    
    let product1 = undefined
    let product2 = undefined
    let product3 = undefined
    try {
        /*
            * Product 1 insertion
            * Expected Result: Successful insertion
        */
        product1 = await products.create(
            "Macbook Pro 13 inch M1 - 8GB RAM 256GB SSD",
            `Irure ipsum non irure in consectetur qui. Qui dolore eiusmod reprehenderit enim cupidatat quis duis quis esse laboris. Duis cillum velit Lorem occaecat est do. Laboris laboris anim laborum ullamco pariatur ullamco commodo tempor proident consectetur ut. Nisi esse excepteur consequat elit aliquip aliqua aute laborum eu laborum labore qui sint. Anim duis et ullamco sunt labore laboris dolore ex reprehenderit enim. Veniam non amet pariatur culpa pariatur. Exercitation non culpa aliqua ut eu laboris in. Deserunt esse mollit est et quis aliqua aliqua proident elit velit adipisicing commodo est reprehenderit. Nisi id sit aliqua ex.`,
            'Moasd123LA',
            1299,
            "Apple",
            "http://www.apple.com",
            ['Laptop', 'Personal Computer', 'Personal Device'],
            ['Laptop', 'Computer'],
            '11/12/2021',
            false
        )
        console.log("Creating New Product 1: Expected to Pass")
        console.log(product1);
    } catch (e) {
        console.error(e);
    }
    
    try {
        console.log("Fetching Product 1 Data: Expected to Pass")
        console.log(await products.get(product1._id))
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Creating New Product 2: Expected to Pass")
        product2 = await products.create(
            "iPhone Metal Steel Case",
            `Do cillum aliqua culpa eu Lorem mollit. Officia veniam nisi velit officia adipisicing nisi laboris. Id ad veniam laboris est. Anim minim sit excepteur irure est irure pariatur et consequat. Nisi culpa veniam minim velit officia. Anim velit qui nisi ad cupidatat esse.`,
            "SomeRandomModelNumber",
            12.1,
            "Spygen",
            "http://www.spygen.com",
            ["Mobile Case", "Cover", "Jelly Cover"],
            ["Cellphone Accessories", "Cellphone Equipment"],
            "11/11/2019",
            true
        )
        
        console.log(product2);
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Fetching All products: Expected to Pass by returning Product1 and Product2")
        console.log(await products.getAll());
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Creating New Product 3: Expected to Pass")
        product3 = await products.create(
            'Water Bottle 790mL',
            `In sint veniam excepteur eiusmod anim esse deserunt excepteur Lorem tempor quis ipsum anim ut. Incididunt ad sint incididunt reprehenderit. Id tempor consequat amet laboris ipsum dolor non deserunt. Occaecat ullamco ea consectetur duis officia quis eu eiusmod irure nisi veniam. Consequat sint eu ut nisi amet dolore ut. Ea nisi anim pariatur non fugiat voluptate excepteur esse anim consectetur pariatur quis.`,
            "MSAd3L",
            23.5,
            "Erzen",
            "http://www.erzencompany.com",
            ["Water Bottle", "Bottle", "Water"],
            ["Bottles", "Personal Use"],
            "1/19/2023",
            false
        )
        console.log(product3);
    } catch (e) {
        console.error(e);
    } 

    try {
        console.log("Fetching New Product 3 Data: Expected to Pass")
        console.log(await products.get(product3._id));
    } catch (e) {
        console.error(e);
    }

    try {
        product3 = await products.rename(product3._id, "Water Bottle 790mL updated")
        console.log("Updaing Product 3 Name: Expected to Pass")
        console.log(product3);
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Removing Product 2: Expected to Pass")
        console.log(await products.remove(product2._id));
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Fetching All products: Expected to Pass by returning Product1 and Product3")
        console.log(await products.getAll());
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Creating a new product: Expected to Fail (Invalid Date)")
        const product4 = await products.create(
            'Water Bottle 790mL',
            `In sint veniam excepteur eiusmod anim esse deserunt excepteur Lorem tempor quis ipsum anim ut. Incididunt ad sint incididunt reprehenderit. Id tempor consequat amet laboris ipsum dolor non deserunt. Occaecat ullamco ea consectetur duis officia quis eu eiusmod irure nisi veniam. Consequat sint eu ut nisi amet dolore ut. Ea nisi anim pariatur non fugiat voluptate excepteur esse anim consectetur pariatur quis.`,
            "MSAd3L",
            23.5,
            "Erzen",
            "http://www.erzencompany.com",
            ["Water Bottle", "Bottle", "Water"],
            ["Bottles", "Personal Use"],
            "13/19/2023",
            false
        )
        
        console.log(product4);
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Removing a non existing product: Expected to Fail")
        console.log(await products.remove("65d819dc135365d1c3721e05"));
    } catch (e) {
        console.error(e);
    }

    try {
        
        console.log("Renaming a product which does not exist: Expected to Fail")
        const dummyProduct = await products.rename("65d819dc135365d1c3721e05", "new name");
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Product Current and Existing Name are same: Expected to Fail")
        product3 = await products.rename(product3._id, product3.productName)
        console.log(product3);
    } catch (e) {
        console.error(e);
    }

    try {
        console.log("Fetching a product which does not exist: Expected to Fail")
        console.log(await products.get("65d819dc135365d1c3721e05"));
    } catch (e) {
        console.error(e);
    }

    await closeConnection()
}

main()