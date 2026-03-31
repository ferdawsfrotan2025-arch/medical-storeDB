require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");
const initSqlJs = require("sql.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { Pool } = require("pg");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";
const DATABASE_URL = process.env.DATABASE_URL || "";
const IS_POSTGRES = Boolean(DATABASE_URL);
const DB_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DB_DIR, "mediledger.sqlite");
const PUBLIC_FILES = [
  "index.html",
  "app.js",
  "styles.css",
  "manifest.json",
  "service-worker.js",
  "icon.svg",
  "icon-maskable.svg"
];

let SQL;
let sqliteDb;
let pgPool;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function ensureDbDir() {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

function saveSqliteDatabase() {
  if (IS_POSTGRES || !sqliteDb) {
    return;
  }

  ensureDbDir();
  const data = Buffer.from(sqliteDb.export());
  fs.writeFileSync(DB_FILE, data);
}

function convertPlaceholders(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

async function run(sql, params = []) {
  if (IS_POSTGRES) {
    await pgPool.query(convertPlaceholders(sql), params);
    return;
  }

  sqliteDb.run(sql, params);
  saveSqliteDatabase();
}

async function queryAll(sql, params = []) {
  if (IS_POSTGRES) {
    const result = await pgPool.query(convertPlaceholders(sql), params);
    return result.rows;
  }

  const statement = sqliteDb.prepare(sql, params);
  const rows = [];
  while (statement.step()) {
    rows.push(statement.getAsObject());
  }
  statement.free();
  return rows;
}

async function queryOne(sql, params = []) {
  const rows = await queryAll(sql, params);
  return rows[0] || null;
}

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function sendStaticFile(res, fileName) {
  res.sendFile(path.join(__dirname, fileName));
}

function toUserPayload(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    username: row.username,
    displayName: row.displayName || row.display_name,
    role: row.role
  };
}

async function bootstrapPayload(user) {
  return {
    currentUser: user,
    settings: await queryOne("SELECT * FROM settings WHERE id = 1"),
    suppliers: await queryAll("SELECT * FROM suppliers ORDER BY name ASC"),
    medicines: await queryAll("SELECT * FROM medicines ORDER BY name ASC"),
    sales: await queryAll("SELECT * FROM sales ORDER BY sale_date DESC, created_at DESC")
  };
}

const authRequired = asyncHandler(async (req, res, next) => {
  const token = req.cookies.mediledger_token;
  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = toUserPayload(
      await queryOne("SELECT id, username, display_name, role FROM users WHERE id = ?", [payload.userId])
    );

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (_error) {
    return res.status(401).json({ error: "Invalid session." });
  }
});

async function initializeSqlite() {
  SQL = await initSqlJs();
  ensureDbDir();
  const fileBuffer = fs.existsSync(DB_FILE) ? fs.readFileSync(DB_FILE) : null;
  sqliteDb = fileBuffer ? new SQL.Database(fileBuffer) : new SQL.Database();
}

async function initializePostgres() {
  const needsSsl = !/localhost|127\.0\.0\.1/.test(DATABASE_URL);
  pgPool = new Pool({
    connectionString: DATABASE_URL,
    ssl: needsSsl ? { rejectUnauthorized: false } : false
  });
  await pgPool.query("SELECT 1");
}

async function initializeSchema() {
  const schemaStatements = [
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL,
      role TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY,
      store_name TEXT NOT NULL,
      phone TEXT DEFAULT '',
      address TEXT DEFAULT '',
      currency TEXT DEFAULT 'USD',
      invoice_footer TEXT DEFAULT 'Thank you for your purchase.'
    )`,
    `CREATE TABLE IF NOT EXISTS suppliers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT DEFAULT '',
      address TEXT DEFAULT ''
    )`,
    `CREATE TABLE IF NOT EXISTS medicines (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      batch_no TEXT NOT NULL,
      supplier_id TEXT DEFAULT '',
      purchase_price REAL NOT NULL,
      selling_price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      reorder_level INTEGER NOT NULL,
      expiry_date TEXT NOT NULL,
      location TEXT DEFAULT '',
      notes TEXT DEFAULT ''
    )`,
    `CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      invoice_number TEXT NOT NULL,
      medicine_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      customer_name TEXT DEFAULT '',
      sale_date TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      discount_percent REAL NOT NULL DEFAULT 0,
      discount_amount REAL NOT NULL DEFAULT 0,
      cashier_name TEXT NOT NULL,
      total REAL NOT NULL,
      created_at TEXT NOT NULL
    )`
  ];

  for (const statement of schemaStatements) {
    if (IS_POSTGRES) {
      await pgPool.query(statement);
    } else {
      sqliteDb.run(statement);
    }
  }

  if (!IS_POSTGRES) {
    saveSqliteDatabase();
  }
}

async function initializeSeedData() {
  const hasUser = await queryOne("SELECT id FROM users LIMIT 1");
  if (!hasUser) {
    const hash = bcrypt.hashSync("admin123", 10);
    await run(
      "INSERT INTO users (id, username, password_hash, display_name, role) VALUES (?, ?, ?, ?, ?)",
      ["user-admin", "admin", hash, "Admin", "Administrator"]
    );
  }

  const hasSettings = await queryOne("SELECT id FROM settings WHERE id = 1");
  if (!hasSettings) {
    await run(
      "INSERT INTO settings (id, store_name, phone, address, currency, invoice_footer) VALUES (1, ?, '', '', 'USD', ?)",
      ["MediLedger Pharmacy", "Thank you for your purchase."]
    );
  }
}

async function initializeDatabase() {
  if (IS_POSTGRES) {
    await initializePostgres();
  } else {
    await initializeSqlite();
  }

  await initializeSchema();
  await initializeSeedData();
}

async function upsertSupplier(supplier) {
  if (IS_POSTGRES) {
    await run(
      `INSERT INTO suppliers (id, name, contact_person, phone, email, address)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         contact_person = EXCLUDED.contact_person,
         phone = EXCLUDED.phone,
         email = EXCLUDED.email,
         address = EXCLUDED.address`,
      [supplier.id, supplier.name, supplier.contactPerson, supplier.phone, supplier.email, supplier.address]
    );
    return;
  }

  await run(
    `INSERT OR REPLACE INTO suppliers (id, name, contact_person, phone, email, address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [supplier.id, supplier.name, supplier.contactPerson, supplier.phone, supplier.email, supplier.address]
  );
}

