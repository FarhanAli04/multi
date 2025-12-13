(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/contexts/RealtimeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RealtimeProvider",
    ()=>RealtimeProvider,
    "useRealtime",
    ()=>useRealtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const defaultSettings = {
    website_name: "Syed Asad Raza",
    tagline: "Your Premier Multi-Vendor Marketplace",
    logo_url: null,
    favicon_url: null,
    currency: "USD",
    timezone: "UTC",
    email: "admin@sar.com",
    phone: "+1 234 567 8900",
    address: "123 Business Street, City, Country",
    refund_policy: "",
    return_policy: "",
    terms_conditions: ""
};
const RealtimeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useRealtime = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(RealtimeContext);
    if (!context) {
        throw new Error('useRealtime must be used within a RealtimeProvider');
    }
    return context;
};
_s(useRealtime, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const RealtimeProvider = ({ children })=>{
    _s1();
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSettings);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RealtimeProvider.useEffect": ()=>{
            let isMounted = true;
            const loadSettings = {
                "RealtimeProvider.useEffect.loadSettings": async ()=>{
                    try {
                        const res = await fetch('/api/settings');
                        const data = await res.json().catch({
                            "RealtimeProvider.useEffect.loadSettings": ()=>null
                        }["RealtimeProvider.useEffect.loadSettings"]);
                        if (!res.ok || !data?.success || !data?.data) {
                            if (isMounted) setIsConnected(false);
                            return;
                        }
                        if (isMounted) {
                            setSettings({
                                "RealtimeProvider.useEffect.loadSettings": (prev)=>({
                                        ...prev,
                                        ...data.data
                                    })
                            }["RealtimeProvider.useEffect.loadSettings"]);
                            setIsConnected(true);
                        }
                    } catch  {
                        if (isMounted) setIsConnected(false);
                    }
                }
            }["RealtimeProvider.useEffect.loadSettings"];
            loadSettings();
            return ({
                "RealtimeProvider.useEffect": ()=>{
                    isMounted = false;
                }
            })["RealtimeProvider.useEffect"];
        }
    }["RealtimeProvider.useEffect"], []);
    const updateSettings = (newSettings)=>{
        const run = async ()=>{
            try {
                const res = await fetch('/api/settings', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newSettings)
                });
                const data = await res.json().catch(()=>null);
                if (!res.ok || !data?.success) {
                    setIsConnected(false);
                    return;
                }
                if (data?.data) {
                    setSettings((prev)=>({
                            ...prev,
                            ...data.data
                        }));
                }
                setIsConnected(true);
            } catch  {
                setIsConnected(false);
            }
        };
        run();
    };
    const value = {
        settings,
        updateSettings,
        isConnected
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RealtimeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/RealtimeContext.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(RealtimeProvider, "LbCtvmoszVCoKkomCqrmo/JXKoM=");
_c = RealtimeProvider;
var _c;
__turbopack_context__.k.register(_c, "RealtimeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8b597680._.js.map