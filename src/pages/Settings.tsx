import React, { useState } from "react";

// Types
type TabType =
  | "general"
  | "payments"
  | "shipping"
  | "notifications"
  | "security"
  | "api";

interface GeneralSettings {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  currency: string;
  timezone: string;
  maintenanceMode: boolean;
}

interface PaymentSettings {
  paystackEnabled: boolean;
  paystackPublicKey: string;
  flutterwaveEnabled: boolean;
  cashOnDelivery: boolean;
  taxPercentage: number;
}

interface ShippingSettings {
  flatRate: number;
  freeShippingThreshold: number;
  enableExpressDelivery: boolean;
  expressDeliveryFee: number;
}

interface NotificationSettings {
  emailOrderConfirmation: boolean;
  emailVendorSignup: boolean;
  lowStockAlerts: boolean;
  lowStockThreshold: number;
  smsNotifications: boolean;
}

interface ApiSettings {
  apiKey: string;
  webhookUrl: string;
  environment: "sandbox" | "production";
}

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form States
  const [general, setGeneral] = useState<GeneralSettings>({
    storeName: "Vexa Marketplace",
    supportEmail: "support@vexa.com",
    supportPhone: "+234 800 839 2000",
    currency: "NGN (₦)",
    timezone: "Africa/Lagos (GMT+1)",
    maintenanceMode: false,
  });

  const [payments, setPayments] = useState<PaymentSettings>({
    paystackEnabled: true,
    paystackPublicKey: "pk_live_xxxx...8920",
    flutterwaveEnabled: false,
    cashOnDelivery: true,
    taxPercentage: 7.5,
  });

  const [shipping, setShipping] = useState<ShippingSettings>({
    flatRate: 2500,
    freeShippingThreshold: 100000,
    enableExpressDelivery: true,
    expressDeliveryFee: 5000,
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailOrderConfirmation: true,
    emailVendorSignup: true,
    lowStockAlerts: true,
    lowStockThreshold: 5,
    smsNotifications: false,
  });

  const [api, setApi] = useState<ApiSettings>({
    apiKey: "vx_live_98a76d5e4f3c2b1a0e9f8d",
    webhookUrl: "https://api.vexa.com/v1/webhooks/orders",
    environment: "production",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API request
    setTimeout(() => {
      setIsSaving(false);
      showToast("Settings updated successfully!");
    }, 600);
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "payments", label: "Payments & Tax", icon: "💳" },
    { id: "shipping", label: "Shipping & Delivery", icon: "🚚" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security", label: "Security & Access", icon: "🔒" },
    { id: "api", label: "API & Webhooks", icon: "🔑" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4  max-md:pt-15   xl:pl-70   md:pt-20    w-full xl:pr-10 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <span>✅</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage store preferences, payment integrations, shipping rules, and
            security.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      {/* Main Settings Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar (Mobile Horizontal Scroll / Desktop Vertical List) */}
        <nav className="w-full md:w-64 flex-shrink-0 bg-white border border-gray-200/80 rounded-xl p-2 h-fit shadow-xs">
          <div className="flex md:flex-col overflow-x-auto gap-1 no-scrollbar">
            {tabs.map((tab: { id: TabType; label: string; icon: string }) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap text-left ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content Panel */}
        <main className="flex-1 bg-white border border-gray-200/80 rounded-xl p-5 sm:p-7 shadow-xs">
          <form onSubmit={handleSave}>
            {/* 1. GENERAL SETTINGS */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Store Profile
                  </h2>
                  <p className="text-xs text-gray-500">
                    Basic identification details for Vexa Store.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Store Name
                    </label>
                    <input
                      type="text"
                      value={general.storeName}
                      onChange={(e) =>
                        setGeneral({ ...general, storeName: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Default Currency
                    </label>
                    <input
                      type="text"
                      disabled
                      value={general.currency}
                      className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={general.supportEmail}
                      onChange={(e) =>
                        setGeneral({ ...general, supportEmail: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Support Phone
                    </label>
                    <input
                      type="text"
                      value={general.supportPhone}
                      onChange={(e) =>
                        setGeneral({ ...general, supportPhone: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                      Maintenance Mode
                    </p>
                    <p className="text-xs text-gray-500">
                      Temporarily disable storefront for public users.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={general.maintenanceMode}
                    onChange={(e) =>
                      setGeneral({
                        ...general,
                        maintenanceMode: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* 2. PAYMENTS & TAX */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Payment Gateways & Tax
                  </h2>
                  <p className="text-xs text-gray-500">
                    Configure active payment methods and sales tax rate.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Paystack */}
                  <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-gray-800">
                          Paystack Integration
                        </span>
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          Active
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={payments.paystackEnabled}
                        onChange={(e) =>
                          setPayments({
                            ...payments,
                            paystackEnabled: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                    </div>
                    {payments.paystackEnabled && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Public Key
                        </label>
                        <input
                          type="text"
                          value={payments.paystackPublicKey}
                          onChange={(e) =>
                            setPayments({
                              ...payments,
                              paystackPublicKey: e.target.value,
                            })
                          }
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-xs text-gray-500">
                        Allow customers to pay upon receiving items.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={payments.cashOnDelivery}
                      onChange={(e) =>
                        setPayments({
                          ...payments,
                          cashOnDelivery: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Tax */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      VAT / Tax Percentage (%)
                    </label>
                    <input
                      type="number"
                      value={payments.taxPercentage}
                      onChange={(e) =>
                        setPayments({
                          ...payments,
                          taxPercentage: Number(e.target.value),
                        })
                      }
                      className="w-full sm:w-48 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. SHIPPING & DELIVERY */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Shipping Configurations
                  </h2>
                  <p className="text-xs text-gray-500">
                    Set base delivery rates and free shipping rules.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Standard Flat Rate (₦)
                    </label>
                    <input
                      type="number"
                      value={shipping.flatRate}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          flatRate: Number(e.target.value),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Free Shipping Threshold (₦)
                    </label>
                    <input
                      type="number"
                      value={shipping.freeShippingThreshold}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          freeShippingThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">
                        Express Same-Day Delivery
                      </p>
                      <p className="text-xs text-gray-500">
                        Offer priority local delivery options.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={shipping.enableExpressDelivery}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          enableExpressDelivery: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                    />
                  </div>
                  {shipping.enableExpressDelivery && (
                    <div className="pt-2">
                      <label className="block text-xs text-gray-600 mb-1 font-medium">
                        Express Fee (₦)
                      </label>
                      <input
                        type="number"
                        value={shipping.expressDeliveryFee}
                        onChange={(e) =>
                          setShipping({
                            ...shipping,
                            expressDeliveryFee: Number(e.target.value),
                          })
                        }
                        className="w-full sm:w-60 border border-gray-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Email & System Alerts
                  </h2>
                  <p className="text-xs text-gray-500">
                    Choose when admins and customers receive automated emails.
                  </p>
                </div>

                <div className="space-y-3">
                  {(
                    [
                      {
                        key: "emailOrderConfirmation" as const,
                        title: "Send Order Confirmation Emails",
                        desc: "Send receipt to customers immediately after purchase.",
                      },
                      {
                        key: "emailVendorSignup" as const,
                        title: "Notify Admin on New Vendor Signup",
                        desc: "Get alerted whenever a new vendor applies.",
                      },
                      {
                        key: "lowStockAlerts" as const,
                        title: "Low Inventory Alerts",
                        desc: "Send warning when stock falls below threshold.",
                      },
                    ] as Array<{
                      key:
                        | "emailOrderConfirmation"
                        | "emailVendorSignup"
                        | "lowStockAlerts";
                      title: string;
                      desc: string;
                    }>
                  ).map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-3.5 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                    </div>
                  ))}

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Low Stock Threshold (Units)
                    </label>
                    <input
                      type="number"
                      value={notifications.lowStockThreshold}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          lowStockThreshold: Number(e.target.value),
                        })
                      }
                      className="w-32 border border-gray-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. SECURITY */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Admin Security Settings
                  </h2>
                  <p className="text-xs text-gray-500">
                    Protect administrative access and manage credentials.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-amber-900">
                      Two-Factor Authentication Recommended
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Enforce 2FA for all admin and staff roles accessing the
                      control panel.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full sm:w-72 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. API & WEBHOOKS */}
            {activeTab === "api" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Developer & API Access
                  </h2>
                  <p className="text-xs text-gray-500">
                    Manage REST API keys and order event webhooks.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Live Secret API Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={api.apiKey}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono text-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(api.apiKey);
                          showToast("API Key copied to clipboard!");
                        }}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Order Webhook URL
                    </label>
                    <input
                      type="url"
                      value={api.webhookUrl}
                      onChange={(e) =>
                        setApi({ ...api, webhookUrl: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions for Mobile */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
