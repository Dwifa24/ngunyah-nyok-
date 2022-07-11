import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductFilter = () => {
  const { query } = useParams();

  const [filterSwitch, setFilterSwitch] = useState({
    kering: query === "Kue Kering" ? true : false,
    basah: query === "Kue Basah" ? true : false
  })

  useEffect(() => {
    if ((filterSwitch.kering === true && filterSwitch.basah === true) || (filterSwitch.kering === false && filterSwitch.basah === false)) {
      navigate(`/user/home`)
    } else {
      if (filterSwitch.kering === true) {
        navigate(`/user/home/kuekering`)
      } else if (filterSwitch.basah === true){
        navigate(`/user/home/kuebasah`)
      }
    }
  }, [filterSwitch])


  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap space-x-2 p-3 bg-lilac rounded w-fit">
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="sr-only checked:text-blue"
            checked={filterSwitch.kering}
            onChange={(e) => {
              setFilterSwitch({ ...filterSwitch, basah: false, kering: !e.target.value });
            }}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">Kue Kering</div>
      </label>

      <label htmlFor="toogleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleB"
            type="checkbox"
            className="sr-only"
            checked={filterSwitch.basah}
            onChange={(e) => {
              setFilterSwitch({ ...filterSwitch, kering: false, basah: !e.target.value });
            }}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">Kue Basah</div>
      </label>
    </div>
  );
};

export default ProductFilter;