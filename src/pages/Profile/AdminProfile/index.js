import React from 'react'
import axios from '../../../axios.config'

const id = window.localStorage.getItem('rr_id')
const token = window.localStorage.getItem('rr_login')

class AdminProfile extends React.Component {


    componentDidMount() {
        this.get_profile(id, token)
        this.get_allposts()
    }

    get_profile = (id, token) => {
        axios.get(`/user/${id}`, token)
        .then((response) => {
            console.log('RES', response)
            this.setState({
                oldName: response.data.name,
                oldInfo: response.data.email,
                nameProfile: response.data.name,
                infoProfile: response.data.email,
                isAdmin: response.data.isAdmin,
                newAdmin: response.data.isAdmin
            })
        })
        .then((error) => {
            console.log(error)
        })
    }

    get_allposts = () => {
        axios.get(`/posts`)
        .then((response) => {
            console.log('USERS', response)
        })
        .then((error) => {
            console.log(error)
        })
    }


    render() {
        return (
            <div>
                <h1>Страница админа</h1>
            </div>
        )
    }
}

export default AdminProfile