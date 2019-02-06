import React from 'react'
import Button from '@material-ui/core/Button';
import { Route, Redirect } from 'react-router'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import OpenDialog from './OpenDialog'
import './Profile.css'


class Profile extends React.Component {

    state = {
        oldName: 'Имя пользователя',
        oldInfo: 'Информация пользователя',
        nameProfile: 'Имя пользователя',
        infoProfile: 'Информация пользователя'
    }

    handleSubmit = () => {
        window.localStorage.clear()
        this.props.history.push('/')
    }

    handleChange = (target) => {
        this.setState({ [target.id]: target.value})

    }

    saveClick = () => {
        const {nameProfile, infoProfile} = this.state
        this.setState({
            ...this.state, oldName: nameProfile, oldInfo: infoProfile
        })
    }


    render() {
        const {nameProfile, infoProfile, oldName, oldInfo} = this.state
        const token = window.localStorage.getItem('rr_login')
        console.log('TOKEN', window.localStorage.getItem('rr_login'));
   
        return token === null ? ( <Redirect to="/"/>) : (

            <div className="Pages__center">
                <h1>Страница профиля</h1>
                <Grid container justify="center" alignItems="center" className="bg1">
                    <Avatar alt="Remy Sharp" src="https://banner2.kisspng.com/20180630/bo/kisspng-user-profile-computer-icons-button-boy-avatar-5b3823c89f5112.6571683615304058326526.jpg"
                     id='Prof__avatar' />
                </Grid>
                <h1>{oldName}</h1>
                <p>{oldInfo}</p>
                <OpenDialog propsHuck={this.handleChange} nameProfile={nameProfile} infoProfile={infoProfile} saveClick={this.saveClick}/>

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