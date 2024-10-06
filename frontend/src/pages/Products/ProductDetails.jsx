import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const images = [
    "https://m.media-amazon.com/images/I/51FNnHjzhQL._SL1200_.jpg",
    "https://m.media-amazon.com/images/I/718BamtQcDL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71pyO5+Dn5L._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71HTh-leeyL._SL1500_.jpg",
  ];

  const [currImage, setCurrImage] = useState(images[0]);
  const ref = useRef(null);
  const Inref = useRef(null);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error?.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  // const magnify = (event) => {
  //   const magnifyImage = ref.current;
  //   magnifyImage.className =
  //     "left-[55rem] w-[28rem] h-[20rem] absolute border border-sky-500";
  //   // magnifyImage.style.background =
  //   //   "url('https://m.media-amazon.com/images/I/51FNnHjzhQL._SL1200_.jpg') 300px 400px";
  //   magnifyImage.style.background = `url('https://m.media-amazon.com/images/I/51FNnHjzhQL._SL1200_.jpg') ${event.offsetX} ${event.offsetY}`;
  // };
  // console.log();
  // const removeMagnify = () => {
  //   const magnifyImage = ref.current;
  //   magnifyImage.className = "w-0";
  // };

  // const magnify = (event) => {
  //   console.log("Mouse entered magnify area");
  //   const magnifyImage = ref.current;
  //   const magnifymage = Inref.current;
  //   const imgRect = magnifymage.getBoundingClientRect();

  //   const offsetX = event.clientX - imgRect.left;
  //   const offsetY = event.clientY - imgRect.top;

  //   const xPercent = (offsetX / imgRect.width) * 100;
  //   const yPercent = (offsetY / imgRect.height) * 100;

  //   magnifyImage.style.backgroundImage = `url('${currImage}')`;
  //   magnifyImage.style.backgroundRepeat = "no-repeat";
  //   magnifyImage.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  //   magnifyImage.style.backgroundSize = "200%";
  //   magnifyImage.style.width = "400px";
  //   magnifyImage.style.height = "400px";
  //   magnifyImage.style.position = "absolute";
  //   magnifyImage.style.left = "55rem";
  // };

  // const removeMagnify = () => {
  //   console.log("Mouse left magnify area");
  //   const magnifyImage = ref.current;
  //   magnifyImage.style.backgroundImage = "none";
  //   magnifyImage.style.width = "0";
  //   magnifyImage.style.height = "0";
  // };

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.data || error?.message}</Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div className="w-full">
              {/* <div>
                {images?.map((image, ind) => (
                  <div key={ind} onClick={() => setCurrImage(image)}>
                    <img
                      src={image}
                      alt="Product Image"
                      className="w-full xl:w-[10rem] mb-2 lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] cursor-pointer"
                    />
                  </div>
                ))}
              </div> */}
              <img
                src={product.image}
                alt={product.name}
                // onMouseMove={magnify}
                // ref={Inref}
                // onMouseLeave={removeMagnify}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
              />
              {/* <div
                ref={ref}
                className="left-[5rem] w-[30rem] h-[30rem] absolute border-8 border-sky-500"
              ></div> */}
              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
