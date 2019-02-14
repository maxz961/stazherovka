import React from 'react';
import FormsRegister from '../../components/FormsRegister'

class Registration extends React.Component {

    goTo = (page) => {
        this.props.history.push(page)
    }
    render() {
        return (
            <div className="Pages__center">
                <h1>Страница регестрации</h1>
                <FormsRegister goTo={this.goTo} />

            </div>
        )
    }
}

export default Registration