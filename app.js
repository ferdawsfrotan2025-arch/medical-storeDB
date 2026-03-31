const EXPIRY_WARNING_DAYS = 60;

const translations = {
  en: {
    authEyebrow: "Medical Store Access",
    authCopy: "Sign in to manage medicines, suppliers, invoices, and backups.",
    username: "Username",
    password: "Password",
    usernamePlaceholder: "admin",
    passwordPlaceholder: "admin123",
    signIn: "Sign In",
    defaultLogin: "Default login: admin / admin123",
    sidebarEyebrow: "Medical Store",
    sidebarCopy: "A server-backed medical store app for medicines, suppliers, sales, invoices, and backups.",
    navDashboard: "Dashboard",
    navInventory: "Inventory",
    navSuppliers: "Suppliers",
    navSales: "Sales",
    navSettings: "Settings",
    navBackup: "Backup",
    sessionTitle: "Session",
    language: "Language",
    installApp: "Install App",
    logout: "Logout",
    storeDatabase: "Store Database",
    loadSampleData: "Load Sample Data",
    clearAllData: "Clear All Data",
    totalMedicines: "Total Medicines",
    totalStockUnits: "Total Stock Units",
    suppliers: "Suppliers",
    salesToday: "Sales Today",
    lowStockAlerts: "Low Stock Alerts",
    noLowStockItems: "No low stock items.",
    expiringSoon: "Expiring Soon",
    noExpiringSoon: "No medicines expiring soon.",
    businessSnapshot: "Business Snapshot",
    store: "Store",
    phone: "Phone",
    address: "Address",
    currency: "Currency",
    invoiceReady: "Invoice Ready",
    invoiceReadyCopy: "Every sale can be opened as a printable invoice from the Sales register.",
    noInvoiceGenerated: "No invoice generated yet.",
    recentSales: "Recent Sales",
    noSalesRecorded: "No sales recorded yet.",
    noMedicinesAdded: "No medicines added yet.",
    noSuppliersAdded: "No suppliers added yet.",
    noMatchingMedicines: "No matching medicines found.",
    addUpdateMedicine: "Add / Update Medicine",
    medicineName: "Medicine Name",
    medicineNamePlaceholder: "Paracetamol 500mg",
    category: "Category",
    categoryPlaceholder: "Tablet, Syrup, Injection",
    batchNo: "Batch No",
    batchPlaceholder: "B-2026-001",
    supplier: "Supplier",
    purchasePrice: "Purchase Price",
    sellingPrice: "Selling Price",
    quantity: "Quantity",
    reorderLevel: "Reorder Level",
    expiryDate: "Expiry Date",
    storageLocation: "Storage Location",
    storagePlaceholder: "Shelf A-2",
    notes: "Notes",
    notesPlaceholder: "Prescription only, keep refrigerated, etc.",
    saveMedicine: "Save Medicine",
    reset: "Reset",
    medicineInventory: "Medicine Inventory",
    inventorySearchPlaceholder: "Search medicines or batch number",
    addSupplier: "Add Supplier",
    supplierName: "Supplier Name",
    supplierNamePlaceholder: "HealthCare Distributors",
    contactPerson: "Contact Person",
    contactPersonPlaceholder: "Ahmad Khan",
    phonePlaceholder: "+93 700 000 000",
    email: "Email",
    emailPlaceholder: "supplier@example.com",
    addressPlaceholder: "Street, city, region",
    saveSupplier: "Save Supplier",
    supplierDirectory: "Supplier Directory",
    recordSale: "Record Sale",
    medicine: "Medicine",
    quantitySold: "Quantity Sold",
    customerName: "Customer Name",
    optionalPlaceholder: "Optional",
    saleDate: "Sale Date",
    paymentMethod: "Payment Method",
    cash: "Cash",
    card: "Card",
    mobileMoney: "Mobile Money",
    discountPercent: "Discount (%)",
    saveSale: "Save Sale",
    salesRegister: "Sales Register",
    storeProfile: "Store Profile",
    storeName: "Store Name",
    storeNamePlaceholder: "MediLedger Pharmacy",
    invoiceFooter: "Invoice Footer",
    invoiceFooterPlaceholder: "Thank you for your purchase",
    saveSettings: "Save Settings",
    security: "Security",
    currentPassword: "Current Password",
    newPassword: "New Password",
    changePassword: "Change Password",
    backupRestore: "Backup & Restore",
    exportData: "Export Data",
    exportDataCopy: "Download medicines, suppliers, sales, settings, and users into one JSON backup file.",
    exportBackup: "Export Backup",
    importData: "Import Data",
    importDataCopy: "Restore app data from a previous JSON backup file.",
    printInvoice: "Print Invoice",
    close: "Close",
    selectSupplier: "Select supplier",
    selectMedicine: "Select medicine",
    units: "units",
    edit: "Edit",
    delete: "Delete",
    invoice: "Invoice",
    name: "Name",
    batch: "Batch",
    price: "Price",
    actions: "Actions",
    contact: "Contact",
    date: "Date",
    customer: "Customer",
    payment: "Payment",
    total: "Total",
    subtotal: "Subtotal",
    totalDue: "Total Due",
    cashier: "Cashier",
    footer: "Footer",
    method: "Method",
    addressNotSet: "Address not set",
    phoneNotSet: "Phone not set",
    unknown: "Unknown",
    startupError: "The medical store app could not start.",
    removedMedicine: "Removed medicine",
    unassigned: "Unassigned",
    outOfStock: "Out of stock",
    restockSoon: "Restock soon",
    expired: "Expired",
    daysLeft: "days left",
    batchUnitsLeft: "units left",
    expiresOn: "Expires on",
    walkInCustomer: "Walk-in Customer",
    invalidJsonBackup: "The selected file is not a valid JSON backup.",
    installUnavailable: "Install is not available in this browser right now. You can still use the app normally.",
    selectMedicineAlert: "Please select a medicine.",
    quantityExceededAlert: "Sale quantity cannot be greater than available stock.",
    deleteConfirm: "Are you sure you want to delete this record?",
    supplierLinkedAlert: "This supplier is assigned to medicines. Update those medicines first.",
    medicineLinkedAlert: "This medicine has sales records. Delete those sales first or keep the medicine for history.",
    sampleDataConfirm: "Sample data will be added to existing records. Continue?",
    clearDataConfirm: "This will permanently remove medicines, suppliers, and sales. Continue?",
    signedInAs: "Signed in as",
    dashboardTitle: "dashboard",
    todayPrefix: "Today"
  },
  fa: {
    authEyebrow: "ورود دواخانه",
    authCopy: "برای مدیریت دواها، عرضه‌کنندگان، بل‌ها و نسخه پشتیبان وارد شوید.",
    username: "نام کاربری",
    password: "رمز عبور",
    usernamePlaceholder: "admin",
    passwordPlaceholder: "admin123",
    signIn: "ورود",
    defaultLogin: "ورود پیش‌فرض: admin / admin123",
    sidebarEyebrow: "دواخانه",
    sidebarCopy: "یک برنامه سرورمحور برای دواها، عرضه‌کنندگان، فروش، بل و نسخه پشتیبان.",
    navDashboard: "داشبورد",
    navInventory: "موجودی",
    navSuppliers: "عرضه‌کنندگان",
    navSales: "فروش",
    navSettings: "تنظیمات",
    navBackup: "پشتیبان",
    sessionTitle: "نشست",
    language: "زبان",
    installApp: "نصب برنامه",
    logout: "خروج",
    storeDatabase: "سیستم فروشگاه",
    loadSampleData: "بارگذاری داده آزمایشی",
    clearAllData: "پاک کردن همه داده‌ها",
    totalMedicines: "همه دواها",
    totalStockUnits: "مجموع واحدهای موجودی",
    suppliers: "عرضه‌کنندگان",
    salesToday: "فروش امروز",
    lowStockAlerts: "هشدار کمبود موجودی",
    noLowStockItems: "هیچ مورد کمبود موجودی نیست.",
    expiringSoon: "نزدیک به انقضا",
    noExpiringSoon: "هیچ دوایی به زودی منقضی نمی‌شود.",
    businessSnapshot: "خلاصه تجارت",
    store: "فروشگاه",
    phone: "تلفن",
    address: "آدرس",
    currency: "واحد پول",
    invoiceReady: "بل آماده",
    invoiceReadyCopy: "هر فروش از بخش فروش به صورت بل قابل چاپ باز می‌شود.",
    noInvoiceGenerated: "هنوز بلی ساخته نشده است.",
    recentSales: "فروش‌های اخیر",
    noSalesRecorded: "هنوز فروشی ثبت نشده است.",
    noMedicinesAdded: "هنوز دوایی اضافه نشده است.",
    noSuppliersAdded: "هنوز عرضه‌کننده‌ای اضافه نشده است.",
    noMatchingMedicines: "هیچ دوای مطابق پیدا نشد.",
    addUpdateMedicine: "افزودن / ویرایش دوا",
    medicineName: "نام دوا",
    medicineNamePlaceholder: "پاراستامول ۵۰۰mg",
    category: "دسته‌بندی",
    categoryPlaceholder: "تابلیت، شربت، پیچکاری",
    batchNo: "شماره بچ",
    batchPlaceholder: "B-2026-001",
    supplier: "عرضه‌کننده",
    purchasePrice: "قیمت خرید",
    sellingPrice: "قیمت فروش",
    quantity: "تعداد",
    reorderLevel: "حد سفارش مجدد",
    expiryDate: "تاریخ انقضا",
    storageLocation: "محل نگهداری",
    storagePlaceholder: "قفسه A-2",
    notes: "یادداشت",
    notesPlaceholder: "فقط با نسخه، در یخچال نگهداری شود و غیره.",
    saveMedicine: "ذخیره دوا",
    reset: "بازنشانی",
    medicineInventory: "موجودی دواها",
    inventorySearchPlaceholder: "جستجوی دوا یا شماره بچ",
    addSupplier: "افزودن عرضه‌کننده",
    supplierName: "نام عرضه‌کننده",
    supplierNamePlaceholder: "توزیع‌کننده صحی",
    contactPerson: "شخص تماس",
    contactPersonPlaceholder: "احمد خان",
    phonePlaceholder: "+93 700 000 000",
    email: "ایمیل",
    emailPlaceholder: "supplier@example.com",
    addressPlaceholder: "سرک، شهر، ناحیه",
    saveSupplier: "ذخیره عرضه‌کننده",
    supplierDirectory: "فهرست عرضه‌کنندگان",
    recordSale: "ثبت فروش",
    medicine: "دوا",
    quantitySold: "تعداد فروخته شده",
    customerName: "نام مشتری",
    optionalPlaceholder: "اختیاری",
    saleDate: "تاریخ فروش",
    paymentMethod: "روش پرداخت",
    cash: "نقد",
    card: "کارت",
    mobileMoney: "پول موبایلی",
    discountPercent: "تخفیف (٪)",
    saveSale: "ذخیره فروش",
    salesRegister: "ثبت فروش‌ها",
    storeProfile: "مشخصات فروشگاه",
    storeName: "نام فروشگاه",
    storeNamePlaceholder: "دواخانه مدی‌لجر",
    invoiceFooter: "پاورقی بل",
    invoiceFooterPlaceholder: "از خرید شما سپاسگزاریم",
    saveSettings: "ذخیره تنظیمات",
    security: "امنیت",
    currentPassword: "رمز عبور فعلی",
    newPassword: "رمز عبور جدید",
    changePassword: "تغییر رمز عبور",
    backupRestore: "پشتیبان‌گیری و بازیابی",
    exportData: "صدور داده",
    exportDataCopy: "دواها، عرضه‌کنندگان، فروش‌ها، تنظیمات و کاربران را در یک فایل JSON دانلود کنید.",
    exportBackup: "صدور پشتیبان",
    importData: "وارد کردن داده",
    importDataCopy: "داده‌های برنامه را از فایل پشتیبان JSON قبلی بازیابی کنید.",
    printInvoice: "چاپ بل",
    close: "بستن",
    selectSupplier: "انتخاب عرضه‌کننده",
    selectMedicine: "انتخاب دوا",
    units: "واحد",
    edit: "ویرایش",
    delete: "حذف",
    invoice: "بل",
    name: "نام",
    batch: "بچ",
    price: "قیمت",
    actions: "عملیات",
    contact: "تماس",
    date: "تاریخ",
    customer: "مشتری",
    payment: "پرداخت",
    total: "مجموع",
    subtotal: "فرعی",
    totalDue: "مبلغ قابل پرداخت",
    cashier: "صندوقدار",
    footer: "پاورقی",
    method: "روش",
    addressNotSet: "آدرس ثبت نشده",
    phoneNotSet: "تلفن ثبت نشده",
    unknown: "نامشخص",
    startupError: "برنامه دواخانه شروع نشد.",
    removedMedicine: "دوای حذف شده",
    unassigned: "بدون تعیین",
    outOfStock: "ناموجود",
    restockSoon: "نیاز به تکمیل موجودی",
    expired: "منقضی",
    daysLeft: "روز باقی مانده",
    batchUnitsLeft: "واحد باقی مانده",
    expiresOn: "انقضا در",
    walkInCustomer: "مشتری حضوری",
    invalidJsonBackup: "فایل انتخاب‌شده یک پشتیبان JSON معتبر نیست.",
    installUnavailable: "نصب در این مرورگر فعلاً در دسترس نیست. هنوز می‌توانید از برنامه استفاده کنید.",
    selectMedicineAlert: "لطفاً یک دوا انتخاب کنید.",
    quantityExceededAlert: "تعداد فروش نباید بیشتر از موجودی باشد.",
    deleteConfirm: "آیا مطمئن هستید که می‌خواهید این رکورد حذف شود؟",
    supplierLinkedAlert: "این عرضه‌کننده به دواها وصل است. ابتدا آن دواها را ویرایش کنید.",
    medicineLinkedAlert: "برای این دوا سوابق فروش وجود دارد. ابتدا آن فروش‌ها را حذف کنید یا دوا را برای تاریخچه نگه دارید.",
    sampleDataConfirm: "داده آزمایشی به رکوردهای موجود افزوده می‌شود. ادامه می‌دهید؟",
    clearDataConfirm: "این کار همه دواها، عرضه‌کنندگان و فروش‌ها را حذف می‌کند. ادامه می‌دهید؟",
    signedInAs: "وارد شده به نام",
    dashboardTitle: "داشبورد",
    todayPrefix: "امروز"
  }
};

