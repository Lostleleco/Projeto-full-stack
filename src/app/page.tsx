import Stripe from 'stripe'; // Importação do Stripe
import { ProductType } from "@/types/ProductType";
import Product from "./components/Product";

// Função para obter os produtos
async function getProducts(): Promise<ProductType[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
   
  });

  // Listar os produtos
  const products = await stripe.products.list();

  // Formatar os produtos com seus preços
  const formattedProducts = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });

      // Formatar o preço com 2 casas decimais e como moeda
      const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.data[0].unit_amount! / 100); // Converte de centavos para reais

      return {
        id: product.id,
        price: formattedPrice, // Preço agora é uma string formatada
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
      };
    })
  );

  return formattedProducts;
}

// Componente principal da página
export default async function Home() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
