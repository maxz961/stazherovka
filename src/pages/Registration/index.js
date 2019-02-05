import React from 'react';
import FormsRegister from '../../components/FormsRegister'

class Registration extends React.Component {
    render() {
        return (
            <div className="Pages__center">
                <h1>Страница регестрации</h1>

                <FormsRegister />

            </div>
        )
    }
}

export default Registration