const state = {
  medicines: [],
  suppliers: [],
  sales: [],
  settings: {
    storeName: "MediLedger Pharmacy",
    phone: "",
    address: "",
    currency: "USD",
    invoiceFooter: "Thank you for your purchase."
  },
  currentUser: null,
  language: localStorage.getItem("medical-store-language") || "en",
  filter: "",
  deferredInstallPrompt: null,
  activeInvoiceId: null
};

const elements = {
  loginScreen: document.getElementById("loginScreen"),
  appRoot: document.getElementById("appRoot"),
  loginForm: document.getElementById("loginForm"),
  loginUsername: document.getElementById("loginUsername"),
  loginPassword: document.getElementById("loginPassword"),
  loginMessage: document.getElementById("loginMessage"),
  logoutBtn: document.getElementById("logoutBtn"),
  installAppBtn: document.getElementById("installAppBtn"),
  languageSelect: document.getElementById("languageSelect"),
  currentUserLabel: document.getElementById("currentUserLabel"),
  todayLabel: document.getElementById("todayLabel"),
  storeNameHeading: document.getElementById("storeNameHeading"),
  snapshotStoreName: document.getElementById("snapshotStoreName"),
  snapshotPhone: document.getElementById("snapshotPhone"),
  snapshotAddress: document.getElementById("snapshotAddress"),
  snapshotCurrency: document.getElementById("snapshotCurrency"),
  lastInvoiceCard: document.getElementById("lastInvoiceCard"),
  totalMedicines: document.getElementById("totalMedicines"),
  totalUnits: document.getElementById("totalUnits"),
  totalSuppliers: document.getElementById("totalSuppliers"),
  salesToday: document.getElementById("salesToday"),
  lowStockCount: document.getElementById("lowStockCount"),
  expiryCount: document.getElementById("expiryCount"),
  lowStockList: document.getElementById("lowStockList"),
  expiryList: document.getElementById("expiryList"),
  recentSalesList: document.getElementById("recentSalesList"),
  inventoryTable: document.getElementById("inventoryTable"),
  supplierTable: document.getElementById("supplierTable"),
  salesTable: document.getElementById("salesTable"),
  medicineForm: document.getElementById("medicineForm"),
  supplierForm: document.getElementById("supplierForm"),
  saleForm: document.getElementById("saleForm"),
  settingsForm: document.getElementById("settingsForm"),
  passwordForm: document.getElementById("passwordForm"),
  settingsMessage: document.getElementById("settingsMessage"),
  inventorySearch: document.getElementById("inventorySearch"),
  medicineSupplier: document.getElementById("medicineSupplier"),
  saleMedicine: document.getElementById("saleMedicine"),
  seedDataBtn: document.getElementById("seedDataBtn"),
  clearDataBtn: document.getElementById("clearDataBtn"),
  exportBtn: document.getElementById("exportBtn"),
  importFile: document.getElementById("importFile"),
  saleDate: document.getElementById("saleDate"),
  storeName: document.getElementById("storeName"),
  storePhone: document.getElementById("storePhone"),
  storeAddress: document.getElementById("storeAddress"),
  storeCurrency: document.getElementById("storeCurrency"),
  invoiceFooter: document.getElementById("invoiceFooter"),
  currentPassword: document.getElementById("currentPassword"),
  newPassword: document.getElementById("newPassword"),
  invoiceDialog: document.getElementById("invoiceDialog"),
  invoiceContent: document.getElementById("invoiceContent"),
  printInvoiceBtn: document.getElementById("printInvoiceBtn"),
  closeInvoiceBtn: document.getElementById("closeInvoiceBtn")
};

