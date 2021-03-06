import './NavBar.css'
import CartWidget from "./CartWidget/CartWidget"
import { Link, useParams } from 'react-router-dom'
import { categories } from "../../data/categories"
import { useEffect, useState } from 'react'
const NavBar = () => {

    const { categoryId } = useParams()
    const [category, setCategory] = useState({})

    useEffect(() => {
        setCategory(categories.find(c => c.categoryId === categoryId))
    }, [categoryId])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/"><span className="navbar-brand">Gaming shop</span></Link>
                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to={"/"}>
                            <span className="nav-link" aria-current="page">Inicio</span>
                        </Link></li>
                        <li className="nav-item"><Link to="/">
                            <span className="nav-link">Juegos</span>
                        </Link></li>
                    </ul>
                    {categories.map((c) => (
                        <li key={c.categoryId} className="navbar-nav nav-item"><Link to={`/category/${c.categoryId}`}>
                            <span className="nav-link" aria-current="page">{c.categoryName}</span>
                        </Link></li>)
                    )}
                    <form className="d-flex me-2">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search"></input>
                        <button className="btn btn-outline-success" type="button">Buscar</button>
                    </form>
                    <div>
                        <CartWidget />
                    </div>
                    <div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Ingresar</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default NavBar