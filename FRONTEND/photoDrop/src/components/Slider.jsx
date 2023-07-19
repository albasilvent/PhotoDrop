import "../styles/Slider.css";

// eslint-disable-next-line react/prop-types
export function Slider({ photo1, photo2, photo3 }) {
    return (
        <div className="slider-container">
            <div className="slider">
                <div className="slides">
                    <div id="slides__1" className="slide">
                        <img className="postImg" src={photo1}></img>
                        <a
                            className="slide__prev"
                            href="#slides__3"
                            title="Next"
                        ></a>
                        <a
                            className="slide__next"
                            href="#slides__2"
                            title="Next"
                        ></a>
                    </div>
                    {photo2 && <div id="slides__2" className="slide">
                        <img className="postImg" src={photo2}></img>
                        <a
                            className="slide__prev"
                            href="#slides__1"
                            title="Prev"
                        ></a>
                        <a
                            className="slide__next"
                            href="#slides__3"
                            title="Next"
                        ></a>
                    </div>}
                   {photo3 && <div id="slides__3" className="slide">
                        <img className="postImg" src={photo3}></img>
                        <a
                            className="slide__prev"
                            href="#slides__2"
                            title="Prev"
                        ></a>
                        <a
                            className="slide__next"
                            href="#slides__4"
                            title="Next"
                        ></a>
                    </div>}
                </div>
                <div className="slider__nav">
                    <a className="slider__navlink" href="#slides__1"></a>
                    <a className="slider__navlink" href="#slides__2"></a>
                    <a className="slider__navlink" href="#slides__3"></a>
                </div>
            </div>
        </div>
    );
}