function t(key) {
  return translations[state.language]?.[key] || translations.en[key] || key;
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : null;
  if (!response.ok) {
    throw new Error(payload?.error || `Request failed: ${response.status}`);
  }
  return payload;
}

function normalizeSettings(settings) {
  if (!settings) return state.settings;
  return {
    storeName: settings.storeName ?? settings.store_name ?? "MediLedger Pharmacy",
    phone: settings.phone ?? "",
    address: settings.address ?? "",
    currency: settings.currency ?? "USD",
    invoiceFooter: settings.invoiceFooter ?? settings.invoice_footer ?? "Thank you for your purchase."
  };
}

function normalizeSupplier(item) {
  return {
    id: item.id,
    name: item.name,
    contactPerson: item.contactPerson ?? item.contact_person,
    phone: item.phone,
    email: item.email || "",
    address: item.address || ""
  };
}

function normalizeMedicine(item) {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    batchNo: item.batchNo ?? item.batch_no,
    supplierId: item.supplierId ?? item.supplier_id,
    purchasePrice: Number(item.purchasePrice ?? item.purchase_price ?? 0),
    sellingPrice: Number(item.sellingPrice ?? item.selling_price ?? 0),
    quantity: Number(item.quantity ?? 0),
    reorderLevel: Number(item.reorderLevel ?? item.reorder_level ?? 0),
    expiryDate: item.expiryDate ?? item.expiry_date,
    location: item.location || "",
    notes: item.notes || ""
  };
}

