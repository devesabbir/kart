import BannerArea from "@/components/banner/BannerArea";
import { getDictionary } from "./dictionaries";

import Features from "@/components/features/Features";

import CategoryArea from "@/components/products/CategoryArea";
import Products from "@/components/products/Products";
import Ads from "@/components/ads/Ads";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang); // en
  return (
    <main className="">
      <BannerArea />
      <Features />
      <CategoryArea />
      <Products title={"TOP NEW ARRIVAL"} />
      <Ads />
      <Products title={"TRENDING PRODUCTS"} />
    </main>
  );
}
