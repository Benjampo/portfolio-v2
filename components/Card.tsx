import React from 'react';

function Card(props: any) {
    return (
        <div
            className={`w-full bg-white rounded-xl  p-4 cursor-pointer my-shadow ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Card;
