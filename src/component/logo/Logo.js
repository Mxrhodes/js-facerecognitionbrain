import React from 'react';
import { Tilt } from 'react-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = () => {

    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{max : 55}} style={{ height: 150, width: 150 }}>
                <div>
                    <img style={{ padding: "5px" }} src={brain} alt='<a target="_blank" href="https://icons8.com/icon/48369/brain">Brain</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;