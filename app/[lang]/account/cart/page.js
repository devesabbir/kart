import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import CartComponent from "@/components/shop/cart/CartComponent";
import NavigateToLogin from "@/utils/NavigateToLogin";


async function CartPage() {
  const session = await auth();

  if (!session?.user) {
    return <NavigateToLogin path={"/account/cart"} />;
  }

  return (
    <>
      <Breadcrumb title={"Cart Items"} />
      <div className="container gap-6 pb-5 pt-5 flex flex-col md:flex-row justify-between">
        <CartComponent />
      </div>
    </>
  );
}

export default CartPage;
