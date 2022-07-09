import React from 'react';
import JoinForm from '../JoinForm';
import './Profilecard.css'

function Profilecard(props) {
    // console.log(props);
    const name  = props.name;
    const desc = props.desc;
    const price = props.price;
    const room_id = props._id;

    return (
        <div className='card'>
            <div className="card-container">
                <span className="pro">{price}</span>
                <img className="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                <h3 className='name'>{name}</h3>
                <h1>{desc}</h1>
                <div className="buttons">
                    <button className="primary">
                        Join the room
                    </button>
                    {/* <JoinForm id={room_id}></JoinForm> */}

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