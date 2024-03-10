import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import * as product from './../data/products.js';
import * as reviews from './../data/reviews.js';

const db = await dbConnection();
await db.dropDatabase();

const products = [
    {
      productName: "Sleek Smartwatch",
      productDescription: "Stay connected and track your fitness with this sleek smartwatch.",
      modelNumber: "SW-2024",
      price: 129.99,
      manufacturer: "TechGadgets Inc.",
      manufacturerWebsite: "http://www.techgadgets.com",
      keywords: ["smartwatch", "fitness tracker", "wearable"],
      categories: ["Electronics", "Wearable Tech"],
      dateReleased: "02/15/2023",
      discontinued: false
    },
    {
      productName: "Premium Wireless Headphones",
      productDescription: "Immerse yourself in superior sound quality with these premium wireless headphones.",
      modelNumber: "WH-789",
      price: 199.99,
      manufacturer: "SoundMasters Ltd.",
      manufacturerWebsite: "http://www.soundmasters.com",
      keywords: ["headphones", "wireless", "audio"],
      categories: ["Electronics", "Audio"],
      dateReleased: "07/20/2022",
      discontinued: false
    },
    {
      productName: "Ultra HD Smart TV",
      productDescription: "Experience stunning clarity and smart features with this Ultra HD Smart TV.",
      modelNumber: "TV-456",
      price: 899.99,
      manufacturer: "VisionTech Corp.",
      manufacturerWebsite: "http://www.visiontech.com",
      keywords: ["TV", "smart TV", "ultra HD"],
      categories: ["Electronics", "Home Entertainment"],
      dateReleased: "11/10/2023",
      discontinued: false
    },
    {
      productName: "Gaming Laptop",
      productDescription: "Dominate your opponents with this high-performance gaming laptop.",
      modelNumber: "GL-2024",
      price: 1499.99,
      manufacturer: "GameTech Inc.",
      manufacturerWebsite: "http://www.gametech.com",
      keywords: ["gaming", "laptop", "performance"],
      categories: ["Electronics", "Computers"],
      dateReleased: "04/05/2022",
      discontinued: false
    },
    {
      productName: "Digital Camera",
      productDescription: "Capture life's moments in stunning detail with this digital camera.",
      modelNumber: "DC-123",
      price: 499.99,
      manufacturer: "PhotoTech Ltd.",
      manufacturerWebsite: "http://www.phototech.com",
      keywords: ["camera", "digital", "photography"],
      categories: ["Electronics", "Photography"],
      dateReleased: "08/30/2023",
      discontinued: false
    },
    {
      productName: "Wireless Bluetooth Speaker",
      productDescription: "Enjoy your favorite music wirelessly with this portable Bluetooth speaker.",
      modelNumber: "SPK-789",
      price: 79.99,
      manufacturer: "SoundMasters Ltd.",
      manufacturerWebsite: "http://www.soundmasters.com",
      keywords: ["speaker", "bluetooth", "wireless"],
      categories: ["Electronics", "Audio"],
      dateReleased: "05/15/2022",
      discontinued: false
    },
    {
      productName: "Smart Home Security Camera",
      productDescription: "Keep your home safe and secure with this smart home security camera.",
      modelNumber: "SC-2024",
      price: 129.99,
      manufacturer: "SecureTech Inc.",
      manufacturerWebsite: "http://www.securetech.com",
      keywords: ["security camera", "smart home", "surveillance"],
      categories: ["Electronics", "Home Security"],
      dateReleased: "01/10/2024",
      discontinued: false
    },
    {
      productName: "Professional Espresso Machine",
      productDescription: "Brew barista-quality espresso at home with this professional espresso machine.",
      modelNumber: "EM-456",
      price: 999.99,
      manufacturer: "BrewTech Corp.",
      manufacturerWebsite: "http://www.brewtech.com",
      keywords: ["espresso machine", "coffee", "barista"],
      categories: ["Kitchen Appliances", "Coffee"],
      dateReleased: "09/25/2022",
      discontinued: false
    },
    {
      productName: "Wireless Charging Pad",
      productDescription: "Conveniently charge your devices wirelessly with this sleek charging pad.",
      modelNumber: "CP-2024",
      price: 39.99,
      manufacturer: "ChargeTech Ltd.",
      manufacturerWebsite: "http://www.chargetech.com",
      keywords: ["charging pad", "wireless", "convenience"],
      categories: ["Electronics", "Accessories"],
      dateReleased: "03/08/2024",
      discontinued: false
    },
    {
      productName: "Portable Power Bank",
      productDescription: "Stay powered up on the go with this reliable portable power bank.",
      modelNumber: "PB-789",
      price: 49.99,
      manufacturer: "ChargeTech Ltd.",
      manufacturerWebsite: "http://www.chargetech.com",
      keywords: ["power bank", "portable", "charging"],
      categories: ["Electronics", "Accessories"],
      dateReleased: "06/12/2023",
      discontinued: false
    }
]

for(let i=0; i<products.length; i++) {
    const {
        productName,
        productDescription,
        modelNumber,
        price,
        manufacturer,
        manufacturerWebsite,
        keywords,
        categories,
        dateReleased,
        discontinued
      } = products[i];

    await product.create(
        productName,
        productDescription,
        modelNumber,
        price,
        manufacturer,
        manufacturerWebsite,
        keywords,
        categories,
        dateReleased,
        discontinued
      );
}

console.log(await product.getAll())

closeConnection()