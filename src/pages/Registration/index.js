import React from 'react';
import FormsRegister from '../../components/FormsRegister'

class Registration extends React.Component {

    clickHistory = () => {
        this.props.history.push('/Login')
    }
    render() {
        return (
            <div className="Pages__center">
                <h1>Страница регестрации</h1>
                <FormsRegister clickHistory={this.clickHistory} />

            </div>
        )
    }
}

export default Registration