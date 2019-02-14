import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import axios from '../../axios.config'
import './Tabs.css'

const id = window.localStorage.getItem('rr_id')
const login = window.localStorage.getItem('rr_login');


class Tabs extends React.Component {

  state = {
    id: 'id',
    check: null
  }

  get_profile = (id, login) => {
    axios.request().get(`/user/${id}`, login)
    .then((response) => {
        this.setState({
          id: response.data._id
        })

    })
    .then((error) => {
        console.log(error)
    })
}

componentDidMount() {
    if(login !== null || id !== null) {
    this.get_profile(id, login)
  }
  this.setState({
    check: login
  })
}


  render() {
    const {tokenApp} = this.props
    return (
      <div className="Tabs__block">
        <AppBar>
          <div className='' >
            <Link className="Link__not" to="/"><Tab label="О нас" /></Link>
            <Link className="Link__not" to="/Posts"><Tab label="Посты" /></Link>
            {!tokenApp ? <Link className="Link__not" to="/Login"><Tab label="Логин" /></Link>: null}
            {!tokenApp ? <Link className="Link__not" to="/Registration"><Tab label="Регестрация" /></Link>: null}
            {tokenApp ? <Link className="Link__not" to={`/Profile/${this.state.id}`}><Tab label="Профиль" /></Link> : null}
            <Link className="Link__not" to="/Chat"><Tab label="Чат" /></Link>
          </div>
        </AppBar>
      </div>
    )
  }
}

export default Tabs


// export default () => {
//     return (
//       <div className="Tabs__block">
//         <AppBar>
//           <div className='' >
//             <Link className="Link__not" to="/"><Tab label="О нас" /></Link>
//             <Link className="Link__not" to="/Posts"><Tab label="Посты" /></Link>
//             {!login ? <Link className="Link__not" to="/Login"><Tab label="Логин" /></Link>: null}
//             {!login ? <Link className="Link__not" to="/Registration"><Tab label="Регестрация" /></Link>: null}
//             {login ? <Link className="Link__not" to="/Profile/:id"><Tab label="Профиль" /></Link> : null}
//           </div>
//         </AppBar>
//       </div>
//     );
  
// }


