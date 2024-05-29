import Image from "next/image";
import methods from "@/public/assets/images/methods.png";

function CopyrightInfo() {
  return (
    <div className="bg-gray-800 py-4">
      <div className="container flex items-center justify-between">
        <p className="text-white">© TailCommerce - All Right Reserved</p>
        <div className="">
          <Image src={methods} alt="methods" className="h-5 w-52 object-fit" />
        </div>
      </div>
    </div>
  );
}

export default CopyrightInfo;
