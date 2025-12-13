module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/user-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared user store for authentication demo
__turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "getUserByEmail",
    ()=>getUserByEmail,
    "getUsers",
    ()=>getUsers,
    "listAllUsers",
    ()=>listAllUsers,
    "verifyUser",
    ()=>verifyUser
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
// File path for persistent storage
const USERS_FILE = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), 'users.json');
// Initialize users from file or use defaults
function getUsersFromFile() {
    try {
        if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(USERS_FILE)) {
            const data = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(USERS_FILE, 'utf-8');
            const usersData = JSON.parse(data);
            return new Map(Object.entries(usersData));
        }
    } catch (error) {
        console.log('[v0] Could not read users file, using defaults');
    }
    // Default demo accounts if file doesn't exist
    const defaultUsers = new Map([
        [
            "seller@example.com",
            {
                email: "seller@example.com",
                password: "password123",
                role: "seller",
                fullName: "John Seller",
                storeName: "John's Store",
                username: "johnseller",
                mobileNumber: "1234567890",
                promoCode: "1234",
                verificationStatus: "approved",
                isVerified: true,
                createdAt: new Date().toISOString()
            }
        ],
        [
            "customer@example.com",
            {
                email: "customer@example.com",
                password: "password123",
                role: "customer",
                fullName: "Jane Customer",
                isVerified: true,
                createdAt: new Date().toISOString()
            }
        ]
    ]);
    // Save defaults to file
    saveUsersToFile(defaultUsers);
    return defaultUsers;
}
// Save users to file
function saveUsersToFile(users) {
    try {
        const usersData = Object.fromEntries(users);
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["writeFileSync"])(USERS_FILE, JSON.stringify(usersData, null, 2));
    } catch (error) {
        console.log('[v0] Could not save users file:', error);
    }
}
function getUsers() {
    return getUsersFromFile();
}
function createUser(userData) {
    const users = getUsers();
    const user = {
        ...userData,
        isVerified: userData.role === "customer",
        createdAt: new Date().toISOString()
    };
    users.set(userData.email, user);
    saveUsersToFile(users);
    console.log(`[v0] User created: ${user.email}, role: ${user.role}`);
    return user;
}
function getUserByEmail(email) {
    const users = getUsers();
    return users.get(email);
}
function verifyUser(email, password) {
    const users = getUsers();
    const user = users.get(email);
    if (!user || user.password !== password) {
        console.log(`[v0] Login failed for: ${email}`);
        return null;
    }
    console.log(`[v0] Login successful: ${user.email}, role: ${user.role}`);
    return user;
}
function listAllUsers() {
    const users = getUsers();
    return Array.from(users.values());
}
}),
"[project]/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/user-store.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const { email, password } = await request.json();
        // Validate input
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email and password are required"
            }, {
                status: 400
            });
        }
        // Debug: List all users
        console.log(`[v0] Current users in database:`);
        const allUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listAllUsers"])();
        allUsers.forEach((user)=>{
            console.log(`  - ${user.email} (${user.role}) - verified: ${user.isVerified}`);
        });
        // Verify user credentials
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyUser"])(email, password);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid email or password"
            }, {
                status: 401
            });
        }
        // For sellers, check if they are verified
        if (user.role === "seller" && !user.isVerified) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Your seller account is pending verification. Please wait for admin approval."
            }, {
                status: 403
            });
        }
        // Create session token (mock implementation)
        const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
        // Create response with cookies
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            user: {
                email: user.email,
                role: user.role,
                fullName: user.fullName,
                storeName: user.storeName
            },
            message: "Login successful"
        });
        // Set authentication cookies
        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        response.cookies.set("user_role", user.role, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        response.cookies.set("user_email", email, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        return response;
    } catch (error) {
        console.log("[v0] Login error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Login failed"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__487b39db._.js.map