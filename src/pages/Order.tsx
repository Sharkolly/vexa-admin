import React, { useState, useMemo } from "react";

// Types
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "paid" | "unpaid" | "refunded";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  orderStatus: OrderStatus;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
  };
  trackingNumber?: string;
  createdAt: string;
}

interface AdminOrderListProps {
  initialOrders?: Order[];
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

// Mock Data
const DEFAULT_ORDERS: Order[] = [
  {
    _id: "ord_1001",
    orderNumber: "VEX-2026-8801",
    customerName: "Chidi Nnamdi",
    customerEmail: "chidi.n@gmail.com",
    customerPhone: "+234 803 123 4567",
    totalAmount: 295000,
    paymentStatus: "paid",
    paymentMethod: "Paystack (Card)",
    orderStatus: "processing",
    trackingNumber: "TRK-99201-NG",
    createdAt: "2026-08-04T10:30:00Z",
    shippingAddress: {
      street: "14 Admiralty Way, Lekki Phase 1",
      city: "Lagos",
      state: "Lagos State",
    },
    items: [
      {
        id: "prod_1",
        name: "Dell Latitude 7470 (Touchscreen)",
        quantity: 1,
        price: 295000,
        image:
          "https://res.cloudinary.com/daqmey5dq/image/upload/v1785819003/products/images/ubklgkvnjpljzmr2kpmk.jpg",
      },
    ],
  },
  {
    _id: "ord_1002",
    orderNumber: "VEX-2026-8802",
    customerName: "Amina Bello",
    customerEmail: "amina.bello@yahoo.com",
    customerPhone: "+234 812 987 6543",
    totalAmount: 1850000,
    paymentStatus: "paid",
    paymentMethod: "Bank Transfer",
    orderStatus: "shipped",
    trackingNumber: "GIG-8839201",
    createdAt: "2026-08-03T15:15:00Z",
    shippingAddress: {
      street: "22 Ahmadu Bello Way, Wuse 2",
      city: "Abuja",
      state: "FCT",
    },
    items: [
      {
        id: "prod_2",
        name: "Apple MacBook Pro 16-inch M2 Max",
        quantity: 1,
        price: 1850000,
        image:
          "https://res.cloudinary.com/daqmey5dq/image/upload/v1785819418/products/images/fwupkucxwqarxuglhltt.jpg",
      },
    ],
  },
  {
    _id: "ord_1003",
    orderNumber: "VEX-2026-8803",
    customerName: "Oluwaseun Adebayo",
    customerEmail: "seun.adebayo@outlook.com",
    customerPhone: "+234 705 444 1122",
    totalAmount: 1350000,
    paymentStatus: "unpaid",
    paymentMethod: "Pay on Delivery",
    orderStatus: "pending",
    createdAt: "2026-08-05T08:00:00Z",
    shippingAddress: {
      street: "5 Ring Road, Challenge",
      city: "Ibadan",
      state: "Oyo State",
    },
    items: [
      {
        id: "prod_4",
        name: "Samsung Galaxy S24 Ultra 512GB",
        quantity: 1,
        price: 1350000,
        image:
          "https://res.cloudinary.com/daqmey5dq/image/upload/v1785819419/products/images/pg0b6yrcfgl3qeescdi2.jpg",
      },
    ],
  },
  {
    _id: "ord_1004",
    orderNumber: "VEX-2026-8804",
    customerName: "Grace Okon",
    customerEmail: "grace.o@gmail.com",
    customerPhone: "+234 809 333 7788",
    totalAmount: 240000,
    paymentStatus: "paid",
    paymentMethod: "Paystack (Card)",
    orderStatus: "delivered",
    trackingNumber: "DHL-0012938",
    createdAt: "2026-08-01T11:45:00Z",
    shippingAddress: {
      street: "10 Marian Road",
      city: "Calabar",
      state: "Cross River",
    },
    items: [
      {
        id: "prod_3",
        name: "HP EliteBook 840 G5 Core i5",
        quantity: 1,
        price: 240000,
        image:
          "https://res.cloudinary.com/daqmey5dq/image/upload/v1785819419/products/images/hs2xcxfymqxavrcahxwg.jpg",
      },
    ],
  },
  {
    _id: "ord_1005",
    orderNumber: "VEX-2026-8805",
    customerName: "Emeka Okeke",
    customerEmail: "emeka.okeke@gmail.com",
    customerPhone: "+234 814 222 0011",
    totalAmount: 480000,
    paymentStatus: "refunded",
    paymentMethod: "Paystack (Card)",
    orderStatus: "cancelled",
    createdAt: "2026-07-29T14:20:00Z",
    shippingAddress: {
      street: "80 Ogui Road",
      city: "Enugu",
      state: "Enugu State",
    },
    items: [
      {
        id: "prod_3",
        name: "HP EliteBook 840 G5 Core i5",
        quantity: 2,
        price: 240000,
        image:
          "https://res.cloudinary.com/daqmey5dq/image/upload/v1785819419/products/images/hs2xcxfymqxavrcahxwg.jpg",
      },
    ],
  },
];

export const AdminOrderList: React.FC<AdminOrderListProps> = ({
  initialOrders = DEFAULT_ORDERS,
  onStatusChange,
}) => {
  // --- States ---
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Handlers ---
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord._id === orderId ? { ...ord, orderStatus: newStatus } : ord,
      ),
    );
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder((prev) =>
        prev ? { ...prev, orderStatus: newStatus } : null,
      );
    }
    if (onStatusChange) {
      onStatusChange(orderId, newStatus);
    }
  };

  // Format Currency
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format Date
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --- Filtering ---
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch =
        ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || ord.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  // --- Stats Calculation ---
  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.totalAmount, 0);

    return {
      total: orders.length,
      pending: orders.filter((o) => o.orderStatus === "pending").length,
      processing: orders.filter((o) => o.orderStatus === "processing").length,
      shipped: orders.filter((o) => o.orderStatus === "shipped").length,
      delivered: orders.filter((o) => o.orderStatus === "delivered").length,
      revenue: totalRevenue,
    };
  }, [orders]);

  // Status Badge Helper
  const renderOrderStatusBadge = (status: OrderStatus) => {
    const styles: Record<
      OrderStatus,
      { bg: string; text: string; label: string }
    > = {
      pending: {
        bg: "bg-amber-50 border-amber-200",
        text: "text-amber-700",
        label: "Pending",
      },
      processing: {
        bg: "bg-blue-50 border-blue-200",
        text: "text-blue-700",
        label: "Processing",
      },
      shipped: {
        bg: "bg-indigo-50 border-indigo-200",
        text: "text-indigo-700",
        label: "Shipped",
      },
      delivered: {
        bg: "bg-emerald-50 border-emerald-200",
        text: "text-emerald-700",
        label: "Delivered",
      },
      cancelled: {
        bg: "bg-rose-50 border-rose-200",
        text: "text-rose-700",
        label: "Cancelled",
      },
    };

    const current = styles[status] || styles.pending;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${current.bg} ${current.text}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {current.label}
      </span>
    );
  };

  const renderPaymentStatusBadge = (status: PaymentStatus) => {
    const styles: Record<
      PaymentStatus,
      { bg: string; text: string; label: string }
    > = {
      paid: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Paid" },
      unpaid: { bg: "bg-amber-100", text: "text-amber-800", label: "Unpaid" },
      refunded: { bg: "bg-gray-100", text: "text-gray-700", label: "Refunded" },
    };

    const current = styles[status] || styles.unpaid;

    return (
      <span
        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${current.bg} ${current.text}`}
      >
        {current.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4  max-md:pt-19  xl:pl-70   md:pt-20    w-full xl:pr-10 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Customer Orders
            </h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {orders.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Monitor incoming purchases, fulfill shipments, and manage order
            statuses.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-200/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Total Revenue
          </p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">
            {formatNaira(stats.revenue)}
          </p>
        </div>
        <div className="bg-white border border-gray-200/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
          <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
            Pending Action
          </p>
          <p className="text-lg sm:text-2xl font-bold text-amber-700 mt-1">
            {stats.pending + stats.processing}
          </p>
        </div>
        <div className="bg-white border border-gray-200/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
          <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
            In Transit
          </p>
          <p className="text-lg sm:text-2xl font-bold text-indigo-700 mt-1">
            {stats.shipped}
          </p>
        </div>
        <div className="bg-white border border-gray-200/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
            Completed
          </p>
          <p className="text-lg sm:text-2xl font-bold text-emerald-700 mt-1">
            {stats.delivered}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 sm:p-4 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID, customer name, or email..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-9 pr-8 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:border-blue-600 w-full sm:w-auto"
          >
            <option value="all">All Order Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. DESKTOP ORDERS TABLE (Visible on md: and larger)       */}
      {/* ========================================================= */}
      <div className="hidden md:block bg-white border border-gray-200/80 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No orders match the current filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Order ID */}
                    <td className="py-3 px-4 font-mono font-bold text-gray-900">
                      {order.orderNumber}
                      <div className="text-[10px] text-gray-400 font-sans font-normal">
                        {order.items.length} item
                        {order.items.length > 1 ? "s" : ""}
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">
                        {order.customerName}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {order.customerEmail}
                      </div>
                    </td>

                    {/* Order Date */}
                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 font-bold text-gray-900">
                      {formatNaira(order.totalAmount)}
                    </td>

                    {/* Payment Badge & Method */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {renderPaymentStatusBadge(order.paymentStatus)}
                        <div className="text-[10px] text-gray-400">
                          {order.paymentMethod}
                        </div>
                      </div>
                    </td>

                    {/* Order Status Badge */}
                    <td className="py-3 px-4">
                      {renderOrderStatusBadge(order.orderStatus)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 rounded-lg text-blue-600 hover:bg-blue-50 border border-blue-200 font-semibold text-xs transition-all flex items-center gap-1"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span>Manage</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE ORDERS CARDS (Visible on < md screens)          */}
      {/* ========================================================= */}
      <div className="md:hidden flex flex-col gap-3">
        {paginatedOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-xs">
            No orders match the current filter criteria.
          </div>
        ) : (
          paginatedOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold text-gray-900">
                    {order.orderNumber}
                  </span>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">
                    {order.customerName}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-extrabold text-gray-900">
                    {formatNaira(order.totalAmount)}
                  </div>
                  <div className="mt-1">
                    {renderPaymentStatusBadge(order.paymentStatus)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>{renderOrderStatusBadge(order.orderStatus)}</div>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(order)}
                  className="bg-blue-50 border border-blue-200 text-blue-700 font-bold px-3 py-1 rounded-md text-xs active:scale-95 transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 sm:p-4 shadow-2xs flex items-center justify-between text-xs text-gray-600">
        <div>
          Showing{" "}
          <span className="font-bold text-gray-900">
            {paginatedOrders.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-gray-900">
            {filteredOrders.length}
          </span>{" "}
          orders
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1.5 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            Previous
          </button>
          <span className="px-2 font-semibold">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1.5 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
          >
            Next
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. ORDER DETAIL SLIDE-OVER MODAL                          */}
      {/* ========================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/50 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Modal Header */}
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 font-mono">
                    {selectedOrder.orderNumber}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Placed on {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Status Updater Section */}
              <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-4 mt-4 space-y-3">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Update Fulfillment Status
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) =>
                      handleUpdateStatus(
                        selectedOrder._id,
                        e.target.value as OrderStatus,
                      )
                    }
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {renderOrderStatusBadge(selectedOrder.orderStatus)}
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6 space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Ordered Items ({selectedOrder.items.length})
                </h3>
                <div className="divide-y divide-gray-100 border border-gray-200/80 rounded-xl overflow-hidden bg-white">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-100 bg-gray-50"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-gray-500">
                          {item.quantity} x {formatNaira(item.price)}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-gray-900">
                        {formatNaira(item.quantity * item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer & Shipping Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {/* Customer info */}
                <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 space-y-1">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Customer Info
                  </h4>
                  <p className="text-xs font-bold text-gray-900">
                    {selectedOrder.customerName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedOrder.customerEmail}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedOrder.customerPhone}
                  </p>
                </div>

                {/* Shipping address */}
                <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 space-y-1">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Delivery Address
                  </h4>
                  <p className="text-xs text-gray-800">
                    {selectedOrder.shippingAddress.street}
                  </p>
                  <p className="text-xs text-gray-800">
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}
                  </p>
                  {selectedOrder.trackingNumber && (
                    <p className="text-[11px] font-mono text-blue-600 pt-1">
                      Tracking: {selectedOrder.trackingNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="border-t border-gray-100 pt-4 mt-6 space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Payment Method:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Payment Status:</span>
                  <span>
                    {renderPaymentStatusBadge(selectedOrder.paymentStatus)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-100 pt-2">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    {formatNaira(selectedOrder.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs py-2.5 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
