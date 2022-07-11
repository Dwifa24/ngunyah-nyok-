import React from "react";
import { BsFillStarFill } from "react-icons/bs";

import intToRupiah from "../helpers/rupiah";
import base_url from "../helpers/base_url";

function Card(props) {
  const data = props.product;
  const url = base_url;
  return (
    <div>
      <div className="w-48 h-70 bg-gradient-to-br from-lilac to-cream rounded rounded-br-{50px} shadow-sm shadow-neutral-500 hover:shadow-inner hover:inner  hover:scale-125 cursor-pointer mx-auto">
        <img
          className="p-4 w-48 h-48 rounded-t-md object-cover"
          alt=""
          src={`${url}/images/${data.ProductImages[0].filename}`}
        />
        <div className="px-4">
          <p className="truncate font-bold font-xl">{data.name}</p>
          <div>
            <p className="font-semibold inline">Rp{intToRupiah(data.price)} </p>
            <p className="inline">/ {data.weight} {data.unit} </p>
          </div>
            <div className="py-3 flex justify-center">
              <p className="text-darkblue flex text-2xl">
              {data.rating !== 0 && data.rating !== null
                      ? [...Array(data.rating)].map((x, i) => (
                          <BsFillStarFill
                            key={i}
                            className="text-darkblue"
                            size={20}
                          />
                        ))
                      : "No ratings given"}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Card;