function normalizeSale(item) {
  return {
    id: item.id,
    invoiceNumber: item.invoiceNumber ?? item.invoice_number,
    medicineId: item.medicineId ?? item.medicine_id,
    quantity: Number(item.quantity ?? 0),
    customerName: item.customerName ?? item.customer_name ?? "",
    saleDate: item.saleDate ?? item.sale_date,
    paymentMethod: item.paymentMethod ?? item.payment_method,
    discountPercent: Number(item.discountPercent ?? item.discount_percent ?? 0),
    discountAmount: Number(item.discountAmount ?? item.discount_amount ?? 0),
    cashierName: item.cashierName ?? item.cashier_name ?? "",
    total: Number(item.total ?? 0),
    createdAt: item.createdAt ?? item.created_at ?? ""
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatCurrency(amount) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: state.settings.currency || "USD",
    minimumFractionDigits: 2
  }).format(Number(amount || 0));
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString(state.language === "fa" ? "fa-AF" : undefined);
}

function daysUntil(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / 86400000);
}

function translatePaymentMethod(value) {
  if (value === "Cash") return t("cash");
  if (value === "Card") return t("card");
  if (value === "Mobile Money") return t("mobileMoney");
  return value;
}

function medicineById(id) {
  return state.medicines.find((item) => item.id === id);
}

function saleById(id) {
  return state.sales.find((item) => item.id === id);
}

function supplierNameById(id) {
  return state.suppliers.find((item) => item.id === id)?.name || t("unassigned");
}

function applyLanguage() {
  document.documentElement.lang = state.language === "fa" ? "fa" : "en";
  document.documentElement.dir = state.language === "fa" ? "rtl" : "ltr";
  elements.languageSelect.value = state.language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
}

function renderTodayLabel() {
  elements.todayLabel.textContent = `${t("todayPrefix")}: ${new Date().toLocaleDateString(
    state.language === "fa" ? "fa-AF" : undefined,
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  )}`;
}

function updateAuthUI() {
  const loggedIn = Boolean(state.currentUser);
  elements.loginScreen.classList.toggle("hidden", loggedIn);
  elements.appRoot.classList.toggle("hidden", !loggedIn);
  elements.currentUserLabel.textContent = loggedIn
    ? `${t("signedInAs")} ${state.currentUser.displayName} (${state.currentUser.role})`
    : "";
}

function applyStoreBranding() {
  elements.storeNameHeading.textContent = `${state.settings.storeName} ${t("dashboardTitle")}`;
  elements.snapshotStoreName.textContent = state.settings.storeName || "Not set";
  elements.snapshotPhone.textContent = state.settings.phone || t("phoneNotSet");
  elements.snapshotAddress.textContent = state.settings.address || t("addressNotSet");
  elements.snapshotCurrency.textContent = state.settings.currency || "USD";

  elements.storeName.value = state.settings.storeName;
  elements.storePhone.value = state.settings.phone;
  elements.storeAddress.value = state.settings.address;
  elements.storeCurrency.value = state.settings.currency;
  elements.invoiceFooter.value = state.settings.invoiceFooter;
}

function renderAlertList(container, items, formatter, emptyText) {
  if (!items.length) {
    container.className = "list-container empty-state";
    container.textContent = emptyText;
    return;
  }

  container.className = "list-container";
  container.innerHTML = items.map((item) => {
    const view = formatter(item);
    return `
      <article class="list-item">
        <div>
          <strong>${escapeHtml(view.title)}</strong>
          <span>${escapeHtml(view.subtitle)}</span>
        </div>
        <span class="tag ${view.tone}">${escapeHtml(view.tag)}</span>
      </article>
    `;
  }).join("");
}

