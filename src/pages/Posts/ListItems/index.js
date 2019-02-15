import React from 'react'
import axios from '../../../axios.config'
import ListItem from './ListItem'
import {Link} from 'react-router-dom'

import DialogSelect from './OpenCreatePost'
import './ListItems.css'

class ListItems extends React.Component {

    state = {
        data: [],
        description: '',
        image: '',
        titile: '',
        created_user: '',
        stateToogle: false
    }

    componentDidMount() {
        this.get_allposts()
    }

    notSave = () => {
        this.setState({
            ...this.state, description: '', image: '',  titile: '', created_user: ''
        })
    }

    saveClick = () => {
        this.componentDidMount()
    }

    get_allposts = () => {
        axios.request().get(`/posts`)
        .then((response) => {
            this.setState({
                data: response.data
            })
        })
        .then((error) => {
            console.log(error)
        })
    }



    propsHuck = (target) => {
        this.setState({
            [target.id]: target.value
        })
    }

    
    render() {
        const {token} = this.props
        const {data} = this.state
        const ItemElem = data.map((item) => {
            return (<Link key={item._id} to={`/Posts/${item._id}`}>
                <ListItem id={item._id}
                    title={item.title} image={item.imageFile}
                    description={item.description}
                    created_user={item.created_user}
                />
            </Link>);
       });
        return (
            <div className='list__itemsblock flex__container'>
                {ItemElem}
                <DialogSelect notSave={this.notSave} saveClick={this.saveClick} token={token} propsHuck={this.propsHuck}/>
            </div>
            
        )
    }
}

export default ListItems;
