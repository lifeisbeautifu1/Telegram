"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../app/hooks");
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute = ({ children }) => {
    const { user } = (0, hooks_1.useAppSelector)((state) => state.auth);
    return <>{user ? children : <react_router_dom_1.Navigate to="/login"/>}</>;
};
exports.default = ProtectedRoute;
