import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import ShopProductCard from "@/components/shop/ShopProductCard";
import Sidebar from "@/components/shop/sidebar/Sidebar";
import { getAllProducts } from "@/queries/shop-queries";

async function ShopPage({ searchParams }) {
  const products = await getAllProducts(searchParams);

  return (
    <main>
      <Breadcrumb title={"Shop"} />

      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <Sidebar />

        <div className="col-span-3">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {products?.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ShopPage;
