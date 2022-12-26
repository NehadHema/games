import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

export default function GameDetails() {

    let { gameId } = useParams();


    let [gameObject, setGame] = useState({});
    let [images, setImage] = useState([]);


    async function getGamedeatails(id) {

        let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game`, {
            params: { id },
            headers: {
                'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }, gameObject);
        console.log(data.screenshots);

        setGame(data);
        setImage(data.screenshots);

    }


    useEffect(() => {

        getGamedeatails(gameId);

    }, [])


    // *****************


    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 1000,

    };


    return (
        <div className='container py-5'>
            <div className="row mt-3">
                <div className='col-md-4'>
                    <div>
                        <img src={`${gameObject.thumbnail} `} className="w-100 rounded-2" alt="" />
                    </div>
                    <div className="row mt-3">
                        <div className="col-3 col-lg-2 me-2">
                            <span className="btn btndark mb-3 py-2 cursor">FREE</span>
                        </div>
                        <div className="col-9 me-0 pe-0">

                            <NavLink onClick={() => window.open(`https://www.freetogame.com/${gameObject.id}`)}>
                                <span className="btn btnblue w-100 py-2  me-0"><strong>PLAY NOW </strong><i className="fas fa-sign-out-alt"></i></span>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <h1>{gameObject.title}</h1>
                    <h5 className='mt-3'>About {gameObject.title}</h5>
                    <p className='mt-3'>{gameObject.description}</p>

                    {gameObject.minimum_system_requirements ? <> <h5 className='my-3'>Minimum System Requirements</h5><ul className="ms-2 list-unstyled"> {gameObject.minimum_system_requirements.graphics ? <><li className='mb-1'><strong>graphics : </strong>{gameObject.minimum_system_requirements.graphics}</li></> : <><li><strong></strong></li></>}
                        {gameObject.minimum_system_requirements.memory ? <><li className='mb-1'><strong>memory : </strong>{gameObject.minimum_system_requirements.memory}</li></> : <><li><strong></strong></li></>}
                        {gameObject.minimum_system_requirements.os ? <><li className='mb-1'><strong>os : </strong>{gameObject.minimum_system_requirements.os}</li></> : <><li><strong></strong></li></>}
                        {gameObject.minimum_system_requirements.processor ? <><li className='mb-1'><strong>processor : </strong>{gameObject.minimum_system_requirements.processor}</li></> : <><li><strong></strong></li></>}
                        {gameObject.minimum_system_requirements.storage ? <><li><strong>storage : </strong>{gameObject.minimum_system_requirements.storage}</li></> : <><li><strong></strong></li></>}
                    </ul></> : null}


                    <h4 className='text-captilization mt-4'>{gameObject.title} Screenshots</h4>
                    {images.length > 0 ? <div id="carouselExampleDark" className="carousel carousel-dark slide py-3" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {images.map((img, index) =>{return<div key={index} className="carousel-item active" data-bs-interval={1500}>
                                <img src={img.image} alt='' className='w-100'></img>
                            </div>})}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                        : ''}

                
                    <h2 className='mb-3'>Additional Information</h2>
                    <div className="row mb-3">
                        <div className="col-md-4 col-6">
                            <span className='text-muted'>Title</span>
                            <p>{gameObject.title}</p>
                        </div>
                        <div className="col-md-4 col-6">
                            <span className='text-muted'>Developer</span>
                            <p>{gameObject.developer}</p>
                        </div>
                        <div className="col-md-4 col-6">
                            <span className='text-muted'>Publisher</span>
                            <p>{gameObject.publisher}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-6">
                            <span className='text-muted'>Release Date</span>
                            <p>{gameObject.release_date}</p>
                        </div>
                        <div className="col-md-4 col-6">
                            <span className='text-muted'>Genre</span>
                            <p>{gameObject.genre}</p>
                        </div>
                        <div className="col-md-4 col-6">
                            <span className='text-muted'>Platform</span>
                            <p><i className="fab fa-windows me-1"></i>{gameObject.platform}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


