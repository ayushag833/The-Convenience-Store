import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Header from "../components/Header";
import Product from "./Products/Product";
import Loader from "../components/Loader";

const Home = () => {
  const { keyword } = useParams();
  const { data } = useGetProductsQuery({ keyword });

  return (
    <>
      <h1 className="text-center text-[3rem] mt-[1rem] mb-[2rem]">
        The Convenience Store
      </h1>
      {!keyword ? <Header /> : null}
      <>
        <div className="flex justify-between items-center">
          <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
            Special Products
          </h1>

          <Link
            to="/shop"
            className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
          >
            Shop
          </Link>
        </div>

        <div>
          <div className="flex justify-center flex-wrap mt-[2rem]">
            {!data ? (
              <Loader />
            ) : (
              data?.products?.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Home;
