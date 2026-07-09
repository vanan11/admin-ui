import React, { useContext, useEffect, useState } from "react";
import Mainlayout from "../components/Layouts/MainLayout";
import { expensesService } from "../services/dataService";
import { AuthContext } from "../context/authContext";
import Icon from "../components/Elements/Icon";

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  const getIcon = (category) => {
    const props = { size: 28, color: "#8F8F8F" };

    switch (category?.toLowerCase()) {
      case "housing":
        return <Icon.House {...props} />;
      case "food":
        return <Icon.Food {...props} />;
      case "transportation":
        return <Icon.Transport {...props} />;
      case "entertainment":
        return <Icon.Movie {...props} />;
      case "shopping":
        return <Icon.Shopping {...props} />;
      case "others":
        return <Icon.Other {...props} />;
      default:
        return <Icon.Expense {...props} />;
    }
  };

  const fetchExpenses = async () => {
    setLoading(true);

    try {
      const data = await expensesService();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setExpenses(list);
    } catch (err) {
      if (err.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Mainlayout>
      <h1 className="text-[20px] text-gray-500 mb-6">Expenses Comparison</h1>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-[500px] text-primary">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-sm">Loading Data</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {expenses.map((item, index) => (
            <div
              key={`${item.category}-${index}`}
              className="bg-white rounded-md shadow-sm overflow-hidden"
            >
              <div className="bg-gray-100 px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-[48px] h-[48px] rounded-md bg-gray-200 flex items-center justify-center mr-4">
                    {getIcon(item.category)}
                  </div>

                  <div>
                    <p className="text-[13px] text-gray-500 capitalize font-bold leading-4">
                      {item.category}
                    </p>
                    <p className="text-[20px] font-bold text-black leading-6">
                      ${item.amount}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex justify-end items-center gap-1">
                    <span className="text-[13px] font-bold text-gray-500">
                      {item.percentage}%
                    </span>

                    {item.trend === "up" ? (
                      <span className="[&_svg]:stroke-[#E8734A] [&_svg_path]:fill-[#E8734A] [&_svg_path]:!stroke-[#E8734A]">
                        <Icon.ArrowUp size={16} />
                      </span>
                    ) : (
                      <span className="[&_svg]:stroke-[#3EC670] [&_svg_path]:fill-[#3EC670] [&_svg_path]:!stroke-[#3EC670]">
                        <Icon.ArrowDown size={16} />
                      </span>
                    )}
                  </div>

                  <p className="text-[12px] text-gray-400 leading-4">
                    Compare to the last month
                  </p>
                </div>
              </div>

              {(item.detail || []).map((detail, idx) => (
                <div
                  key={`${item.category}-${idx}`}
                  className="flex justify-between items-center px-4 py-4 border-t border-gray-200"
                >
                  <span className="text-[13px] font-bold text-gray-500">
                    {detail.item}
                  </span>

                  <div className="text-right">
                    <p className="text-[13px] font-bold text-gray-600 leading-4">
                      ${detail.amount}
                    </p>
                    <p className="text-[12px] text-gray-400 leading-4">
                      {detail.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Mainlayout>
  );
}

export default ExpensesPage;