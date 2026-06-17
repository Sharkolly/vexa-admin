"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await API.get("/admin/token-verify", {
          withCredentials: true,
        });

        if (res.status !== 201) {
          localStorage.removeItem("token");
          navigate(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
      } catch (err) {
        if (err) {
          localStorage.removeItem("token");
          navigate(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
      } finally {
        setLoading(false); // done loading
      }
    };

    checkToken();
  }, [navigate]);

  // if (loading) {
  if (loading) return
  //   return (
  //     <div className="fixed top-0 left-0 w-full h-[95vh] bg-white flex justify-center items-center z-150">
  //       <img
  //         width={200}
  //         height={140}
  //         src="/loading3.gif"
  //         alt="Loading..."
  //         className=" w-full"
  //       />
  //     </div>
  //   );
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
