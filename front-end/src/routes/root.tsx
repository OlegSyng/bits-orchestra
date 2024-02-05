import { NavBar } from "../components/NavBar"
import { Outlet } from "react-router-dom"

export const Root = () => {
    return (
        <div className="pt-16">
            <NavBar />
            <Outlet />
        </div>
    )
}