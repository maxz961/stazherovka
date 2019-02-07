import React from 'react'
import axios from '../../../axios.config'
import ListItem from './ListItem'

const id = window.localStorage.getItem('rr_id')
const token = window.localStorage.getItem('rr_login')

class ListItems extends React.Component {

    state = {
        data: []
    }

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
            console.log('POSTS', response)
            this.setState({
                data: response.data
            })
        })
        .then((error) => {
            console.log(error)
        })
    }


    render() {
       console.log('state', this.state.data)
       const {data} = this.state
       const ItemElem = data.map((item) => {
           return <ListItem key={item._id} title={item.title} image={item.image} description={item.description} created_user={item.created_user}/>
       })
        return (
            <div>
               {ItemElem}
            </div>
        )
    }
}

export default ListItems