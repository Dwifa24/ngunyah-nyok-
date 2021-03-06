import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { update, getProductById } from "../../actions/cmsActions";

import base_url from "../../helpers/base_url";

function EditProduct() {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: 0,
    stock: 0,
    expire: "",
    weight: 0,
    unit: "",
    category: "",
    condition: "",
  });

  useEffect(() => {
    if (action === "GET_PRODUCT_BY_ID" && status === "data") {
      setForm({
        name: data.name,
        desc: data.desc,
        price: data.price,
        stock: data.stock,
        expire: data.expire ? data.expire.split("T")[0] : "",
        weight: data.weight,
        unit: data.unit,
        category: data.category,
        condition: data.condition,
      });
    }
    // else if (action === "UPDATE" && status === "data") {
    //   dispatch(getUser());
    // }
  }, [data, dispatch]);

  useEffect(() => {
    if (action === "UPDATE" && status === "data") {
      navigate(`/cms/details/${id}`);
    }
  });

  const [images, setImages] = useState();

  const editProductHandler = () => {
    let formData = new FormData();
    console.log(form);
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("expire", form.expire);
    formData.append("weight", form.weight);
    formData.append("unit", form.unit);
    formData.append("category", form.category);
    formData.append("condition", form.condition);


    dispatch(update(form, id));
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  return (
    <div className="mx-auto lg:w-full md:w-3/5 sm:w-96 bg-white rounded-md overflow-scroll max-h-screen py-5r">
      <div className="p-5">
        <div className="py-4 text-3xl font-bold text-darkblue text-center">
          Edit Product
        </div>
        <hr className="border-green-800 mx-5" />
        <div className="px-5 py-5">
          <div className="overflow-x-scroll flex space-x-8">
            {data.ProductImages !== undefined ? (
              data.ProductImages.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 my-5 w-36 h-36 bg-gray-100 shadow-gray-600 shadow-md text-gray-500 p-2 rounded-md"
                  >

                    <div className="text-7xl">
                      <img
                        className="w-32 h-32 object-cover"
                        src={
                          img
                            ? url + "/images/" + img.filename
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="lg:flex lg:flex-row p-5 justify-between">
              <div className="lg:flex lg:flex-col lg:w-2/5">
                <div className="py-2">
                  <label className="block text-darkblue text-lg font-bold pb-2">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    className="border hover:border-darkblue focus:border-lilac p-2 rounded-md bg-gray-400 w-full"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name || ""}
                  ></input>
                </div>
                <div className="py-2">
                  <label className="block text-darkblue text-lg font-bold pb-2">
                    Deskripsi
                  </label>
                  <textarea
                    rows="4"
                    className="border hover:border-darkblue focus:border-darkblue p-2 rounded-md bg-gray-400 w-full"
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    value={form.desc || ""}
                  ></textarea>
                </div>
                <div className="py-2">
                  <label className="block text-blue text-lg font-bold pb-2">
                    Berat
                  </label>
                  <input
                    type="number"
                    className="border hover:border-darkblue focus:border-darkblue p-2 rounded-md bg-gray-400 w-full"
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    value={form.weight || ""}
                  ></input>
                </div>
                <div className="py-2">
                  <label className="block text-darkblue text-lg font-bold pb-2">
                    Tanggal Kadaluarsa
                  </label>
                  <input
                    type="date"
                    className="border hover:border-darkblue focus:border-darkblue p-2 rounded-md bg-gray-400 w-full"
                    onChange={(e) => setForm({ ...form, expire: e.target.value })}
                    value={form.expire || ""}
                  ></input>
                </div>

              </div>
              <div className="lg:flex lg:flex-col lg:w-2/5">
                <div className="py-2">
                  <label className="block text-darkblue text-lg font-bold pb-2">
                    Kategori
                  </label>
                  <select
                    className="border hover:border-darkblue focus:border-darkblue p-2 rounded-md bg-gray-400 w-full "
                    name="category"
                    id="category"
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    value={form.category || ""}
                  >
                    <option value="Kue Kering">Kue Kering</option>
                    <option value="Kue Basah">Kue Basah</option>
                  </select>
                </div>
                <div className="py-2">
                  <label className="block text-darkblue text-lg font-bold pb-2">
                    Harga
                  </label>
                  <input
                    type="number"
                    className="border hover:border-darkblue focus:border-darkblue p-2 rounded-md bg-gray-400 w-full"
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    value={form.price || ""}
                  ></input>
                </div>
                <div className="py-2">
                  <label className="block text-darkblue text-lg font-bold pb-2">
                    Stok
                  </label>
                  <input
                    type="number"
                    className="border hover:border-darkblue focus:border-darkblue p-2 rounded-md bg-gray-400 w-full"
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    value={form.stock || ""}
                  ></input>
                </div>
                <div className="py-2">
                  <label className="block text-darkblue text-lg font-bold pb-2">
                    Satuan
                  </label>
                  <input
                    type="text"
                    className="border hover:border-darkblue focus:border-darkblue p-2 rounded-md bg-gray-400 w-full"
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    value={form.unit || ""}
                  ></input>
                </div>
                <div className="py-2">
                  <label className="block text-darkblue text-lg font-bold pb-2">
                    Kondisi
                  </label>
                  <select
                    className="border hover:border-darkblue focus:border-darkblue p-2 rounded-md bg-gray-400 w-full"
                    name="condition"
                    id="condition"
                    onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    value={form.condition || ""}
                  >
                    <option value="ready">Ready</option>
                    <option value="po">PO</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 flex justify-center items-center">
              <button
                className="text-2xl py-2 border text-cream bg-darkblue hover:bg-cream hover:text-darkblue focus:border-lightColor p-2 rounded-md w-1/2"
                name="condition"
                id="condition"
                onClick={() => {
                  editProductHandler();
                }}
              >
                Edit Produk
              </button>
            </div>

        {/* <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Name
          </label>
          <input
            type="text"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name || ""}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Description
          </label>
          <textarea
            rows="4"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            value={form.desc || ""}
          ></textarea>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Price
          </label>
          <input
            type="number"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            value={form.price || ""}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Stock
          </label>
          <input
            type="number"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            value={form.stock || ""}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Expired Date
          </label>
          <input
            type="date"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
            onChange={(e) => setForm({ ...form, expire: e.target.value })}
            value={form.expire || ""}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Weight
          </label>
          <input
            type="number"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            value={form.weight || ""}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Unit
          </label>
          <input
            type="text"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            value={form.unit || ""}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Category
          </label>
          <select
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
            name="category"
            id="category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            value={form.category}
          >
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
          </select>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Condition
          </label>
          <select
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
            name="condition"
            id="condition"
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
            value={data.condition}
          >
            <option value="ripe">Ripe</option>
            <option value="raw">Raw</option>
          </select>
        </div>
        <div className="px-5 py-5">
          <button
            className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
            name="condition"
            id="condition"
            onClick={() => {
              editProductHandler();
            }}
          >
            Edit
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default EditProduct;
