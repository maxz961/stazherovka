import React from 'react'
import Button from '@material-ui/core/Button';
import Axios from 'axios';

class Profile extends React.Component {

    handleSubmit = () => {
        window.localStorage.clear()
    }


    render() {
        return (
            <div className="Pages__center">
                <h1>Страница профиля</h1>
                <Button type="submit"
                    variant="outlined" 
                    color="primary"
                    onClick={this.handleSubmit}>
                Выход
           </Button>
            </div>
        )
    }
}

export default Profile