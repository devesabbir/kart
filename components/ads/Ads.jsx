import Image from "next/image";
import adsPhoto from "@/public/assets/images/offer.jpg";

function Ads() {
  return (
    <div className="container pb-16">
      <a href="#">
        <Image
          src={adsPhoto}
          alt="ads"
          width={700}
          height={700}
          className="w-full"
        />
      </a>
    </div>
  );
}

export default Ads;
