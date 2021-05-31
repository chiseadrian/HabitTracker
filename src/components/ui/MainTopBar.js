import React from 'react';

export const MainTopBar = ({ handleBack, handleForward, title, last }) => {
    return (
        <div className="main__top-bar">
            {
                (handleBack)
                    ? (
                        <button
                            className="btn-default"
                            onClick={handleBack}
                        >
                            <i className="fas fa-chevron-left"></i>

                        </button>
                    )
                    : (
                        <button disabled className="btn-default"></button>
                    )
            }

            {title}

            {
                (handleForward)
                    ? (
                        (last)
                            ? (
                                <button disabled className="btn-default"></button>
                            )
                            : (
                                <button
                                    className="btn-default"
                                    onClick={handleForward}
                                >
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            )
                    )
                    : (
                        <button disabled className="btn-default"></button>
                    )
            }
        </div>
    )
}
