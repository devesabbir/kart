import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import WishList from "@/components/shop/wishlist/WishList";
import NavigateToLogin from "@/utils/NavigateToLogin";

async function WishListPage() {
  const session = await auth();

  if (!session) {
    return <NavigateToLogin path={"/account/wishlist"} />;
  }

  return (
    <>
      <Breadcrumb title={"Favourite Items"} />
      <WishList />
    </>
  );
}

export default WishListPage;
