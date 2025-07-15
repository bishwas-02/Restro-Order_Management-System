import { FaCheckDouble, FaLongArrowAltRight, FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName } from "../../utils/index";

const OrderCard = ({ order }) => {
  if (!order) return <div>Loading...</div>;

  const {
    customerName,
    orderDate,
    items,
    orderStatus,
    table,
    billTotalWithTax,  // Your object has `billTotalWithTax` at root level, not nested inside `bills`
  } = order;

  // Use tableNo from table object safely
  const tableNo = table?.tableNo ?? "N/A";

  // billTotalWithTax is a number, fallback to 0 if not present
  const totalWithTax = typeof billTotalWithTax === "number" ? billTotalWithTax : 0;

  return (
    <div className="w-[500px] bg-[#262626] p-4 rounded-lg mb-4">
      <div className="flex items-center gap-5">
        <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
          {getAvatarName(customerName)}
        </button>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
              {customerName || "Unknown Customer"}
            </h1>
            <p className="text-[#ababab] text-sm">
              #{Math.floor(new Date(orderDate).getTime())} / Dine in
            </p>
            <p className="text-[#ababab] text-sm">
              Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {tableNo}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline mr-2" /> {orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-green-600" /> Ready to serve
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline mr-2" /> {orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-yellow-600" /> Preparing your order
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-[#ababab]">
        <p>{formatDateAndTime(orderDate)}</p>
        <p>{items?.length || 0} Items</p>
      </div>
      <hr className="w-full mt-4 border-t-1 border-gray-500" />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
        <p className="text-[#f5f5f5] text-lg font-semibold">
          Rs {totalWithTax.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
