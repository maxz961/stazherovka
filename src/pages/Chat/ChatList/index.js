import React, { Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


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
        const data = this.state.message.map(item => {if(item.message.length > 0)
            return (
            <Fragment>
              <ListItem button src={item.avatar}>
                <Avatar alt="Profile Picture"/>
                <ListItemText primary={item.name} secondary={item.message} />
              </ListItem>
            </Fragment>
            )
        })
        return (
            <ul>
                {data}
            </ul>
        )
    }
}

export default ChatList