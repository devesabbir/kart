import Image from "next/image";
import Logo from "@/public/assets/images/logo.svg";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Search from "../search/Search";
import { auth } from "@/auth";
import Cart from "./Cart";
import WishListMenu from "./WishListMenu";

async function Header() {
  const session = await auth();
  const user = session?.user ?? {};

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Link href="/" as={"/"}>
          <Image
            src={Logo}
            width={500}
            height={500}
            alt="Logo"
            className="w-32"
          />
        </Link>
        <Search />
        <div className="flex items-center space-x-4">
          <WishListMenu />

          <Cart />

          {user?.name && (
            <Link
              href={"/account"}
              as={"/account"}
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                {user?.image ? (
                  <Image
                    src={user.image}
                    width={32}
                    height={32}
                    alt={user?.name}
                    className="block mx-auto rounded-full"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
              <div className="text-xs leading-3">
                {user?.name && user?.name}
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
