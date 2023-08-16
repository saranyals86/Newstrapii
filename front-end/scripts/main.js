const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = import.meta.env.VITE_BASE_URL;

const { data: allProducts } = await fetch(`${apiUrl}/products?populate=*`)
  .then((res) => res.json())
  .catch((err) => console.log(err));

export const productsData = Object.values(allProducts).map((product) => ({
  name: product.attributes.Name,
  price: product.attributes.Price,
  image: product.attributes.product_image.data.attributes.formats.small.url,
}));

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const renderProducts = () => {
  const productsContainer = document.querySelector("#products");

  productsData.forEach(
    (product) =>
      (productsContainer.innerHTML += `
      <div class="product">
        <img
          src=${baseUrl}${product.image}
          alt="product image" class="product-image"
        />
        <div class="product-info">
          <h2 class="product-name">${product.name}</h2>
          <h3 class="product-price">${formatCurrency(product.price)}</h3>
        </div>
      </div>
`)
  );
};
renderProducts();
