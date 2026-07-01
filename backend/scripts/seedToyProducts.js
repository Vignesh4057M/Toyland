require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

const products = [
  {
    name: "STEM Learning Robot Kit",
    mainCategory: "Educational Toys",
    subCategory: "STEM Kit",
    price: 1499,
    discountPrice: 1199,
    stock: 25,
    colors: ["Blue", "White"],
    sizes: ["Age 6+"],
    images: ["https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80"],
    about: "Interactive STEM toy for creative learning.",
    description: "A fun educational robot kit that helps kids learn logic, creativity and problem solving.",
    status: "Active",
  },
  {
    name: "Super Hero Action Figure Set",
    mainCategory: "Action Figures",
    subCategory: "Hero Set",
    price: 999,
    discountPrice: 799,
    stock: 40,
    colors: ["Multi"],
    sizes: ["Set of 4"],
    images: ["https://images.unsplash.com/photo-1608889476561-6242cfdbf622?auto=format&fit=crop&w=900&q=80"],
    about: "Adventure action figures for imaginative play.",
    description: "Premium hero figures made for storytelling, gifting and daily play.",
    status: "Active",
  },
  {
    name: "Creative Building Blocks Box",
    mainCategory: "Building Blocks",
    subCategory: "Blocks",
    price: 1299,
    discountPrice: 999,
    stock: 35,
    colors: ["Multi"],
    sizes: ["120 Pieces"],
    images: ["https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80"],
    about: "Colorful blocks to build creativity.",
    description: "Safe and durable building blocks for creative construction and motor-skill development.",
    status: "Active",
  },
  {
    name: "Cute Teddy Soft Toy",
    mainCategory: "Soft Toys",
    subCategory: "Teddy Bear",
    price: 899,
    discountPrice: 649,
    stock: 50,
    colors: ["Brown", "Pink"],
    sizes: ["Medium"],
    images: ["https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=900&q=80"],
    about: "Soft plush teddy for kids and gifting.",
    description: "A soft, cuddly teddy bear with premium fabric and child-safe finishing.",
    status: "Active",
  },
  {
    name: "Baby Rattle Gift Pack",
    mainCategory: "Baby Toys",
    subCategory: "Infant Toys",
    price: 699,
    discountPrice: 549,
    stock: 45,
    colors: ["Multi"],
    sizes: ["Age 0-2"],
    images: ["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80"],
    about: "Safe baby toys for early development.",
    description: "Lightweight rattles and sensory toys designed for infant engagement.",
    status: "Active",
  },
  {
    name: "Outdoor Cricket Play Set",
    mainCategory: "Outdoor Toys",
    subCategory: "Sports Toy",
    price: 1199,
    discountPrice: 899,
    stock: 30,
    colors: ["Blue", "Yellow"],
    sizes: ["Kids"],
    images: ["https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=900&q=80"],
    about: "Outdoor play set for active kids.",
    description: "Durable cricket play kit made for backyard and park fun.",
    status: "Active",
  },
  {
    name: "Brain Puzzle Board Game",
    mainCategory: "Puzzle Toys",
    subCategory: "Puzzle Game",
    price: 799,
    discountPrice: 599,
    stock: 60,
    colors: ["Multi"],
    sizes: ["Age 5+"],
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=900&q=80"],
    about: "Puzzle toy for memory and thinking skills.",
    description: "Fun puzzle game that improves focus, reasoning and patience.",
    status: "Active",
  },
  {
    name: "Remote Control Racing Car",
    mainCategory: "Remote Control Toys",
    subCategory: "RC Car",
    price: 1799,
    discountPrice: 1399,
    stock: 20,
    colors: ["Red", "Black"],
    sizes: ["Rechargeable"],
    images: ["https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=80"],
    about: "Fast RC racing car for kids.",
    description: "Rechargeable remote control car with strong body and smooth control.",
    status: "Active",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/toyland");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("ToyLand sample products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
