import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CategoriesMenu from "./CategoriesMenu";
import { auth } from "@/auth";
import SignOut from "../auth/SignOut";
import LanguageSwitcher from "../LanguageSwitcher";

async function NavArea({ lang }) {
  const session = await auth();
  const user = session?.user ?? {};

  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
          <span className="text-white">
            <FontAwesomeIcon icon={faBars} />
          </span>
          <span className="capitalize ml-2 text-white hidden">
            All Categories
          </span>

          <CategoriesMenu lang={lang} />
        </div>
        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-6 capitalize">
            <Link
              href={"/"}
              as={"/"}
              className="text-gray-200 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href={"/shop"}
              as={"/shop"}
              className="text-gray-200 hover:text-white transition"
            >
              Shop
            </Link>
            <Link
              href={"/aboutus"}
              as={"/aboutus"}
              className="text-gray-200 hover:text-white transition"
            >
              About us
            </Link>
            <Link
              href={"/contactus"}
              as={"/contactus"}
              className="text-gray-200 hover:text-white transition"
            >
              Contact us
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {user?.name ? (
              <SignOut />
            ) : (
              <Link
                href={"/login"}
                as={"/login"}
                className="text-gray-200 hover:text-white transition"
              >
                Login
              </Link>
            )}
            <div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavArea;
