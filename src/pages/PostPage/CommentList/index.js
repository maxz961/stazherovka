import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import DeleteComment from '../DeleteComment'
import EditComment from '../EditComment'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

class CommentList extends React.Component {

  deleteComm = () => {
    const id = this.props.item._id
    this.props.deleteComm(id)
  }


  openSaveEditComm = () => {
    const id = this.props.item._id
    this.props.openSaveEditComm(id)
  }

  propsHuckEditComm = (target) => {
    this.props.propsHuckEditComm(target)
  }

  render() {
    const author = this.props.item.author
    console.log('author', author)
  const { classes, item } = this.props;
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={item.author === 'admin' ? 'Admin' : 'Users'}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
              {item.content}
              </Typography>
              
            </React.Fragment>
          }
        />
        <EditComment author={author} openSaveEditComm={this.openSaveEditComm} propsHuckEditComm={this.propsHuckEditComm}/> 
        <DeleteComment author={author} deleteComm={this.deleteComm}/>
      </ListItem>

    </List>
  );
}
}


export default withStyles(styles)(CommentList);