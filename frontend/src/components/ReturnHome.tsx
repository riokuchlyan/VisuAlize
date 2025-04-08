import React from 'react';

const ReturnHome = () => {

    const Home = async () => {
        window.location.href = "/";
    }

    return (
        <div style={{ marginTop: "15px" }} className='input'>
            <button onClick={Home}>Home</button>
          </div>
    );
}

export default ReturnHome;