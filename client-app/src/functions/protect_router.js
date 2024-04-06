import { Navigate, Outlet } from "react-router";


const ProtectRouter = () => {
    let user = JSON.parse(sessionStorage.getItem("isLog"));
    return user === true ? <Outlet /> : <Navigate to={"/"} replace />;
}

export default ProtectRouter;