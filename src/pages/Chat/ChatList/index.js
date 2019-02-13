import React from 'react'

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
            return <li>{item.name} <br />{item.message}</li>
        })
        return (
            <ul>
                {data}
            </ul>
        )
    }
}

export default ChatList