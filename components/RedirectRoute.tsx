"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Loader from "./Loader";

const RedirectRoute = ({ children }: { children: React.ReactNode }) => {
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
        if (err) return;
      } finally {
        setLoading(false);
      }
    };

    checkIfLoggedIn();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }
  return <>{children}</>;
};

export default RedirectRoute;