function renderRecentSales() {
  const sales = state.sales.slice(0, 5);
  if (!sales.length) {
    elements.recentSalesList.className = "table-wrap empty-state";
    elements.recentSalesList.textContent = t("noSalesRecorded");
    return;
  }

  elements.recentSalesList.className = "table-wrap";
  elements.recentSalesList.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>${t("date")}</th>
          <th>${t("invoice")}</th>
          <th>${t("medicine")}</th>
          <th>${t("quantity")}</th>
          <th>${t("customer")}</th>
          <th>${t("total")}</th>
        </tr>
      </thead>
      <tbody>
        ${sales.map((sale) => {
          const medicine = medicineById(sale.medicineId);
          return `
            <tr>
              <td>${formatDate(sale.saleDate)}</td>
              <td>${escapeHtml(sale.invoiceNumber)}</td>
              <td>${escapeHtml(medicine ? medicine.name : t("removedMedicine"))}</td>
              <td>${sale.quantity}</td>
              <td>${escapeHtml(sale.customerName || "-")}</td>
              <td>${formatCurrency(sale.total)}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function renderLastInvoiceCard() {
  const latest = state.sales[0];
  if (!latest) {
    elements.lastInvoiceCard.className = "empty-state";
    elements.lastInvoiceCard.textContent = t("noInvoiceGenerated");
    return;
  }

  const medicine = medicineById(latest.medicineId);
  elements.lastInvoiceCard.className = "list-item";
  elements.lastInvoiceCard.innerHTML = `
    <div>
      <strong>${escapeHtml(latest.invoiceNumber)}</strong>
      <span>${escapeHtml(medicine ? medicine.name : t("removedMedicine"))} - ${formatCurrency(latest.total)}</span>
    </div>
    <button class="table-btn print-btn" data-action="print" data-id="${latest.id}">${t("invoice")}</button>
  `;
}

function renderDashboard() {
  const totalUnits = state.medicines.reduce((sum, item) => sum + item.quantity, 0);
  const today = new Date().toISOString().slice(0, 10);
  const lowStock = state.medicines.filter((item) => item.quantity <= item.reorderLevel);
  const expiringSoon = state.medicines.filter((item) => daysUntil(item.expiryDate) <= EXPIRY_WARNING_DAYS);

  elements.totalMedicines.textContent = state.medicines.length;
  elements.totalUnits.textContent = totalUnits;
  elements.totalSuppliers.textContent = state.suppliers.length;
  elements.salesToday.textContent = state.sales.filter((sale) => sale.saleDate === today).length;
  elements.lowStockCount.textContent = `${lowStock.length} ${t("units")}`;
  elements.expiryCount.textContent = `${expiringSoon.length} ${t("units")}`;

  renderAlertList(elements.lowStockList, lowStock, (item) => ({
    title: item.name,
    subtitle: `${t("batch")} ${item.batchNo} - ${item.quantity} ${t("batchUnitsLeft")}`,
    tag: item.quantity === 0 ? t("outOfStock") : t("restockSoon"),
    tone: item.quantity === 0 ? "danger" : "warning"
  }), t("noLowStockItems"));

  renderAlertList(elements.expiryList, expiringSoon, (item) => {
    const remaining = daysUntil(item.expiryDate);
    return {
      title: item.name,
      subtitle: `${t("expiresOn")} ${formatDate(item.expiryDate)}`,
      tag: remaining < 0 ? t("expired") : `${remaining} ${t("daysLeft")}`,
      tone: remaining < 0 ? "danger" : "warning"
    };
  }, t("noExpiringSoon"));

  renderRecentSales();
  renderLastInvoiceCard();
}

function populateSupplierSelect(selectedId = "") {
  elements.medicineSupplier.innerHTML = [
    `<option value="">${t("selectSupplier")}</option>`,
    ...state.suppliers.map((supplier) => `<option value="${supplier.id}">${escapeHtml(supplier.name)}</option>`)
  ].join("");
  elements.medicineSupplier.value = selectedId;
}

function populateMedicineSelect(selectedId = "") {
  const medicines = state.medicines.filter((item) => item.quantity > 0 || item.id === selectedId);
  elements.saleMedicine.innerHTML = [
    `<option value="">${t("selectMedicine")}</option>`,
    ...medicines.map((medicine) =>
      `<option value="${medicine.id}">${escapeHtml(medicine.name)} (${medicine.quantity} ${t("units")})</option>`
    )
  ].join("");
  elements.saleMedicine.value = selectedId;
}

function renderActionButtons(type, id) {
  const buttons = [];
  if (type === "medicine" || type === "supplier") {
    buttons.push(`<button class="table-btn edit-btn" data-type="${type}" data-id="${id}" data-action="edit">${t("edit")}</button>`);
  }
  if (type === "sale") {
    buttons.push(`<button class="table-btn print-btn" data-type="sale" data-id="${id}" data-action="print">${t("invoice")}</button>`);
  }
  buttons.push(`<button class="table-btn delete-btn" data-type="${type}" data-id="${id}" data-action="delete">${t("delete")}</button>`);
  return `<div class="action-group">${buttons.join("")}</div>`;
}

function renderInventory() {
  populateSupplierSelect(elements.medicineSupplier.value);
  populateMedicineSelect(elements.saleMedicine.value);
  const query = state.filter.trim().toLowerCase();
  const medicines = state.medicines.filter((item) => {
    if (!query) return true;
    return [item.name, item.category, item.batchNo].some((field) => String(field || "").toLowerCase().includes(query));
  });

  if (!medicines.length) {
    elements.inventoryTable.className = "table-wrap empty-state";
    elements.inventoryTable.textContent = state.filter ? t("noMatchingMedicines") : t("noMedicinesAdded");
    return;
  }

  elements.inventoryTable.className = "table-wrap";
  elements.inventoryTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>${t("name")}</th>
          <th>${t("category")}</th>
          <th>${t("batch")}</th>
          <th>${t("supplier")}</th>
          <th>${t("quantity")}</th>
          <th>${t("expiryDate")}</th>
          <th>${t("price")}</th>
          <th>${t("actions")}</th>
        </tr>
      </thead>
      <tbody>
        ${medicines.map((medicine) => `
          <tr>
            <td>${escapeHtml(medicine.name)}</td>
            <td>${escapeHtml(medicine.category)}</td>
            <td>${escapeHtml(medicine.batchNo)}</td>
            <td>${escapeHtml(supplierNameById(medicine.supplierId))}</td>
            <td>${medicine.quantity}</td>
            <td>${formatDate(medicine.expiryDate)}</td>
            <td>${formatCurrency(medicine.sellingPrice)}</td>
            <td>${renderActionButtons("medicine", medicine.id)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderSuppliers() {
  if (!state.suppliers.length) {
    elements.supplierTable.className = "table-wrap empty-state";
    elements.supplierTable.textContent = t("noSuppliersAdded");
    return;
  }

  elements.supplierTable.className = "table-wrap";
  elements.supplierTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>${t("name")}</th>
          <th>${t("contact")}</th>
          <th>${t("phone")}</th>
          <th>${t("email")}</th>
          <th>${t("actions")}</th>
        </tr>
      </thead>
      <tbody>
        ${state.suppliers.map((supplier) => `
          <tr>
            <td>${escapeHtml(supplier.name)}</td>
            <td>${escapeHtml(supplier.contactPerson)}</td>
            <td>${escapeHtml(supplier.phone)}</td>
            <td>${escapeHtml(supplier.email || "-")}</td>
            <td>${renderActionButtons("supplier", supplier.id)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderSales() {
  populateMedicineSelect(elements.saleMedicine.value);
  if (!state.sales.length) {
    elements.salesTable.className = "table-wrap empty-state";
    elements.salesTable.textContent = t("noSalesRecorded");
    return;
  }

  elements.salesTable.className = "table-wrap";
  elements.salesTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>${t("date")}</th>
          <th>${t("invoice")}</th>
          <th>${t("medicine")}</th>
          <th>${t("quantity")}</th>
          <th>${t("payment")}</th>
          <th>${t("discountPercent")}</th>
          <th>${t("total")}</th>
          <th>${t("actions")}</th>
        </tr>
      </thead>
      <tbody>
        ${state.sales.map((sale) => {
          const medicine = medicineById(sale.medicineId);
          return `
            <tr>
              <td>${formatDate(sale.saleDate)}</td>
              <td>${escapeHtml(sale.invoiceNumber)}</td>
              <td>${escapeHtml(medicine ? medicine.name : t("removedMedicine"))}</td>
              <td>${sale.quantity}</td>
              <td>${escapeHtml(translatePaymentMethod(sale.paymentMethod))}</td>
              <td>${sale.discountPercent.toFixed(2)}%</td>
              <td>${formatCurrency(sale.total)}</td>
              <td>${renderActionButtons("sale", sale.id)}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function showView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === `${viewName}View`);
  });
  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
}

function resetMedicineForm() {
  elements.medicineForm.reset();
  document.getElementById("medicineId").value = "";
  populateSupplierSelect();
}

function resetSupplierForm() {
  elements.supplierForm.reset();
  document.getElementById("supplierId").value = "";
}

async function loadBootstrap() {
  const payload = await api("/api/bootstrap");
  state.currentUser = payload.currentUser;
  state.settings = normalizeSettings(payload.settings);
  state.suppliers = (payload.suppliers || []).map(normalizeSupplier);
  state.medicines = (payload.medicines || []).map(normalizeMedicine);
  state.sales = (payload.sales || []).map(normalizeSale);
}

async function refreshUI() {
  applyLanguage();
  renderTodayLabel();
  const me = await api("/api/auth/me");
  state.currentUser = me.currentUser;
  updateAuthUI();
  if (!state.currentUser) return;

  await loadBootstrap();
  applyStoreBranding();
  updateAuthUI();
  renderDashboard();
  renderInventory();
  renderSuppliers();
  renderSales();
}

async function handleLogin(event) {
  event.preventDefault();
  try {
    await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: elements.loginUsername.value.trim(),
        password: elements.loginPassword.value
      })
    });
    elements.loginForm.reset();
    elements.loginMessage.textContent = "";
    await refreshUI();
  } catch (error) {
    elements.loginMessage.textContent = error.message;
  }
}

