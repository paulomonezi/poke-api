import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Details } from "../details/details"
import { Home } from "../home"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/pokemon/:name" element={<Details />} />
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }