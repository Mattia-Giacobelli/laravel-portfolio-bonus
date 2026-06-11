import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { useProducts } from "../contexts/ProductsContext";
import { supabase } from "../supabase";


export default function ProjectPage() {

    const { refProd, refHome, visible } = useProducts()

    const [project, setProject] = useState(null);

    const { id } = useParams()

    console.log(id);


    async function fetchProject() {

        const { data, error } = await supabase
            .from('projects')
            .select(`
            *,
            type:types(*),
            project_technology(
            technologies(*)
            ),
            project_media(
            media(*)
            )
            `)
            .eq('id', id)
            .single()

        if (error) {
            console.error(error)
            return
        }

        console.log(data)
        setProject(data)

    }



    useEffect(() => {
        fetchProject()
    }, [])



    return (
        <>

            <ProjectCard project={project} ref={refProd} />

        </>
    )
}
