import React, { Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import baseApiUrl from '../../../baseaApiUrl'


class ChatList extends React.Component {

    state = {
        message: []
    }


    componentDidUpdate(prevProps) {

        const {data} = this.props
        if(data !== prevProps.data) 
        this.setState({
        message:[...this.state.message, data]
        })
    
    }



    render() {
        const img = 'https://banner2.kisspng.com/20180630/bo/kisspng-user-profile-computer-icons-button-boy-avatar-5b3823c89f5112.6571683615304058326526.jpg'
        const data = this.state.message.map((item, index) => {if(item.message.length > 0)
            return (
            <Fragment key={index}>
              <ListItem button src={item.avatar}>
                <Avatar alt="Profile Picture" src={item.avatar !== undefined ? `${baseApiUrl}/uploads/${item.avatar}` : img}/>
                <ListItemText primary={item.name} secondary={item.message} />
              </ListItem>
            </Fragment>
            )
        })
        return (
            <div>
                {data}
            </div>
        )
    }
}

export default ChatList