async function handleLogout() {
  await api("/api/auth/logout", { method: "POST", body: JSON.stringify({}) });
  state.currentUser = null;
  updateAuthUI();
}

async function handleSettingsSubmit(event) {
  event.preventDefault();
  try {
    state.settings = normalizeSettings(await api("/api/settings", {
      method: "PUT",
      body: JSON.stringify({
        storeName: elements.storeName.value.trim(),
        phone: elements.storePhone.value.trim(),
        address: elements.storeAddress.value.trim(),
        currency: elements.storeCurrency.value,
        invoiceFooter: elements.invoiceFooter.value.trim()
      })
    }));
    elements.settingsMessage.textContent = "Saved.";
    await refreshUI();
  } catch (error) {
    elements.settingsMessage.textContent = error.message;
  }
}

async function handlePasswordSubmit(event) {
  event.preventDefault();
  try {
    await api("/api/auth/password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: elements.currentPassword.value,
        newPassword: elements.newPassword.value
      })
    });
    elements.passwordForm.reset();
    elements.settingsMessage.textContent = "Password updated.";
  } catch (error) {
    elements.settingsMessage.textContent = error.message;
  }
}

async function handleMedicineSubmit(event) {
  event.preventDefault();
  try {
    await api("/api/medicines", {
      method: "POST",
      body: JSON.stringify({
        id: document.getElementById("medicineId").value || undefined,
        name: document.getElementById("medicineName").value.trim(),
        category: document.getElementById("medicineCategory").value.trim(),
        batchNo: document.getElementById("medicineBatch").value.trim(),
        supplierId: elements.medicineSupplier.value,
        purchasePrice: Number(document.getElementById("medicinePurchasePrice").value),
        sellingPrice: Number(document.getElementById("medicineSellingPrice").value),
        quantity: Number(document.getElementById("medicineQuantity").value),
        reorderLevel: Number(document.getElementById("medicineReorderLevel").value),
        expiryDate: document.getElementById("medicineExpiryDate").value,
        location: document.getElementById("medicineLocation").value.trim(),
        notes: document.getElementById("medicineNotes").value.trim()
      })
    });
    resetMedicineForm();
    await refreshUI();
  } catch (error) {
    alert(error.message);
  }
}

