import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Details } from "./details"
import { Home } from "."

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/pokemons/nome" element={<Details />} />
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }