import React from 'react'
import ListItems from './ListItems'
import './Posts.css'

class Posts extends React.Component {




    render() {
        const token = window.localStorage.getItem('rr_login')
        return(
            <div className='h1__posts'>
                <h1>Страница Постов</h1>
                <ListItems token={token}/>
            </div>
        )
    }
}

export default Posts