async function upsertMedicine(medicine) {
  const values = [
    medicine.id,
    medicine.name,
    medicine.category,
    medicine.batchNo,
    medicine.supplierId,
    medicine.purchasePrice,
    medicine.sellingPrice,
    medicine.quantity,
    medicine.reorderLevel,
    medicine.expiryDate,
    medicine.location,
    medicine.notes
  ];

  if (IS_POSTGRES) {
    await run(
      `INSERT INTO medicines
       (id, name, category, batch_no, supplier_id, purchase_price, selling_price, quantity, reorder_level, expiry_date, location, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         category = EXCLUDED.category,
         batch_no = EXCLUDED.batch_no,
         supplier_id = EXCLUDED.supplier_id,
         purchase_price = EXCLUDED.purchase_price,
         selling_price = EXCLUDED.selling_price,
         quantity = EXCLUDED.quantity,
         reorder_level = EXCLUDED.reorder_level,
         expiry_date = EXCLUDED.expiry_date,
         location = EXCLUDED.location,
         notes = EXCLUDED.notes`,
      values
    );
    return;
  }

  await run(
    `INSERT OR REPLACE INTO medicines
     (id, name, category, batch_no, supplier_id, purchase_price, selling_price, quantity, reorder_level, expiry_date, location, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    values
  );
}

app.get("/", (_req, res) => sendStaticFile(res, "index.html"));
app.get("/index.html", (_req, res) => sendStaticFile(res, "index.html"));
for (const fileName of PUBLIC_FILES.filter((file) => file !== "index.html")) {
  app.get(`/${fileName}`, (_req, res) => sendStaticFile(res, fileName));
}

app.get("/api/auth/me", asyncHandler(async (req, res) => {
  const token = req.cookies.mediledger_token;
  if (!token) {
    return res.json({ currentUser: null });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = toUserPayload(
      await queryOne("SELECT id, username, display_name, role FROM users WHERE id = ?", [payload.userId])
    );
    return res.json({ currentUser: user || null });
  } catch (_error) {
    return res.json({ currentUser: null });
  }
}));

app.post("/api/auth/login", asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await queryOne("SELECT * FROM users WHERE username = ?", [username]);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("mediledger_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.json({ currentUser: toUserPayload(user) });
}));

app.post("/api/auth/logout", (_req, res) => {
  res.clearCookie("mediledger_token");
  res.json({ ok: true });
});

app.post("/api/auth/password", authRequired, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const fullUser = await queryOne("SELECT * FROM users WHERE id = ?", [req.user.id]);

  if (!fullUser || !bcrypt.compareSync(currentPassword, fullUser.password_hash)) {
    return res.status(400).json({ error: "Current password is incorrect." });
  }

  const nextHash = bcrypt.hashSync(newPassword, 10);
  await run("UPDATE users SET password_hash = ? WHERE id = ?", [nextHash, req.user.id]);
  res.json({ ok: true });
}));

app.get("/api/bootstrap", authRequired, asyncHandler(async (req, res) => {
  res.json(await bootstrapPayload(req.user));
}));

app.get("/api/settings", authRequired, asyncHandler(async (_req, res) => {
  res.json(await queryOne("SELECT * FROM settings WHERE id = 1"));
}));

app.put("/api/settings", authRequired, asyncHandler(async (req, res) => {
  const { storeName, phone, address, currency, invoiceFooter } = req.body;
  await run(
    "UPDATE settings SET store_name = ?, phone = ?, address = ?, currency = ?, invoice_footer = ? WHERE id = 1",
    [storeName, phone || "", address || "", currency || "USD", invoiceFooter || ""]
  );
  res.json(await queryOne("SELECT * FROM settings WHERE id = 1"));
}));

app.post("/api/suppliers", authRequired, asyncHandler(async (req, res) => {
  const supplier = {
    id: req.body.id || makeId("sup"),
    name: req.body.name,
    contactPerson: req.body.contactPerson,
    phone: req.body.phone,
    email: req.body.email || "",
    address: req.body.address || ""
  };

  await upsertSupplier(supplier);
  res.json(supplier);
}));

app.delete("/api/suppliers/:id", authRequired, asyncHandler(async (req, res) => {
  const linked = await queryOne("SELECT id FROM medicines WHERE supplier_id = ? LIMIT 1", [req.params.id]);
  if (linked) {
    return res.status(400).json({ error: "This supplier is assigned to medicines. Update those medicines first." });
  }

  await run("DELETE FROM suppliers WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
}));

app.post("/api/medicines", authRequired, asyncHandler(async (req, res) => {
  const medicine = {
    id: req.body.id || makeId("med"),
    name: req.body.name,
    category: req.body.category,
    batchNo: req.body.batchNo,
    supplierId: req.body.supplierId || "",
    purchasePrice: Number(req.body.purchasePrice),
    sellingPrice: Number(req.body.sellingPrice),
    quantity: Number(req.body.quantity),
    reorderLevel: Number(req.body.reorderLevel),
    expiryDate: req.body.expiryDate,
    location: req.body.location || "",
    notes: req.body.notes || ""
  };

  await upsertMedicine(medicine);
  res.json(medicine);
}));

app.delete("/api/medicines/:id", authRequired, asyncHandler(async (req, res) => {
  const linked = await queryOne("SELECT id FROM sales WHERE medicine_id = ? LIMIT 1", [req.params.id]);
  if (linked) {
    return res.status(400).json({ error: "This medicine has sales records. Delete those sales first or keep the medicine for history." });
  }

  await run("DELETE FROM medicines WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
}));

app.post("/api/sales", authRequired, asyncHandler(async (req, res) => {
  const medicine = await queryOne("SELECT * FROM medicines WHERE id = ?", [req.body.medicineId]);
  if (!medicine) {
    return res.status(400).json({ error: "Medicine not found." });
  }

  const quantity = Number(req.body.quantity);
  const discountPercent = Number(req.body.discountPercent || 0);
  if (quantity > Number(medicine.quantity)) {
    return res.status(400).json({ error: "Sale quantity cannot be greater than available stock." });
  }

  const subtotal = Number(medicine.selling_price) * quantity;
  const discountAmount = subtotal * (discountPercent / 100);
  const sale = {
    id: makeId("sale"),
    invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
    medicineId: medicine.id,
    quantity,
    customerName: req.body.customerName || "",
    saleDate: req.body.saleDate,
    paymentMethod: req.body.paymentMethod,
    discountPercent,
    discountAmount,
    cashierName: req.user.displayName,
    total: Math.max(subtotal - discountAmount, 0),
    createdAt: new Date().toISOString()
  };

  await run(
    `INSERT INTO sales
     (id, invoice_number, medicine_id, quantity, customer_name, sale_date, payment_method, discount_percent, discount_amount, cashier_name, total, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      sale.id,
      sale.invoiceNumber,
      sale.medicineId,
      sale.quantity,
      sale.customerName,
      sale.saleDate,
      sale.paymentMethod,
      sale.discountPercent,
      sale.discountAmount,
      sale.cashierName,
      sale.total,
      sale.createdAt
    ]
  );

  await run("UPDATE medicines SET quantity = quantity - ? WHERE id = ?", [quantity, medicine.id]);
  res.json(sale);
}));

