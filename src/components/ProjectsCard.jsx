export default function ProjectsCard({ project }) {

    console.log(project);


    return (

        <>

            <div className="card d-flex flex-columns">
                <div className="card-img-top">
                    <img src={`${import.meta.env.VITE_LARAVEL_IMG_URL}/${project.img}`} alt="copertina" />
                </div>
            </div>

        </>
    )
}