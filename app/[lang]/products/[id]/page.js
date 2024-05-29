import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import ProductDescription from "@/components/products/ProductDescription";
import Products from "@/components/products/Products";
import ProductsDetails from "@/components/products/ProductsDetails";
import { getSingleProduct } from "@/queries/shop-queries";

async function ProductDetailsPage({ params: { id } }) {
  const product = await getSingleProduct(id);
  const session = await auth();

  return (
    <main>
      <Breadcrumb title={product?.name} />
      <ProductsDetails product={product} userEmail={session?.user?.email} />
      <ProductDescription />
      <Products title={"RELATED PRODUCTS"} />
    </main>
  );
}

export default ProductDetailsPage;
