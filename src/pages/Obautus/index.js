import React from 'react'
import './Obautus.css'

class Obautus extends React.Component {
    render() {
        const login = window.localStorage.getItem('rr_login')
        console.log('login', login === 'admin')
        return (
            <div className="Pages__center">
                <h1>О нас</h1>
                <p className="p__style">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            </div>
        )
    }
}

export default Obautus