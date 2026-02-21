import axios from "axios"
import { useEffect, useState } from "react"
import { useProducts } from "../contexts/ProductsContext"
import ProjectsCard from "../components/ProjectsCard"


export default function HomePage() {

    const [projects, setProjects] = useState([])

    const { refProd, refHome, visible } = useProducts()

    function fetchProjects() {

        axios.get(`${import.meta.env.VITE_LARAVEL_API_URL}`)
            .then(res => {
                console.log(res.data.data);
                setProjects(res.data.data)
            })


    }


    useEffect(() => {
        fetchProjects()
    }, [])


    const scroll = () => {
        const section = document.querySelector('#projects');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    return (

        <>
            <section id="home" className="container" ref={refHome}>

                <h1 >JUNIOR WEB DEVELOPER</h1>
                <h1 className="mb-5">FULL-STACK</h1>

                <div className="go-to placeholder-wave">
                    <button className="placeholder" onClick={() => { scroll() }}>
                        <span className="">Vai ai Progetti</span>
                        <i className="bi bi-arrow-down"></i>
                    </button>

                </div>


            </section>

            {/* ref={scrollProjects} */}
            <section id="projects" ref={refProd} >
                <div className="container">
                    <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
                        {projects.map(project => {

                            return (
                                <div className="col" key={project.id}>
                                    <ProjectsCard project={project} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

        </>
    )
}