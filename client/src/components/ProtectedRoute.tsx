import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api.js";

const ProtectedRoute: React.FC = () => {
  const {
    data: admin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !admin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
