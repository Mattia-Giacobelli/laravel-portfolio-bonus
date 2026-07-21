import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function ProjectsCard({ project }) {

    console.log(project);

    const prova = 'ciao'

    console.log(prova.slice(0, 200));

    const imgUrl = supabase
        .storage
        .from('Projects')
        .getPublicUrl(project.project_media[0].media.path)
        .data.publicUrl


    return (

        <>

            <Link to={`/projects/${project.id}`}>

                <div className="card d-flex flex-column">
                    <div className="card-img-top">
                        <img src={imgUrl} alt="copertina" />
                    </div>

                    <div className="card-body">
                        <h3> {project.name} </h3>
                        <h6>
                            {project.type.name}
                        </h6>
                        {/* <div className="short">
                            <p>
                                {project.descrizione.slice(0, 150).length < 150 ?
                                    project.descrizione :
                                    project.descrizione.slice(0, 155) + '...'
                                }
                            </p>
                        </div> */}
                        {project.project_technology.map(tech => {

                            return (
                                <span key={project.id + tech.technologies.id} className={`badge rounded-pill bcg-${tech.technologies.name}`} >
                                    {tech.technologies.name}
                                </span>
                            )

                        })}

                    </div>
                </div>

            </Link>

        </>
    )
}