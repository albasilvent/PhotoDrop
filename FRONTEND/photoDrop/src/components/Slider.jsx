/* eslint-disable react/prop-types */
import "../styles/Slider.css";
import { useState, useRef } from "react";

export function Slider({ id, photo1, photo2, photo3 }) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const sliderRef = useRef(null);

    const scrollSlider = (direction) => {
        const slider = sliderRef.current;
        const slideWidth = slider.clientWidth;
        let newPosition =
            direction === "forward"
                ? scrollPosition + slideWidth
                : scrollPosition - slideWidth;

        newPosition = Math.max(
            0,
            Math.min(newPosition, slider.scrollWidth - slider.clientWidth)
        );

        slider.scroll({ left: newPosition, behavior: "smooth" });
        setScrollPosition(newPosition);
    };

    return (
        <div className="slider-container">
            <div className="slider" >
                <div ref={sliderRef} className="slides">
                    {photo1 && (
                        <div id={`slides__${id}__1`} className="slide">
                            <img className="postImg" src={photo1}></img>
                        </div>
                    )}
                    {photo2 && (
                        <div id={`slides__${id}__2`} className="slide">
                            <img className="postImg" src={photo2}></img>
                        </div>
                    )}
                    {photo3 && (
                        <div id={`slides__${id}__3`} className="slide">
                            <img className="postImg" src={photo3}></img>
                        </div>
                    )}
                </div>
                {photo2 && (
                    <div className="arrows" >
                        <a
                            className={`material-symbols-rounded arrowBack ${
                                scrollPosition === 0 ? "disabled" : ""
                            }`}
                            href="#"
                            onClick={() => scrollSlider("backward")}
                            style={{textDecoration: "none"}}
                        >
                            arrow_back
                        </a>
                        <a
                            className={`material-symbols-rounded arrowForward ${
                                scrollPosition >=
                                sliderRef.current?.scrollWidth -
                                    sliderRef.current?.clientWidth
                                    ? "disabled"
                                    : ""
                            }`}
                            href="#"
                            onClick={() => scrollSlider("forward")}
                            style={{textDecoration: "none"}}
                        >
                            arrow_forward
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
