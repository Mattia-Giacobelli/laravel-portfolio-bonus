import axios from "axios"
import { useEffect, useState } from "react"
import { useProducts } from "../contexts/ProductsContext"
import ProjectsCard from "../components/ProjectsCard"
import { supabase } from "../supabase"
import profile from "../assets/foto-profilo.png"


export default function HomePage() {

    const [projects, setProjects] = useState([])

    const { refProducts, refHome, visible, setRefs } = useProducts()

    async function fetchProjects() {

        // axios.get(`${import.meta.env.VITE_LARAVEL_API_URL}`)
        //     .then(res => {
        //         console.log(res.data.data);
        //         setProjects(res.data.data)
        //     })

        const { data, error } = await supabase
            .from('projects')
            .select(` *, type:types(*), project_technology( technologies(*) ), project_media( media(*) ) `)

        if (error) {
            console.log(error)
            return []
        }

        console.log(data);


        setProjects(data)

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
            <section id="home" ref={(el) => setRefs(el, 'home')}>

                <div className="container">

                    <div className="card">
                        <div className="card-header">
                            <h1>Junior Full Stack Web Developer</h1>
                        </div>
                        <div className="card-body d-flex">
                            <p>
                                Sono un Full Stack Web Developer appassionato di sviluppo software e tecnologie web moderne. Mi occupo della progettazione e realizzazione di applicazioni complete, curando sia il frontend che il backend, con particolare attenzione a prestazioni, scalabilità e qualità del codice.
                                Nel corso della mia esperienza ho lavorato con diverse tecnologie e framework, sviluppando applicazioni web, API REST, sistemi gestionali e piattaforme digitali orientate all'esperienza utente e all'efficienza operativa.

                                Tecnologie principali: PHP, Laravel, Java, Spring Boot, JavaScript, React, Node.js, Express.js e MySQL.
                            </p>
                            <img src={profile} alt="ProPic" className="profile-img" />
                        </div>
                    </div>


                    <div className="go-to placeholder-wave">
                        <button className="placeholder" onClick={() => { scroll() }}>
                            <span className="">Vai ai Progetti</span>
                            <i className="bi bi-arrow-down"></i>
                        </button>

                    </div>
                </div>




            </section>

            {/* ref={scrollProjects} */}
            <section id="projects" ref={(el) => setRefs(el, 'projects')} >
                <div className="container">

                    <h1 className="mb-5 text-center">I miei progetti</h1>

                    <div className="row row-cols-sm-1 row-cols-md-2 row-cols-xl-3">
                        {projects.map(project => {

                            return (
                                <div className="col mb-4" key={project.id}>
                                    <ProjectsCard project={project} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section id="contacts" ref={(el) => setRefs(el, 'contacts')} >
                <div className="container">

                    <h1 className="mb-5 text-center">Contatti</h1>

                    <div className="row justify-content-center">
                        <div className="card col-6">
                            <div className="card-body">

                                <h3 className="text-center m-3">
                                    <i class="bi bi-github me-3"></i>
                                    <a href="https://github.com/Mattia-Giacobelli">GitHub</a>
                                </h3>
                                <h3 className="text-center m-3">
                                    <i class="bi bi-linkedin me-3"></i>
                                    <a href="https://www.linkedin.com/in/mattia-giacobelli-981442350/">Linkedin</a>
                                </h3>
                                <h3 className="text-center m-3">
                                    <i class="bi bi-envelope-at-fill me-3"></i>
                                    <a href="mailto:giacobelli.mattia12@gmail.com">
                                        giacobelli.mattia12@gmail.com
                                    </a>
                                </h3>
                                <h3 className="text-center m-3">
                                    Telefono: +393663283608
                                </h3>

                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}