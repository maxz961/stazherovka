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
        created_user: ''
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
        console.log('SAVE')
    }

    get_allposts = () => {
        axios.get(`/posts`)
        .then((response) => {
            console.log('AllPosts',response.data)
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
        console.log('CREATESTATE', this.state)
        const {data} = this.state
        const ItemElem = data.map((item) => {
            return (<Link key={item._id} to={`/Posts/${item._id}`}>
                <ListItem id={item._id}
                    title={item.title} image={item.image}
                    description={item.description}
                    created_user={item.created_user}
                />
            </Link>);
       });
        return (
            <div className='list__itemsblock'>
                {ItemElem}
                <DialogSelect propsHuck={this.propsHuck} notSave={this.notSave} saveClick={this.saveClick}/>
            </div>
            
        )
    }
}

export default ListItems;
