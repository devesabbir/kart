import CategoriesFilter from "./CategoriesFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";

function Sidebar() {
  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
      <div className="divide-y divide-gray-200 space-y-5">
        <CategoriesFilter />
        <PriceFilter />
        <SizeFilter />
      </div>
    </div>
  );
}

export default Sidebar;