async function handleSupplierSubmit(event) {
  event.preventDefault();
  try {
    await api("/api/suppliers", {
      method: "POST",
      body: JSON.stringify({
        id: document.getElementById("supplierId").value || undefined,
        name: document.getElementById("supplierName").value.trim(),
        contactPerson: document.getElementById("supplierContact").value.trim(),
        phone: document.getElementById("supplierPhone").value.trim(),
        email: document.getElementById("supplierEmail").value.trim(),
        address: document.getElementById("supplierAddress").value.trim()
      })
    });
    resetSupplierForm();
    await refreshUI();
  } catch (error) {
    alert(error.message);
  }
}

async function handleSaleSubmit(event) {
  event.preventDefault();
  const medicineId = elements.saleMedicine.value;
  if (!medicineId) {
    alert(t("selectMedicineAlert"));
    return;
  }

  try {
    const sale = normalizeSale(await api("/api/sales", {
      method: "POST",
      body: JSON.stringify({
        medicineId,
        quantity: Number(document.getElementById("saleQuantity").value),
        customerName: document.getElementById("saleCustomer").value.trim(),
        saleDate: document.getElementById("saleDate").value,
        paymentMethod: document.getElementById("salePaymentMethod").value,
        discountPercent: Number(document.getElementById("saleDiscount").value || 0)
      })
    }));
    elements.saleForm.reset();
    elements.saleDate.value = new Date().toISOString().slice(0, 10);
    await refreshUI();
    showInvoice(sale.id);
  } catch (error) {
    alert(error.message);
  }
}

function fillMedicineForm(id) {
  const medicine = medicineById(id);
  if (!medicine) return;
  document.getElementById("medicineId").value = medicine.id;
  document.getElementById("medicineName").value = medicine.name;
  document.getElementById("medicineCategory").value = medicine.category;
  document.getElementById("medicineBatch").value = medicine.batchNo;
  populateSupplierSelect(medicine.supplierId || "");
  document.getElementById("medicinePurchasePrice").value = medicine.purchasePrice;
  document.getElementById("medicineSellingPrice").value = medicine.sellingPrice;
  document.getElementById("medicineQuantity").value = medicine.quantity;
  document.getElementById("medicineReorderLevel").value = medicine.reorderLevel;
  document.getElementById("medicineExpiryDate").value = medicine.expiryDate;
  document.getElementById("medicineLocation").value = medicine.location || "";
  document.getElementById("medicineNotes").value = medicine.notes || "";
  showView("inventory");
}

function fillSupplierForm(id) {
  const supplier = state.suppliers.find((item) => item.id === id);
  if (!supplier) return;
  document.getElementById("supplierId").value = supplier.id;
  document.getElementById("supplierName").value = supplier.name;
  document.getElementById("supplierContact").value = supplier.contactPerson;
  document.getElementById("supplierPhone").value = supplier.phone;
  document.getElementById("supplierEmail").value = supplier.email || "";
  document.getElementById("supplierAddress").value = supplier.address || "";
  showView("suppliers");
}

async function removeItem(type, id) {
  if (!confirm(t("deleteConfirm"))) return;
  try {
    if (type === "supplier") {
      await api(`/api/suppliers/${id}`, { method: "DELETE" });
    }
    if (type === "medicine") {
      await api(`/api/medicines/${id}`, { method: "DELETE" });
    }
    if (type === "sale") {
      await api(`/api/sales/${id}`, { method: "DELETE" });
    }
    await refreshUI();
  } catch (error) {
    alert(error.message);
  }
}

