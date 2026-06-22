"use client";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
// import Loader from "./Loader";
import API from "../api/api";

const RedirectRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const res = await API.get("/admin/token-verify", {
          withCredentials: true,
        });        

        if (res.status === 201) {
          navigate("/product-form");
        }
      } catch (err) {
        
        // if (err) navigate("/login");
        if (err) return
      } finally {
        setLoading(false);
      }
    };

    checkIfLoggedIn();
  }, [navigate]);

  if (loading) {
    return (
      // <div className="fixed top-0 left-0 w-full h-[95vh] bg-white flex justify-center items-center z-[150]">
      //   <Image
      //     width={200}
      //     height={140}
      //     src="/"
      //     alt="Loading..."
      //     className=" w-[100%]"
      //     unoptimized
      //   />
      // </div>

      // <Loader />
      <div>Loading...</div>
    );
  }
  return <>{children}</>;
};

export default RedirectRoute;
