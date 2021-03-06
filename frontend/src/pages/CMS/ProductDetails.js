import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import {
  BsCurrencyDollar,
  BsBasketFill,
  BsFillStarFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/cmsActions";

import base_url from "../../helpers/base_url";
import intToRupiah from "../../helpers/rupiah";

const ProductDetails = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-12 sm:grid-cols-1">
        <div className="md:col-span-4 sm:col-span-12 sm:min-h-screen mx-auto ">
          <div className="flex px-5">
            <h1 className="text-lg font-semibold pt-10 pb-5">
              Product Details
            </h1>
            <div className="pt-10 pl-12">
              <button
                className="bg-darkblue text-cream rounded px-2 py-1 hover:bg-cream hover:text-darkblue"
                onClick={() => navigate(`/cms/edit/${id}`)}
              >
                <div className="flex w-20 p-1 rounded-full">
                  <BiPencil className="mt-1 mr-1" />
                  <h1 className="text-sm font-semibold">Edit</h1>
                </div>
              </button>
            </div>
          </div>
          <div className="max-w-sm px-5 rounded overflow-hidden">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
            >
              {action === "GET_PRODUCT_BY_ID" && data !== "loading"
                ? data.ProductImages.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img src={`${url}/images/${img.filename}`}></img>
                      </SwiperSlide>
                    );
                  })
                : "Loading"}
            </Swiper>
            <div className="px-6">
              <div className="font-bold text-xl my-2">{data.name}</div>
              <div className="flex py-1">
                <BsCurrencyDollar className="mt-1 mr-3" size={20} />
                <p className="text-darkblue font-semibold text-md pr-1">
                Rp{intToRupiah(data.price)}
                </p>
                <p>/ {data.weight} {data.unit}</p>
              </div>
              <div className="flex py-2">
                <BsBasketFill className="mr-3" size={20} />
                <p className="text-darkblue font-semibold text-md pr-1">
                  {data.stock}
                </p>
                <p>in stock</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-r w-5 border-gray-300 m-5" />
        <div className="md:col-span-7 sm:col-span-12 overflow-scroll no-scrollbar">
          <div className="p-5">
            <h1 className="text-xl font-semibold pt-10 pb-5 text-center">
              Product Description
            </h1>
            <div>
              <ul>
                <li>
                  <h1 className="text-lg font-semibold pb-2">Description</h1>
                  <p className="text-md pb-4">{data.desc}</p>
                </li>
                <li>
                  <h1 className="text-lg font-semibold pb-2">Category</h1>
                  <p className="text-md pb-4">{data.category}</p>
                </li>
                <li>
                  <h1 className="text-lg font-semibold pb-2">Condition</h1>
                  <p className="text-md pb-4">{data.condition}</p>
                </li>
                <li>
                  <h1 className="text-lg font-semibold pb-2">Expiry Date</h1>
                  <p className="text-md pb-4">
                    {String(data.expire).slice(0, 10)}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="p-5">
            <h1 className="text-xl font-semibold pt-5 pb-5 text-center">
              Analytics
            </h1>
            <div className="flex py-5">
              <div className="flex-row w-1/3">
                <div>
                  <h1 className="text-md font-semibold">Rating</h1>
                  <div className="flex py-1">
                    {data.rating !== 0 && data.rating !== null
                      ? [...Array(data.rating)].map((x, i) => (
                          <BsFillStarFill
                            key={i}
                            className="text-accentColor"
                            size={20}
                          />
                        ))
                      : "No ratings given"}
                  </div>
                </div>
              </div>
              <div className="flex-row w-1/3">
                <h1 className="text-md font-semibold">Views</h1>
                <h1 className="text-lg font-bold">{data.views}</h1>
              </div>
              <div className="flex-row w-1/3">
                <h1 className="text-md font-semibold">Total Sold</h1>
                <h1 className="text-lg font-bold">{data.totalSold}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