function createInvoiceMarkup(sale) {
  const medicine = medicineById(sale.medicineId);
  const subtotal = (medicine ? medicine.sellingPrice : 0) * sale.quantity;
  return `
    <div class="invoice-header">
      <div>
        <p class="eyebrow">${t("invoice")}</p>
        <h2>${escapeHtml(state.settings.storeName)}</h2>
        <p>${escapeHtml(state.settings.address || t("addressNotSet"))}</p>
        <p>${escapeHtml(state.settings.phone || t("phoneNotSet"))}</p>
      </div>
      <div class="invoice-block">
        <strong>${escapeHtml(sale.invoiceNumber)}</strong>
        <p>${t("date")}: ${formatDate(sale.saleDate)}</p>
        <p>${t("cashier")}: ${escapeHtml(sale.cashierName || t("unknown"))}</p>
        <p>${t("customer")}: ${escapeHtml(sale.customerName || t("walkInCustomer"))}</p>
      </div>
    </div>
    <div class="invoice-meta">
      <div class="invoice-block">
        <strong>${t("medicine")}</strong>
        <p>${escapeHtml(medicine ? medicine.name : t("removedMedicine"))}</p>
        <p>${t("batch")}: ${escapeHtml(medicine ? medicine.batchNo : "-")}</p>
      </div>
      <div class="invoice-block">
        <strong>${t("payment")}</strong>
        <p>${t("method")}: ${escapeHtml(translatePaymentMethod(sale.paymentMethod))}</p>
        <p>${t("quantity")}: ${sale.quantity}</p>
      </div>
    </div>
    <div class="invoice-summary">
      <div class="invoice-block">
        <strong>${t("subtotal")}</strong>
        <p>${formatCurrency(subtotal)}</p>
      </div>
      <div class="invoice-block">
        <strong>${t("discountPercent")}</strong>
        <p>${sale.discountPercent.toFixed(2)}% (${formatCurrency(sale.discountAmount)})</p>
      </div>
      <div class="invoice-block">
        <strong>${t("totalDue")}</strong>
        <p class="invoice-total">${formatCurrency(sale.total)}</p>
      </div>
      <div class="invoice-block">
        <strong>${t("footer")}</strong>
        <p>${escapeHtml(state.settings.invoiceFooter)}</p>
      </div>
    </div>
  `;
}

function showInvoice(id) {
  const sale = saleById(id);
  if (!sale) return;
  state.activeInvoiceId = id;
  elements.invoiceContent.innerHTML = createInvoiceMarkup(sale);
  elements.invoiceDialog.showModal();
}

function printInvoice() {
  const sale = saleById(state.activeInvoiceId);
  if (!sale) return;
  const popup = window.open("", "_blank", "width=900,height=700");
  if (!popup) return;
  popup.document.write(`
    <!DOCTYPE html>
    <html lang="${state.language}">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(sale.invoiceNumber)}</title>
      <style>
        body { font-family: Arial, sans-serif; color: #16251f; padding: 24px; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px; color: #137156; }
        .invoice-header, .invoice-meta, .invoice-summary { display: grid; gap: 16px; margin-bottom: 18px; }
        .invoice-header { grid-template-columns: 1.4fr 1fr; }
        .invoice-meta, .invoice-summary { grid-template-columns: repeat(2, 1fr); }
        .invoice-block { padding: 16px; background: #f4f8f6; border-radius: 14px; }
        h2 { margin: 0 0 12px; }
        p { margin: 6px 0; }
      </style>
    </head>
    <body>${createInvoiceMarkup(sale)}</body>
    </html>
  `);
  popup.document.close();
  popup.focus();
  popup.print();
}

async function exportBackup() {
  const payload = await api("/api/backup/export");
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `medical-store-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importBackup(event) {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    await api("/api/backup/import", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    event.target.value = "";
    await refreshUI();
  } catch (error) {
    alert(error.message || t("invalidJsonBackup"));
  }
}

async function seedSampleData() {
  if (!confirm(t("sampleDataConfirm"))) return;
  await api("/api/admin/seed", { method: "POST", body: JSON.stringify({}) });
  await refreshUI();
}

async function clearAllData() {
  if (!confirm(t("clearDataConfirm"))) return;
  await api("/api/admin/clear", { method: "POST", body: JSON.stringify({}) });
  await refreshUI();
}

async function handleInstallClick() {
  if (!state.deferredInstallPrompt) {
    alert(t("installUnavailable"));
    return;
  }
  state.deferredInstallPrompt.prompt();
  await state.deferredInstallPrompt.userChoice;
  state.deferredInstallPrompt = null;
  elements.installAppBtn.classList.add("hidden");
}

function bindEvents() {
  document.querySelectorAll(".nav-link").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  elements.loginForm.addEventListener("submit", handleLogin);
  elements.logoutBtn.addEventListener("click", handleLogout);
  elements.installAppBtn.addEventListener("click", handleInstallClick);
  elements.languageSelect.addEventListener("change", async (event) => {
    state.language = event.target.value;
    localStorage.setItem("medical-store-language", state.language);
    await refreshUI();
  });
  elements.medicineForm.addEventListener("submit", handleMedicineSubmit);
  elements.supplierForm.addEventListener("submit", handleSupplierSubmit);
  elements.saleForm.addEventListener("submit", handleSaleSubmit);
  elements.settingsForm.addEventListener("submit", handleSettingsSubmit);
  elements.passwordForm.addEventListener("submit", handlePasswordSubmit);
  elements.inventorySearch.addEventListener("input", (event) => {
    state.filter = event.target.value;
    renderInventory();
  });
  document.getElementById("resetMedicineBtn").addEventListener("click", resetMedicineForm);
  document.getElementById("resetSupplierBtn").addEventListener("click", resetSupplierForm);
  elements.seedDataBtn.addEventListener("click", seedSampleData);
  elements.clearDataBtn.addEventListener("click", clearAllData);
  elements.exportBtn.addEventListener("click", exportBackup);
  elements.importFile.addEventListener("change", importBackup);
  elements.printInvoiceBtn.addEventListener("click", printInvoice);
  elements.closeInvoiceBtn.addEventListener("click", () => elements.invoiceDialog.close());

  document.body.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action, type, id } = button.dataset;
    if (action === "edit" && type === "medicine") return fillMedicineForm(id);
    if (action === "edit" && type === "supplier") return fillSupplierForm(id);
    if (action === "print") return showInvoice(id);
    if (action === "delete") return removeItem(type, id);
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
    elements.installAppBtn.classList.remove("hidden");
  });
}

async function init() {
  elements.saleDate.value = new Date().toISOString().slice(0, 10);
  applyLanguage();
  renderTodayLabel();
  bindEvents();
  await refreshUI();
}

init().catch((error) => {
  console.error(error);
  alert(error.message || t("startupError"));
});
