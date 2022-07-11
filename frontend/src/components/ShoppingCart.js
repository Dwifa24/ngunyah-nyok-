import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import AfterLoginRoutes from "../Routes/AfterLoginRoutes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import {
  getCartByUserId,
  checkout,
  editLineItem,
  deleteLineItem,
} from "../actions/shoppingAction";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/images/logo.png"

const ShoppingCart = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) navigate("/login");
    dispatch(getCartByUserId());
  }, []);

  useEffect(() => {
    if (action === "CHECKOUT" && status === "data")
      navigate("/user/orderDetail/" + data.id);
  }, [status]);

  async function editQty(id) {
    const { value: qty } = await Swal.fire({
      title: "Input the desired quantity",
      input: "number",
      inputLabel: "Update Quantity",
      inputPlaceholder: "Enter qty",
      confirmButtonColor: "#0B4619",
    });

    if (qty) {
      console.log(typeof id);
      console.log(typeof qty);
      dispatch(editLineItem(id, { qty: +qty })).then(() => {
        dispatch(getCartByUserId());
      });
    }
  }

  function deleteCartItem(id) {
    Swal.fire({
      title: "Are you sure you want to delete this item from Cart?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "#0B4619",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteLineItem(id)).then(() => {
          dispatch(getCartByUserId());
        });
      }
    });
  }

  const checkoutHandling = () => {
    Swal.fire({
      title: "Are you sure want to checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(checkout());
      }
    });
  };

  return (
    <div className="flex">
      <aside
        className={`flex transform top-0 left-0 w-80 fixed h-screen overflow-auto ease-in-out transition-all duration-300 z-[3] ${
          showCart ? "translate-x-0" : "-translate-x-3/4"
        } `}
      >
        <div className="justify-between border-r-1 border-darkblue pt-6 w-3/4 bg-cream">
          <div>
            <div className="text-xl font-bold text-center mt-2 p-2 text-lilac border-b-2 bg-darkblue">
              <em>Cart</em>
            </div>
          </div>
          <div className="mx-auto flex">
            <ul className="my-2">
              {action === "GET_CART_BY_USER_ID" &&
              status === "data" &&
              data !== "loading" ? (
                data.lineItems.map((lineItem, index) => {
                  return (
                    <div key={index}>
                      <li className="my-4 flex border-y-2 border-darkblue">
                        <button className="flex items-center px-4 py-2 text-darkblue">
                          <GiFruitBowl size={25} />
                          <span className="mx-4 font-medium">
                            {lineItem.Product.name}
                          </span>
                          <span className="font-medium">{lineItem.qty}</span>
                        </button>

                        <button
                          className="mx-1 text-darkblue hover:text-lilac"
                          onClick={() => editQty(lineItem.id)}
                        >
                          <BsPencilSquare />
                        </button>
                        <button
                          className="mx-3 text-darkblue hover:text-lilac"
                          onClick={() => deleteCartItem(lineItem.id)}
                        >
                          <BsFillTrashFill />
                        </button>
                      </li>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              {action === "GET_CART_BY_USER_ID" &&
              status === "data" &&
              data !== "loading" &&
              data.lineItems.length !== 0 ? (
                <li className="my-2 w-3/4 absolute left-12 bottom-5">
                  <button
                    className="flex bg-darkblue items-center px-4 py-2 text-cream hover:bg-lilac hover:text-darkblue rounded-md"
                    onClick={() => checkoutHandling()}
                  >
                    <span className="mx-4 font-medium">Checkout</span>
                  </button>
                </li>
              ) : (
                <li className="my-2 w-3/4 absolute left-4 bottom-5">
                  <button className="flex pointer-events-none bg-cream items-left  py-2 text-darkblue rounded-md">
                    <span className="mx-4 font-medium">
                      Your Cart is Still Empty!
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="w-1/4 flex justify-center items-center max-h-screen">
          <div className="h-14 w-14 bg-darkblue flex justify-center items-center rounded-full">
            <button
              className="h-12 w-12 bg-darkblue text-lilac text-2xl flex justify-center items-center rounded-full"
              onClick={() => setShowCart(!showCart)}
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </aside>
      <main className="w-full max-h-full">
        <div className="sticky top-0 z-[2]">
          <Header />
        </div>
        <div className="sticky z-[1] ">
          <AfterLoginRoutes />
        </div>
        <div className="pt-2">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;
