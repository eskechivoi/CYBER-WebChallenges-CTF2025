import React, { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext"; 

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [flag, setFlag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth()
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchFlag = async (): Promise<void> => {
      try {
        const response = await fetch(`${backendUrl}/api/flag`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json()
        if (!response.ok && data.message) {
          throw new Error(data.message);
        } else if (!response.ok) {
          throw new Error("Error retrieving the flag.");
        }
        setFlag(data.flag);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchFlag();
  }, []);

  return (
    <div>
      <PageMeta
        title="Admin Dashboard"
        description="From here, you can admin all SUGUS Corp!"
      />
      <PageBreadcrumb pageTitle="Admin Dashboard" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              {/* Círculo de carga */}
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
                Challenge solved!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                Your flag: <span className="font-mono text-green-600">{flag}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

