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
"[project]/lib/user-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared user store for authentication demo
__turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "getUserByEmail",
    ()=>getUserByEmail,
    "users",
    ()=>users,
    "verifyUser",
    ()=>verifyUser
]);
const users = new Map([
    // Pre-configured demo accounts
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
function createUser(userData) {
    const user = {
        ...userData,
        isVerified: userData.role === "customer",
        createdAt: new Date().toISOString()
    };
    users.set(userData.email, user);
    return user;
}
function getUserByEmail(email) {
    return users.get(email);
}
function verifyUser(email, password) {
    const user = users.get(email);
    if (!user || user.password !== password) {
        return null;
    }
    return user;
}
}),
"[project]/app/api/auth/register/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        const formData = await request.formData();
        const role = formData.get("role");
        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const password = formData.get("password");
        // Validate basic fields
        if (!fullName || !email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        // Validate password length
        if (password.length < 8) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Password must be at least 8 characters"
            }, {
                status: 400
            });
        }
        // Check if user already exists
        const existingUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserByEmail"])(email);
        if (existingUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "User with this email already exists"
            }, {
                status: 400
            });
        }
        // Validate seller fields
        let userData = {
            email,
            password,
            role: role,
            fullName
        };
        if (role === "seller") {
            const username = formData.get("username");
            const storeName = formData.get("storeName");
            const mobileNumber = formData.get("mobileNumber");
            const promoCode = formData.get("promoCode");
            const idFrontImage = formData.get("idFrontImage");
            const idBackImage = formData.get("idBackImage");
            if (!username || username.length < 3) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Username must be at least 3 characters"
                }, {
                    status: 400
                });
            }
            if (!storeName) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Store name is required"
                }, {
                    status: 400
                });
            }
            if (!mobileNumber) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Mobile number is required"
                }, {
                    status: 400
                });
            }
            if (!/^\d{4}$/.test(promoCode)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Promo code must be exactly 4 digits"
                }, {
                    status: 400
                });
            }
            if (!idFrontImage || !idBackImage) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "ID images are required"
                }, {
                    status: 400
                });
            }
            // Validate image files
            if (!idFrontImage.type.startsWith("image/") || !idBackImage.type.startsWith("image/")) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Invalid image format"
                }, {
                    status: 400
                });
            }
            // Add seller-specific data
            userData = {
                ...userData,
                username,
                storeName,
                mobileNumber,
                promoCode,
                verificationStatus: "pending" // Sellers need verification
            };
        // TODO: Upload images to Vercel Blob or Supabase when integrations are set up
        // TODO: Verify promo code against database
        }
        // Create user in shared store
        const newUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUser"])(userData);
        console.log(`[v0] User created: ${newUser.email}, role: ${newUser.role}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            role: newUser.role,
            email: newUser.email,
            message: `${newUser.role === "seller" ? "Seller" : "Customer"} registration successful. Please check your email to verify your account.`
        }, {
            status: 201
        });
    } catch (error) {
        console.log("[v0] Register error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Registration failed"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__539bb2f7._.js.map