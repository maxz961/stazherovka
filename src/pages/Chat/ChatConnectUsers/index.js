import React, { Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import baseApiUrl from '../../../baseaApiUrl'

class ChatConnectUsers extends React.Component {


    state = {
        online: []
    }


    componentDidUpdate(prevProps) {

        const {online} = this.props
        if(online !== prevProps.online) 
        this.setState({
            online: online
        })
    
    }
    render() {
        const img = 'https://banner2.kisspng.com/20180630/bo/kisspng-user-profile-computer-icons-button-boy-avatar-5b3823c89f5112.6571683615304058326526.jpg'
        const {online} = this.state
        
        const data = online.map(item => {if(item.length > 0)
            return (
            <Fragment key={item.id}>
              <ListItem button src={item.avatar}>
                <Avatar alt="Profile Picture" src={item.avatar !== undefined ? `${baseApiUrl}/uploads/${item.avatar}` : img}/>
                <ListItemText primary={item.name} />
              </ListItem>
            </Fragment>
            )
        })
        return (
            <div id='connect__list'>
                <p className='text__connect'>Онлайн: {online.length}</p>
                {data}
            </div>
        )
    }
}

export default ChatConnectUsers