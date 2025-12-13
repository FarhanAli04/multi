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
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/lib/socket-server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/socket.io/wrapper.mjs [app-route] (ecmascript)");
;
const config = {
    api: {
        bodyParser: false
    }
};
let io = null;
let currentSettings = null;
const fetchSettingsFromAPI = async ()=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/settings`);
        const result = await response.json();
        if (result.success && result.data) {
            currentSettings = result.data;
            return result.data;
        }
    } catch (error) {
        console.error('Error fetching settings:', error);
    }
    return null;
};
const updateSettingsInAPI = async (settings)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        const result = await response.json();
        if (result.success) {
            currentSettings = result.data;
            return result.data;
        }
    } catch (error) {
        console.error('Error updating settings:', error);
    }
    return null;
};
const SocketHandler = async (req, res)=>{
    if (!io) {
        console.log('Initializing Socket.IO server...');
        const httpServer = res.socket.server;
        io = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Server"](httpServer, {
            path: '/api/socket',
            addTrailingSlash: false,
            cors: {
                origin: "*",
                methods: [
                    "GET",
                    "POST"
                ]
            }
        });
        // Load initial settings
        await fetchSettingsFromAPI();
        io.on('connection', (socket)=>{
            console.log('Client connected:', socket.id);
            // Send current settings to new client
            if (currentSettings) {
                socket.emit('settings-update', currentSettings);
            }
            // Handle admin settings changes
            socket.on('admin-settings-change', async (newSettings)=>{
                console.log('Admin settings change received:', newSettings);
                // Update in API
                const updatedSettings = await updateSettingsInAPI(newSettings);
                if (updatedSettings) {
                    // Broadcast to all clients
                    io.emit('settings-update', updatedSettings);
                    console.log('Settings broadcasted to all clients');
                } else {
                    socket.emit('error', {
                        message: 'Failed to update settings'
                    });
                }
            });
            socket.on('disconnect', ()=>{
                console.log('Client disconnected:', socket.id);
            });
        });
        res.socket.server.io = io;
        console.log('Socket.IO server initialized');
    } else {
        console.log('Socket.IO server already running');
    }
    res.end();
};
const __TURBOPACK__default__export__ = SocketHandler;
}),
"[project]/app/api/socket/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "config",
    ()=>config
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/socket-server.ts [app-route] (ecmascript)");
;
const config = {
    api: {
        bodyParser: false
    }
};
async function GET(req) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(req, {
        socket: {
            server: {}
        },
        end: ()=>{},
        json: (data)=>data,
        status: (code)=>({
                json: (data)=>data
            })
    });
}
async function POST(req) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(req, {
        socket: {
            server: {}
        },
        end: ()=>{},
        json: (data)=>data,
        status: (code)=>({
                json: (data)=>data
            })
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8ef614a7._.js.map