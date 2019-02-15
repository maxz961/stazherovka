import React from 'react'
import axios from '../../../../axios.config'

import TabUsers from '../TabUsers'

const id = window.localStorage.getItem('rr_id')
const token = window.localStorage.getItem('rr_login')

class AdminProfile extends React.Component {


    componentDidMount() {
        this.get_profile(id, token)
        this.get_allposts()
    }

    handleSubmit = () => {
        this.props.handleSubmit()
    }

    get_profile = (id, token) => {
        axios.request().get(`/user/${id}`, token)
        .then((response) => {
            console.log(response)
            this.setState({
                oldName: response.data.name,
                oldInfo: response.data.email,
                nameProfile: response.data.name,
                infoProfile: response.data.email,
                isAdmin: response.data.isAdmin,
                newAdmin: response.data.isAdmin
            })
            this.props.saveName(response.data.name)
        })
        .then((error) => {
            console.log(error)
        })
    }

    get_allposts = () => {
        axios.request().get(`/posts`)
        .then((response) => {
            console.log(response)
        })
        .then((error) => {
            console.log(error)
        })
    }


    render() {
        return (
            <div>
                <h1 className='center__admintext'>Страница админа</h1>
                <TabUsers />
                {/* <Button type="submit"
                    variant="outlined" 
                    color="primary"
                    onClick={this.handleSubmit}
                    >
                    Выход
                </Button> */}
            </div>
        )
    }
}

export default AdminProfile