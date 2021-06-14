import React from 'react';


export const LoadingSpinner = () => {
    return (
        <div className="spinner-content">
            <div className="lds-ripple"><div></div><div></div></div>
            Loading...
        </div>
    )
}
