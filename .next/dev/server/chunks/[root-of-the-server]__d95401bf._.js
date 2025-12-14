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
"[project]/app/api/backend/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function proxy(request, context) {
    const configuredBaseUrl = ("TURBOPACK compile-time value", "http://localhost:8000") || process.env.API_URL || "http://localhost:8000";
    const localDevBaseUrl = "http://localhost:8000";
    let baseUrl = configuredBaseUrl;
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const healthRes = await fetch(`${localDevBaseUrl}/api/health`, {
                signal: AbortSignal.timeout(800)
            });
            if (healthRes.ok) {
                baseUrl = localDevBaseUrl;
            }
        } catch  {}
    }
    const params = await context.params;
    const targetPath = (params?.path || []).join("/");
    const url = new URL(request.url);
    const targetUrl = `${baseUrl}/api/${targetPath}${url.search}`;
    const headers = new Headers(request.headers);
    headers.delete("host");
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const authToken = cookieStore.get("auth_token")?.value;
    const adminToken = cookieStore.get("admin_token")?.value;
    const tokenToUse = targetPath.startsWith("admin/") ? adminToken || authToken : authToken;
    if (tokenToUse) {
        headers.set("Authorization", `Bearer ${tokenToUse}`);
    }
    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
        body = await request.text();
    }
    let response;
    try {
        response = await fetch(targetUrl, {
            method: request.method,
            headers,
            body
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: `Backend unavailable. Start PHP API server at ${baseUrl}`
        }, {
            status: 503,
            headers: {
                "x-proxy-target": targetUrl
            }
        });
    }
    const responseBody = await response.text();
    const contentType = response.headers.get("content-type") || "application/json";
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](responseBody, {
        status: response.status,
        headers: {
            "content-type": contentType,
            "x-proxy-target": targetUrl
        }
    });
}
async function GET(request, context) {
    return proxy(request, context);
}
async function POST(request, context) {
    return proxy(request, context);
}
async function PUT(request, context) {
    return proxy(request, context);
}
async function DELETE(request, context) {
    return proxy(request, context);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d95401bf._.js.map