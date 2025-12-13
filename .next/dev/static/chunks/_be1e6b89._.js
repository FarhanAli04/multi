(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/contexts/AuthContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jwt-decode/build/esm/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
// Initial state
const initialState = {
    user: null,
    token: ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable",
    isAuthenticated: false,
    isLoading: true,
    error: null
};
// Action types
const AUTH_ACTIONS = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    LOAD_USER: 'LOAD_USER',
    LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
    LOAD_USER_FAILURE: 'LOAD_USER_FAILURE',
    CLEAR_ERROR: 'CLEAR_ERROR'
};
// Reducer
const authReducer = (state, action)=>{
    switch(action.type){
        case AUTH_ACTIONS.LOGIN_START:
        case AUTH_ACTIONS.REGISTER_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case AUTH_ACTIONS.LOGIN_SUCCESS:
        case AUTH_ACTIONS.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null
            };
        case AUTH_ACTIONS.LOGIN_FAILURE:
        case AUTH_ACTIONS.REGISTER_FAILURE:
        case AUTH_ACTIONS.LOAD_USER_FAILURE:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            };
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            };
        case AUTH_ACTIONS.LOAD_USER:
            return {
                ...state,
                isLoading: true
            };
        case AUTH_ACTIONS.LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
// Create context
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
const AuthProvider = ({ children })=>{
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(authReducer, initialState);
    // API base URL
    const apiBase = ("TURBOPACK compile-time value", "http://localhost/sarstore-api") || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_APP_API_URL || 'http://localhost:8000';
    const API_URL = apiBase.endsWith('/api') ? apiBase : `${apiBase}/api`;
    // Load user from token
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const loadUser = {
                "AuthProvider.useEffect.loadUser": async ()=>{
                    const token = localStorage.getItem('token');
                    if (!token) {
                        dispatch({
                            type: AUTH_ACTIONS.LOAD_USER_FAILURE,
                            payload: 'No token found'
                        });
                        return;
                    }
                    try {
                        // Check if token is expired
                        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jwtDecode"])(token);
                        if (decoded.exp * 1000 < Date.now()) {
                            localStorage.removeItem('token');
                            dispatch({
                                type: AUTH_ACTIONS.LOAD_USER_FAILURE,
                                payload: 'Token expired'
                            });
                            return;
                        }
                        // Get user data
                        const response = await fetch(`${API_URL}/auth/me`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        if (!response.ok) {
                            throw new Error('Failed to load user');
                        }
                        const data = await response.json();
                        if (data.success) {
                            dispatch({
                                type: AUTH_ACTIONS.LOAD_USER_SUCCESS,
                                payload: data.user
                            });
                        } else {
                            throw new Error(data.error || 'Failed to load user');
                        }
                    } catch (error) {
                        localStorage.removeItem('token');
                        dispatch({
                            type: AUTH_ACTIONS.LOAD_USER_FAILURE,
                            payload: error.message
                        });
                    }
                }
            }["AuthProvider.useEffect.loadUser"];
            loadUser();
        }
    }["AuthProvider.useEffect"], []);
    // Login
    const login = async (email, password)=>{
        dispatch({
            type: AUTH_ACTIONS.LOGIN_START
        });
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                dispatch({
                    type: AUTH_ACTIONS.LOGIN_SUCCESS,
                    payload: {
                        user: data.user,
                        token: data.token
                    }
                });
                return {
                    success: true
                };
            } else {
                throw new Error(data.error || 'Login failed');
            }
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.LOGIN_FAILURE,
                payload: error.message
            });
            return {
                success: false,
                error: error.message
            };
        }
    };
    // Register
    const register = async (userData)=>{
        dispatch({
            type: AUTH_ACTIONS.REGISTER_START
        });
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                dispatch({
                    type: AUTH_ACTIONS.REGISTER_SUCCESS,
                    payload: {
                        user: data.user,
                        token: data.token
                    }
                });
                return {
                    success: true
                };
            } else {
                throw new Error(data.error || 'Registration failed');
            }
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.REGISTER_FAILURE,
                payload: error.message
            });
            return {
                success: false,
                error: error.message
            };
        }
    };
    // Logout
    const logout = ()=>{
        localStorage.removeItem('token');
        dispatch({
            type: AUTH_ACTIONS.LOGOUT
        });
    };
    // Clear error
    const clearError = ()=>{
        dispatch({
            type: AUTH_ACTIONS.CLEAR_ERROR
        });
    };
    const value = {
        ...state,
        login,
        register,
        logout,
        clearError
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.js",
        lineNumber: 249,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "bgCdjuTOmPdSBRwTap80EFd9Y3U=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useWebSocket.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useWebSocket = ()=>{
    _s();
    const { token, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [typingUsers, setTypingUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [onlineUsers, setOnlineUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectAttemptsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const maxReconnectAttempts = 5;
    const reconnectDelay = 3000;
    // WebSocket URL
    const wsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_APP_WS_URL || 'ws://localhost:8080';
    // Connect to WebSocket
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[connect]": ()=>{
            if (!token) return;
            try {
                const ws = new WebSocket(`${wsUrl}?token=${token}`);
                ws.onopen = ({
                    "useWebSocket.useCallback[connect]": ()=>{
                        console.log('WebSocket connected');
                        setIsConnected(true);
                        setSocket(ws);
                        reconnectAttemptsRef.current = 0;
                    }
                })["useWebSocket.useCallback[connect]"];
                ws.onmessage = ({
                    "useWebSocket.useCallback[connect]": (event)=>{
                        const data = JSON.parse(event.data);
                        switch(data.type){
                            case 'connection_established':
                                console.log('Connection established with user:', data.user_id);
                                break;
                            case 'message':
                                setMessages({
                                    "useWebSocket.useCallback[connect]": (prev)=>[
                                            ...prev,
                                            data
                                        ]
                                }["useWebSocket.useCallback[connect]"]);
                                break;
                            case 'typing':
                                if (data.is_typing) {
                                    setTypingUsers({
                                        "useWebSocket.useCallback[connect]": (prev)=>new Set(prev).add(data.user_id)
                                    }["useWebSocket.useCallback[connect]"]);
                                } else {
                                    setTypingUsers({
                                        "useWebSocket.useCallback[connect]": (prev)=>{
                                            const newSet = new Set(prev);
                                            newSet.delete(data.user_id);
                                            return newSet;
                                        }
                                    }["useWebSocket.useCallback[connect]"]);
                                }
                                break;
                            case 'read_receipt':
                                setMessages({
                                    "useWebSocket.useCallback[connect]": (prev)=>prev.map({
                                            "useWebSocket.useCallback[connect]": (msg)=>msg.id === data.message_id ? {
                                                    ...msg,
                                                    is_read: true,
                                                    read_at: data.read_at
                                                } : msg
                                        }["useWebSocket.useCallback[connect]"])
                                }["useWebSocket.useCallback[connect]"]);
                                break;
                            case 'user_status':
                                if (data.is_online) {
                                    setOnlineUsers({
                                        "useWebSocket.useCallback[connect]": (prev)=>new Set(prev).add(data.user_id)
                                    }["useWebSocket.useCallback[connect]"]);
                                } else {
                                    setOnlineUsers({
                                        "useWebSocket.useCallback[connect]": (prev)=>{
                                            const newSet = new Set(prev);
                                            newSet.delete(data.user_id);
                                            return newSet;
                                        }
                                    }["useWebSocket.useCallback[connect]"]);
                                }
                                break;
                            case 'error':
                                console.error('WebSocket error:', data.message);
                                break;
                            default:
                                console.log('Unknown message type:', data.type);
                        }
                    }
                })["useWebSocket.useCallback[connect]"];
                ws.onclose = ({
                    "useWebSocket.useCallback[connect]": ()=>{
                        console.log('WebSocket disconnected');
                        setIsConnected(false);
                        setSocket(null);
                        // Attempt to reconnect
                        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
                            reconnectTimeoutRef.current = setTimeout({
                                "useWebSocket.useCallback[connect]": ()=>{
                                    reconnectAttemptsRef.current++;
                                    console.log(`Attempting to reconnect (${reconnectAttemptsRef.current}/${maxReconnectAttempts})`);
                                    connect();
                                }
                            }["useWebSocket.useCallback[connect]"], reconnectDelay);
                        }
                    }
                })["useWebSocket.useCallback[connect]"];
                ws.onerror = ({
                    "useWebSocket.useCallback[connect]": (error)=>{
                        console.error('WebSocket error:', error);
                        setIsConnected(false);
                    }
                })["useWebSocket.useCallback[connect]"];
            } catch (error) {
                console.error('Failed to connect to WebSocket:', error);
            }
        }
    }["useWebSocket.useCallback[connect]"], [
        token,
        wsUrl
    ]);
    // Disconnect
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[disconnect]": ()=>{
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (socket) {
                socket.close();
            }
            setIsConnected(false);
            setSocket(null);
            reconnectAttemptsRef.current = 0;
        }
    }["useWebSocket.useCallback[disconnect]"], [
        socket
    ]);
    // Send message
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[sendMessage]": (conversationId, content, messageType = 'text')=>{
            if (!socket || !isConnected) {
                console.error('WebSocket not connected');
                return false;
            }
            const message = {
                type: 'message',
                conversation_id: conversationId,
                content: content,
                message_type: messageType
            };
            socket.send(JSON.stringify(message));
            return true;
        }
    }["useWebSocket.useCallback[sendMessage]"], [
        socket,
        isConnected
    ]);
    // Send typing indicator
    const sendTyping = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[sendTyping]": (conversationId, isTyping)=>{
            if (!socket || !isConnected) return;
            const message = {
                type: 'typing',
                conversation_id: conversationId,
                is_typing: isTyping
            };
            socket.send(JSON.stringify(message));
        }
    }["useWebSocket.useCallback[sendTyping]"], [
        socket,
        isConnected
    ]);
    // Mark message as read
    const markAsRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[markAsRead]": (messageId)=>{
            if (!socket || !isConnected) return;
            const message = {
                type: 'read_receipt',
                message_id: messageId
            };
            socket.send(JSON.stringify(message));
        }
    }["useWebSocket.useCallback[markAsRead]"], [
        socket,
        isConnected
    ]);
    // Update user status
    const updateStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[updateStatus]": (isOnline)=>{
            if (!socket || !isConnected) return;
            const message = {
                type: 'user_status',
                is_online: isOnline
            };
            socket.send(JSON.stringify(message));
        }
    }["useWebSocket.useCallback[updateStatus]"], [
        socket,
        isConnected
    ]);
    // Connect when token is available
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWebSocket.useEffect": ()=>{
            if (token && user) {
                connect();
            } else {
                disconnect();
            }
            return ({
                "useWebSocket.useEffect": ()=>{
                    disconnect();
                }
            })["useWebSocket.useEffect"];
        }
    }["useWebSocket.useEffect"], [
        token,
        user,
        connect,
        disconnect
    ]);
    // Update online status when connection changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWebSocket.useEffect": ()=>{
            if (isConnected && user) {
                updateStatus(true);
            }
            return ({
                "useWebSocket.useEffect": ()=>{
                    if (user) {
                        updateStatus(false);
                    }
                }
            })["useWebSocket.useEffect"];
        }
    }["useWebSocket.useEffect"], [
        isConnected,
        user,
        updateStatus
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWebSocket.useEffect": ()=>{
            return ({
                "useWebSocket.useEffect": ()=>{
                    disconnect();
                }
            })["useWebSocket.useEffect"];
        }
    }["useWebSocket.useEffect"], [
        disconnect
    ]);
    return {
        socket,
        isConnected,
        messages,
        setMessages,
        conversations,
        setConversations,
        typingUsers,
        onlineUsers,
        sendMessage,
        sendTyping,
        markAsRead,
        updateStatus,
        connect,
        disconnect
    };
};
_s(useWebSocket, "Wjj48KlwpC/FB8LDhDeXCg9bpvs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
const __TURBOPACK__default__export__ = useWebSocket;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/chat/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWebSocket.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ChatContent() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { isConnected, messages, sendMessage, sendTyping, markAsRead, onlineUsers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedConversation, setSelectedConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messageInput, setMessageInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const API_URL = ("TURBOPACK compile-time value", "http://localhost/sarstore-api") || 'http://localhost:8000/api';
    // Fetch conversations
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatContent.useEffect": ()=>{
            const fetchConversations = {
                "ChatContent.useEffect.fetchConversations": async ()=>{
                    try {
                        const token = localStorage.getItem('token');
                        const response = await fetch(`${API_URL}/conversations`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        if (response.ok) {
                            const data = await response.json();
                            setConversations(data.conversations || []);
                        }
                    } catch (error) {
                        console.error('Failed to fetch conversations:', error);
                    }
                }
            }["ChatContent.useEffect.fetchConversations"];
            if (user) {
                fetchConversations();
            }
        }
    }["ChatContent.useEffect"], [
        user,
        API_URL
    ]);
    // Scroll to bottom of messages
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatContent.useEffect": ()=>{
            scrollToBottom();
        }
    }["ChatContent.useEffect"], [
        messages
    ]);
    // Handle typing indicator
    const handleTyping = (value)=>{
        setMessageInput(value);
        if (!isTyping && value.length > 0) {
            setIsTyping(true);
            if (selectedConversation) {
                sendTyping(selectedConversation.conversation_id, true);
            }
        }
        if (value.length === 0) {
            setIsTyping(false);
            if (selectedConversation) {
                sendTyping(selectedConversation.conversation_id, false);
            }
        }
        // Clear typing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        // Set typing timeout to stop typing indicator after 1 second of inactivity
        typingTimeoutRef.current = setTimeout(()=>{
            setIsTyping(false);
            if (selectedConversation) {
                sendTyping(selectedConversation.conversation_id, false);
            }
        }, 1000);
    };
    // Send message
    const handleSendMessage = (e)=>{
        e.preventDefault();
        if (!messageInput.trim() || !selectedConversation) return;
        const success = sendMessage(selectedConversation.conversation_id, messageInput.trim());
        if (success) {
            setMessageInput('');
            setIsTyping(false);
            if (selectedConversation) {
                sendTyping(selectedConversation.conversation_id, false);
            }
        }
    };
    // Select conversation
    const selectConversation = async (conversation)=>{
        setSelectedConversation(conversation);
        // Fetch messages for this conversation
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/conversations/${conversation.conversation_id}/messages`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched messages:', data.messages);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "Please login to access chat"
            }, void 0, false, {
                fileName: "[project]/app/chat/page.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/chat/page.tsx",
            lineNumber: 136,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen border border-gray-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-80 border-r border-gray-300 overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-gray-300 font-bold flex justify-between items-center",
                        children: [
                            "Conversations",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`,
                                children: isConnected ? 'Online' : 'Offline'
                            }, void 0, false, {
                                fileName: "[project]/app/chat/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/chat/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    conversations.map((conv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>selectConversation(conv),
                            className: `p-4 border-b border-gray-200 cursor-pointer ${selectedConversation?.conversation_id === conv.conversation_id ? 'bg-gray-100' : 'bg-white'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-bold flex justify-between items-center",
                                    children: [
                                        conv.other_user_name,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm ${onlineUsers.has(conv.other_user_id) ? 'text-green-500' : 'text-gray-500'}`,
                                            children: onlineUsers.has(conv.other_user_id) ? 'Online' : 'Offline'
                                        }, void 0, false, {
                                            fileName: "[project]/app/chat/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/chat/page.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-600 truncate",
                                    children: conv.last_message || 'No messages yet'
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/page.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this),
                                conv.unread_count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-xs mt-2",
                                    children: conv.unread_count
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, conv.conversation_id, true, {
                            fileName: "[project]/app/chat/page.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/page.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col",
                children: selectedConversation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-gray-300 font-bold flex justify-between items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    selectedConversation.other_user_name,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-sm ml-2 ${onlineUsers.has(selectedConversation.other_user_id) ? 'text-green-500' : 'text-gray-500'}`,
                                        children: onlineUsers.has(selectedConversation.other_user_id) ? 'Online' : 'Offline'
                                    }, void 0, false, {
                                        fileName: "[project]/app/chat/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/chat/page.tsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/chat/page.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 p-4 overflow-y-auto bg-gray-50",
                            children: [
                                messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mb-3 flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `max-w-xs px-3 py-2 rounded-2xl ${message.sender_id === user?.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: message.content
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chat/page.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs opacity-70 mt-1",
                                                    children: new Date(message.created_at).toLocaleTimeString()
                                                }, void 0, false, {
                                                    fileName: "[project]/app/chat/page.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/chat/page.tsx",
                                            lineNumber: 202,
                                            columnNumber: 19
                                        }, this)
                                    }, message.id, false, {
                                        fileName: "[project]/app/chat/page.tsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: messagesEndRef
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/page.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chat/page.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSendMessage,
                            className: "p-4 border-t border-gray-300 flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: messageInput,
                                    onChange: (e)=>handleTyping(e.target.value),
                                    placeholder: "Type a message...",
                                    className: "flex-1 px-4 py-2 border border-gray-300 rounded-full mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !messageInput.trim() || !isConnected,
                                    className: `px-4 py-2 rounded-full text-white ${isConnected ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`,
                                    children: "Send"
                                }, void 0, false, {
                                    fileName: "[project]/app/chat/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/chat/page.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-full text-gray-600",
                    children: "Select a conversation to start chatting"
                }, void 0, false, {
                    fileName: "[project]/app/chat/page.tsx",
                    lineNumber: 238,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/chat/page.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/chat/page.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_s(ChatContent, "0L5gwuktDqSJZXj2wl5FVlLKl6c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ChatContent;
function ChatPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatContent, {}, void 0, false, {
            fileName: "[project]/app/chat/page.tsx",
            lineNumber: 250,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/chat/page.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_c1 = ChatPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatContent");
__turbopack_context__.k.register(_c1, "ChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/jwt-decode/build/esm/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidTokenError",
    ()=>InvalidTokenError,
    "jwtDecode",
    ()=>jwtDecode
]);
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p)=>{
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = "0" + code;
        }
        return "%" + code;
    }));
}
function base64UrlDecode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch(output.length % 4){
        case 0:
            break;
        case 2:
            output += "==";
            break;
        case 3:
            output += "=";
            break;
        default:
            throw new Error("base64 string is not of the correct length");
    }
    try {
        return b64DecodeUnicode(output);
    } catch (err) {
        return atob(output);
    }
}
function jwtDecode(token, options) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified: must be a string");
    }
    options || (options = {});
    const pos = options.header === true ? 0 : 1;
    const part = token.split(".")[pos];
    if (typeof part !== "string") {
        throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
    }
    let decoded;
    try {
        decoded = base64UrlDecode(part);
    } catch (e) {
        throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
    }
    try {
        return JSON.parse(decoded);
    } catch (e) {
        throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
    }
}
}),
]);

//# sourceMappingURL=_be1e6b89._.js.map