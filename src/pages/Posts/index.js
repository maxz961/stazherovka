import React from 'react'
import ListItems from './ListItems'
import './Posts.css'

class Posts extends React.Component {




    render() {
        return(
            <div className='h1__posts'>
                <h1>Страница Постов</h1>
                <ListItems />
            </div>
        )
    }
}

export default Posts