import { useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";

export default function Header() {

    const { ref, visible } = useProducts()

    const scroll = () => {
        const section = document.querySelector('#projects');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const scrollProjects = useRef();

    return (
        <header>

            <nav className={`navbar navbar-expand-sm ${visible ? 'bg-nav-prod' : 'bg-transparent'}`}>
                <div className="container-fluid d-flex justify-content-between pt-2 ps-4 pe-4 fs-4">
                    <div>
                        <Link className="navbar-brand fs-4" to={'/'}>Portfolio</Link>
                    </div>

                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to={'/'}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => { scroll() }} >Projects</button>
                                    {/* <button onClick={() => { scrollProjects.current.scrollIntoView() }} >Projects</button> */}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-disabled="true">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-disabled="true">Contatti</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>

        </header>
    )
}