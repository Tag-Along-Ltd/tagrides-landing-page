import React from 'react';

const Loading = () => {
    return (
        <>
            <div id="preloader">
                <div id="consua-preloader" className="consua-preloader">
                    <div className="animation-preloader">
                        <div className="spinner"></div>
                        <div className="txt-loading">
                            <span data-text-preloader="T" className="letters-loading">
                                T
                            </span>
                            <span data-text-preloader="A" className="letters-loading">
                                A
                            </span>
                            <span data-text-preloader="G" className="letters-loading">
                                G
                            </span>
                            <span data-text-preloader="R" className="letters-loading">
                                R
                            </span>
                            <span data-text-preloader="I" className="letters-loading">
                                I
                            </span>
                            <span data-text-preloader="D" className="letters-loading">
                                D
                            </span>
                            <span data-text-preloader="E" className="letters-loading">
                                E
                            </span>
                        </div>
                    </div>
                    <div className="loader">
                        <div className="row">
                            <div className="col-3 loader-section section-left">
                                <div className="bg"></div>
                            </div>
                            <div className="col-3 loader-section section-left">
                                <div className="bg"></div>
                            </div>
                            <div className="col-3 loader-section section-right">
                                <div className="bg"></div>
                            </div>
                            <div className="col-3 loader-section section-right">
                                <div className="bg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loading;