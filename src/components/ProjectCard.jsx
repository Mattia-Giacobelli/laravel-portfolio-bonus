import { useEffect, useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { supabase } from "../supabase";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function ProjectCard({ project }) {

    const { setRefs } = useProducts()

    const [lang, setLang] = useState('it');

    function toggleLang() {

        if (lang === 'it') {

            setLang('en')

        } else if (lang === 'en') {

            setLang('it')

        }
    }

    console.log(project);

    const imgUrl = project?.project_media?.[0]?.media?.path
        ? supabase
            .storage
            .from('Projects')
            .getPublicUrl(project.project_media[0].media.path)
            .data.publicUrl
        : null

    return (

        <>

            <section id="project" ref={(el) => setRefs(el, 'projects')}>

                <div className="container">
                    {project &&
                        <div className="card ">
                            <div className="card-img-top d-flex justify-content-center pt-3">
                                <img src={imgUrl} alt="copertina" />
                            </div>

                            <div className="card-body">

                                <div className="d-flex justify-content-between">
                                    <h2> {project.name} </h2>
                                    <h4>
                                        {project.type?.name}
                                    </h4>
                                </div>

                                {/* <div className="short">
                            <p>
                                {project.descrizione.slice(0, 150).length < 150 ?
                                    project.descrizione :
                                    project.descrizione.slice(0, 155) + '...'
                                }
                            </p>
                        </div> */}
                                <div className="d-flex justify-content-between">
                                    <div>
                                        {project.technologies?.map(tech => {

                                            return (
                                                <span key={tech.id} className={`badge rounded-pill bcg-${tech.name}`} >
                                                    {tech.name}
                                                </span>
                                            )

                                        })}
                                    </div>

                                    <div className="d-flex align-items-center">

                                        {lang === 'it' ?
                                            <p className="mb-0">Cambia Lingua:</p> :
                                            <p className="mb-0">Change language:</p>}

                                        {lang === 'it' ?
                                            <button className="btn-unstyle" onClick={() => toggleLang()}>it</button> :
                                            <button className="btn-unstyle" onClick={() => toggleLang()}>en</button>}

                                    </div>
                                </div>



                                {lang === 'it' ?
                                    <p className="mt-3">{project.descrizione}</p> :
                                    <p className="mt-3">{project.description}</p>}


                                <Swiper className="h-50"
                                    modules={[Navigation, Pagination]}
                                    navigation
                                    pagination={{ clickable: true }}
                                >
                                    {project.project_media
                                        .sort((a, b) => {
                                            if (a.media.type === 'video') return -1
                                            if (b.media.type === 'video') return 1
                                            return 0
                                        })
                                        .map(item => {

                                            const mediaUrl = supabase
                                                .storage
                                                .from('Projects')
                                                .getPublicUrl(item.media.path)
                                                .data.publicUrl

                                            return (
                                                <SwiperSlide key={item.media.id}>

                                                    {item.media.type === 'image' ? (
                                                        <img
                                                            src={mediaUrl}
                                                            alt=""
                                                            className="img-fluid"
                                                        />
                                                    ) : (
                                                        <video
                                                            controls
                                                            className="w-100"
                                                        >
                                                            <source
                                                                src={mediaUrl}
                                                                type="video/mp4"
                                                            />
                                                            Il browser non supporta il video.
                                                        </video>
                                                    )}

                                                </SwiperSlide>
                                            )
                                        })}
                                </Swiper>


                            </div>
                        </div>
                    }
                </div>

            </section>

        </>

    )
}