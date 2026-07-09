import React, { useContext, useEffect, useState } from "react";
import Mainlayout from "../components/Layouts/MainLayout";
import CardBalance from "../components/Fragments/CardBalance";
import CardGoals from "../components/Fragments/CardGoals";
import CardRecentTransactions from "../components/Fragments/CardRecentTransactions";
import CardStatistic from "../components/Fragments/CardStatistic";
import CardExpenseBreakdown from "../components/Fragments/CardExpenseBreakdown";
import CardUpcomingBill from "../components/Fragments/CardUpcomingBill";
import {
  transactions,
  balances,
  expensesStatistics,
} from "../data";
import {
  goalService,
  expensesService,
  billService,
} from "../services/dataService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/Elements/AppSnackbar";

function Dashboard() {
  const [goals, setGoals] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);

  const [upcomingBills, setUpcomingBills] = useState([]);
  const [loadingBills, setLoadingBills] = useState(false);

  const { logout } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchGoals = async () => {
    try {
      const data = await goalService();
      setGoals(data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Gagal mengambil data goals.",
        severity: "error",
      });

      if (err.status === 401) logout();
    }
  };

  const fetchExpenses = async () => {
    setLoadingExpenses(true);

    try {
      const data = await expensesService();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setExpenses(list);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Gagal mengambil data expenses.",
        severity: "error",
      });

      if (err.status === 401) logout();
    } finally {
      setLoadingExpenses(false);
    }
  };

  const fetchBills = async () => {
    setLoadingBills(true);

    try {
      const data = await billService();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setUpcomingBills(list);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Gagal mengambil data bills.",
        severity: "error",
      });

      if (err.status === 401) logout();
    } finally {
      setLoadingBills(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchExpenses();
    fetchBills();
  }, []);

  return (
    <Mainlayout>
      <div className="grid sm:grid-cols-12 gap-6">
        <div className="sm:col-span-4">
          <CardBalance data={balances} />
        </div>

        <div className="sm:col-span-4">
          <CardGoals data={goals} />
        </div>

              <div className="sm:col-span-4">
        <CardUpcomingBill data={upcomingBills} loading={loadingBills} />
      </div>
      
        <div className="sm:col-span-4 sm:row-span-2">
          <CardRecentTransactions data={transactions} />
        </div>

        <div className="sm:col-span-8">
          <CardStatistic data={expensesStatistics} />
        </div>

        <div className="sm:col-span-8">
          {loadingExpenses ? (
            <div className="bg-white rounded-xl p-6 text-center shadow">
              Loading expenses...
            </div>
          ) : (
            <CardExpenseBreakdown data={expenses} />
          )}
        </div>
      </div>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Mainlayout>
  );
}

export default Dashboard;