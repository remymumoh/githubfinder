import React, {useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";

import GithubState from './components/context/github/GithubState';

import "./App.css";

const App =()=> {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
 


  //  async componentDidMount(){

  //    this.setState({loading: true})

  //     const res = await axios.get(`https://api.github.com/users?client_id=${
  //           process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
  //             process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //             this.setState({users: res.data, loading:false});

  //   }

  //get single github user
  const getUserRepos = async(username) => {

    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data)
    setLoading(false)

  }


  //set alert
  const showAlert = (msg, type) => {
     setAlert({msg, type });
    setTimeout(() => setAlert(null), 5000);
  };
  
    return (
      <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      setAlert={showAlert}
                    />
                    <User />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About}/>
              <Route 
              exact path='/user/:login' 
              render={props => (
                //user component
                <User 
                {...props} 
                getUserRepos={getUserRepos}
                repos={repos}/>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
      </GithubState>
    );
}

export default App;
