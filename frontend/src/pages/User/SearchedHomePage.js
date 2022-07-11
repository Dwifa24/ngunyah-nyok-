import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarouselComponent from "../../components/CarouselComponent";
import CardContainerUser from "../../components/CardContainerUser";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const SearchedHomePage = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="mx-auto md:container">
      <div className="py-3">
      </div>
      <div>
        <div className="p-3">
          <div className="flex flex-wrap space-x-2 p-3 rounded w-fit">

            <button
              className={` ${(query === "kue kering") ? "bg-lightColor text-darkColor hover:bg-darkColor hover:text-lightColor" : "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-36 p-2 text-2xl rounded-md font-semibold`}
              onClick={() => {
                (query === "kue kering") ? navigate(`/user/home`) : navigate(`/user/home/kuekering`);
              }}>
              Kue Kering
            </button>

            <button
              className={` ${(query === "kue basah") ? "bg-lightColor text-darkColor hover:bg-darkColor hover:text-lightColor" : "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-36 p-2 text-2xl rounded-md font-semibold`}
              onClick={() => {
                (query === "kue basah") ? navigate(`/user/home`) : navigate(`/user/home/kuebasah`);
              }}>
              Kue Basah
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" &&
          status === "data" &&
          (query === "kue basah" || query === "kue kering") ? (
          <CardContainerUser
            data={data.filter((product) => product.category.toLowerCase().includes(query).toLowerCase())}
          />
        ) : action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerUser
            data={data.filter((product) =>
              product.desc.toLowerCase().includes(query.toLowerCase())
            )}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default SearchedHomePage;
