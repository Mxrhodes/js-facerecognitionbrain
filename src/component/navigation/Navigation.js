import React from 'react';

const Navigation = ( {onRouteChange, route} ) => {

    return(
        <nav style={{ display: "flex", justifyContent: "flex-end", padding: "10px"}}>
        { route === "home"
            ? <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
            : console.log("Route", route)
        }
        </nav>
    )
}

export default Navigation;