app.delete("/api/sales/:id", authRequired, asyncHandler(async (req, res) => {
  const sale = await queryOne("SELECT * FROM sales WHERE id = ?", [req.params.id]);
  if (!sale) {
    return res.status(404).json({ error: "Sale not found." });
  }

  await run("UPDATE medicines SET quantity = quantity + ? WHERE id = ?", [Number(sale.quantity), sale.medicine_id]);
  await run("DELETE FROM sales WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
}));

app.post("/api/admin/seed", authRequired, asyncHandler(async (_req, res) => {
  const supplierA = makeId("sup");
  const supplierB = makeId("sup");
  await run(
    "INSERT INTO suppliers (id, name, contact_person, phone, email, address) VALUES (?, ?, ?, ?, ?, ?)",
    [supplierA, "LifeCare Pharma", "Rahim Safi", "+93 799 111 222", "sales@lifecare.example", "Karte Seh, Kabul"]
  );
  await run(
    "INSERT INTO suppliers (id, name, contact_person, phone, email, address) VALUES (?, ?, ?, ?, ?, ?)",
    [supplierB, "MediSource Traders", "Farzana Noori", "+93 788 333 444", "orders@medisource.example", "Herat Main Bazaar"]
  );
  await run(
    `INSERT INTO medicines
     (id, name, category, batch_no, supplier_id, purchase_price, selling_price, quantity, reorder_level, expiry_date, location, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [makeId("med"), "Paracetamol 500mg", "Tablet", "PCM-2601", supplierA, 1.2, 1.8, 120, 30, "2026-12-31", "Shelf A-1", "Fast moving item"]
  );
  await run(
    `INSERT INTO medicines
     (id, name, category, batch_no, supplier_id, purchase_price, selling_price, quantity, reorder_level, expiry_date, location, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [makeId("med"), "Amoxicillin Syrup", "Syrup", "AMX-2602", supplierB, 2.8, 4.2, 18, 20, "2026-05-15", "Fridge B-3", "Keep refrigerated"]
  );

  res.json({ ok: true });
}));

app.post("/api/admin/clear", authRequired, asyncHandler(async (_req, res) => {
  await run("DELETE FROM sales");
  await run("DELETE FROM medicines");
  await run("DELETE FROM suppliers");
  res.json({ ok: true });
}));

app.get("/api/backup/export", authRequired, asyncHandler(async (req, res) => {
  res.json({
    exportedAt: new Date().toISOString(),
    ...(await bootstrapPayload(req.user))
  });
}));

app.post("/api/backup/import", authRequired, asyncHandler(async (req, res) => {
  const payload = req.body;
  await run("DELETE FROM sales");
  await run("DELETE FROM medicines");
  await run("DELETE FROM suppliers");

  for (const supplier of payload.suppliers || []) {
    await run(
      "INSERT INTO suppliers (id, name, contact_person, phone, email, address) VALUES (?, ?, ?, ?, ?, ?)",
      [
        supplier.id,
        supplier.name,
        supplier.contactPerson || supplier.contact_person || "",
        supplier.phone,
        supplier.email || "",
        supplier.address || ""
      ]
    );
  }

  for (const medicine of payload.medicines || []) {
    await run(
      `INSERT INTO medicines
       (id, name, category, batch_no, supplier_id, purchase_price, selling_price, quantity, reorder_level, expiry_date, location, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        medicine.id,
        medicine.name,
        medicine.category,
        medicine.batchNo || medicine.batch_no,
        medicine.supplierId || medicine.supplier_id || "",
        medicine.purchasePrice ?? medicine.purchase_price,
        medicine.sellingPrice ?? medicine.selling_price,
        medicine.quantity,
        medicine.reorderLevel ?? medicine.reorder_level,
        medicine.expiryDate || medicine.expiry_date,
        medicine.location || "",
        medicine.notes || ""
      ]
    );
  }

  for (const sale of payload.sales || []) {
    await run(
      `INSERT INTO sales
       (id, invoice_number, medicine_id, quantity, customer_name, sale_date, payment_method, discount_percent, discount_amount, cashier_name, total, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sale.id,
        sale.invoiceNumber || sale.invoice_number,
        sale.medicineId || sale.medicine_id,
        sale.quantity,
        sale.customerName || sale.customer_name || "",
        sale.saleDate || sale.sale_date,
        sale.paymentMethod || sale.payment_method,
        sale.discountPercent ?? sale.discount_percent ?? 0,
        sale.discountAmount ?? sale.discount_amount ?? 0,
        sale.cashierName || sale.cashier_name || req.user.displayName,
        sale.total,
        sale.createdAt || sale.created_at || new Date().toISOString()
      ]
    );
  }

  if (payload.settings) {
    await run(
      "UPDATE settings SET store_name = ?, phone = ?, address = ?, currency = ?, invoice_footer = ? WHERE id = 1",
      [
        payload.settings.storeName || payload.settings.store_name || "MediLedger Pharmacy",
        payload.settings.phone || "",
        payload.settings.address || "",
        payload.settings.currency || "USD",
        payload.settings.invoiceFooter || payload.settings.invoice_footer || "Thank you for your purchase."
      ]
    );
  }

  res.json({ ok: true });
}));

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Something went wrong on the server." });
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MediLedger API running on http://localhost:${PORT}`);
      console.log(`Database mode: ${IS_POSTGRES ? "PostgreSQL" : "SQLite"}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
