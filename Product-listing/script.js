const products = [
  {
    name: "Smartphone Pro X",
    category: "electronics",
    price: 299,
    rating: 4.5,
    description: "128GB, AMOLED Display, Dual Camera",
    image: "../images/phone.jpg"
  },
  {
    name: "Slim Fit Jeans",
    category: "clothing",
    price: 45,
    rating: 3.9,
    description: "Blue denim, stretchable, all sizes available",
    image: "../images/jeans.jpg"
  },
  {
    name: "Gaming Laptop",
    category: "electronics",
    price: 999,
    rating: 4.7,
    description: "16GB RAM, RTX 3060, 512GB SSD",
    image: "../images/laptop.jpg"
  },
  {
    name: "Cotton T-shirt",
    category: "clothing",
    price: 25,
    rating: 4.0,
    description: "Soft cotton, multiple colors",
    image: "../images/tshirt.jpg"
  },
  {
    name: "JavaScript Guide",
    category: "books",
    price: 30,
    rating: 4.2,
    description: "Beginner to Advanced JavaScript concepts",
    image: "../images/book.png"
  },
  {
    name: "Wireless Headphones",
    category: "electronics",
    price: 70,
    rating: 4.3,
    description: "Noise cancelling, Bluetooth 5.0",
    image: "../images/headphones.jpg"
  },
  {
    name: "Mystery Novel",
    category: "books",
    price: 120,
    rating: 4.8,
    description: "Thrilling plot with unexpected twists",
    image: "../images/novel.jpg"
  },
  {
    name: "Winter Jacket",
    category: "clothing",
    price: 85,
    rating: 4.6,
    description: "Waterproof, windproof, warm inner lining",
    image: "../images/jacket.png"
  },
  {
    name: "Smartwatch X",
    category: "electronics",
    price: 199,
    rating: 4.4,
    description: "Heart-rate monitor, GPS, notifications",
    image: "../images/smartwatch.png"
  },
  {
  name: "Gold-Plated Earrings",
  category: "accessories",
  price: 30,
  rating: 4.4,
  description: "Elegant danglers, perfect for parties and functions",
  image: "../images/earrings.jpeg"
},
{
  name: "Silver Ring",
  category: "accessories",
  price: 22,
  rating: 4.3,
  description: "Minimalist design, sterling silver",
  image: "../images/ring.png"
},
{
  name: "Leather Handbag",
  category: "accessories",
  price: 75,
  rating: 4.7,
  description: "Spacious with 3 compartments, premium quality",
  image: "../images/handbag.png"
},
{
  name: "Traditional Bangles",
  category: "accessories",
  price: 40,
  rating: 4.2,
  description: "Set of 12, suits festive occasions",
  image: "../images/bangles.png"
},
{
  name: "Statement Jewelry Set",
  category: "accessories",
  price: 120,
  rating: 4.8,
  description: "Includes necklace, earrings & bracelet",
  image: "../images/jewelry.png"
},
{
  name: "Running Shoes",
  category: "accessories",
  price: 60,
  rating: 4.5,
  description: "Breathable mesh, ideal for workouts",
  image: "../images/shoes.png"
},
{
  name: "Women’s Footwear",
  category: "accessories",
  price: 45,
  rating: 4.1,
  description: "Comfortable sole, stylish design",
  image: "../images/footwear.png"
},
{
  name: "Matte Lipstick",
  category: "cosmetics",
  price: 20,
  rating: 4.5,
  description: "Long-lasting matte finish, available in 12 shades",
  image: "../images/lipstick.png"
},
{
  name: "Compact Powder",
  category: "cosmetics",
  price: 18,
  rating: 4.2,
  description: "Lightweight, perfect for daily touch-ups",
  image: "../images/compact.png"
},
{
  name: "Liquid Foundation",
  category: "cosmetics",
  price: 25,
  rating: 4.6,
  description: "Full coverage, blends smoothly, SPF 15",
  image: "../images/foundation.png"
}


];


const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortOption = document.getElementById("sortOption");
const productGrid = document.getElementById("productGrid");

categoryFilter.addEventListener("change", updateDisplay);
priceFilter.addEventListener("change", updateDisplay);
sortOption.addEventListener("change", updateDisplay);

function updateDisplay() {
  const category = categoryFilter.value;
  const price = priceFilter.value;
  const sort = sortOption.value;

  let filtered = [...products];

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (price === "low") {
    filtered = filtered.filter(p => p.price < 50);
  } else if (price === "medium") {
    filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
  } else if (price === "high") {
    filtered = filtered.filter(p => p.price > 100);
  }

  if (sort === "priceLowHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "priceHighLow") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}

function renderProducts(products) {
  productGrid.innerHTML = "";
  products.forEach(product => {
    productGrid.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-content">
          <h3>${product.name}</h3>
          <p class="price">$${product.price}</p>
          <p class="rating">⭐ ${product.rating}</p>
          <p class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          <p class="desc">${product.description}</p>
          <button class="buy-btn">🛒 Add to Cart</button>
        </div>
      </div>
    `;
  });
}


// Initial load
renderProducts(products);
