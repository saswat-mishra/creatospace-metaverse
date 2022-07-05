import React from 'react';
import './Profilecard.css'

function Profilecard(props) {
    console.log(props);
    const name  = props.name;

    return (
        <div class='card'>
            <div class="card-container">
                <span class="pro">PRO</span>
                <img class="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                <h3 class='name'>{name}</h3>
                <h1>Finance 101</h1>
                <div class="buttons">
                    <button class="primary">
                        Join the room
                    </button>
                    {/* <button class="primary ghost">
                        Following
                    </button> */}
                </div>
                {/* <div class="skills">
                    <h6>Skills</h6>
                    <ul>
                        <li>UI / UX</li>
                        <li>Front End Development</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Node</li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
}

export default Profilecard;