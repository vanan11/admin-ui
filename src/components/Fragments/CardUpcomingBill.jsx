import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";

function CardUpcomingBill(props) {
  const { data = [], loading = false } = props;

  return (
    <Card
      title="Upcoming Bill"
      link="/bill"
      desc={
        loading ? (
          <div className="h-[190px] flex items-center justify-center">
            <div className="w-16 h-16 border-[5px] border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-6 h-full">
            {(Array.isArray(data) ? data : []).map((item, index) => (
              <div
                key={item.id || `${item.name}-${index}`}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="bg-special-bg min-w-[56px] h-[66px] rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs font-medium">
                      {item.month || item.billMonth || "May"}
                    </span>

                    <span className="text-2xl font-bold leading-none mt-1">
                      {item.date || item.billDate || "15"}
                    </span>
                  </div>

                  <div className="ms-5 flex flex-col justify-center gap-1">
					<div className="flex items-center mb-1">
						{item.icon ||
						(item.name?.toLowerCase().includes("figma") ? (
							<Icon.Figma size={70} />
						) : (
							<Icon.Adobe size={70} />
						))}
					</div>

					<span className="font-bold text-base">
						{item.name || item.title || item.billName}
					</span>

					<span className="text-xs text-gray-500">
						Last Charge -{" "}
						{item.lastCharge || item.last_charge || item.lastChargeDate}
					</span>
					</div>
                </div>

                <div className="flex items-center">
                  <span className="py-2 px-4 border border-gray-200 rounded-lg font-bold text-sm">
                    ${item.amount || item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      }
    />
  );
}

export default CardUpcomingBill;