import React, { Component } from 'react';
import './App.css';
import { v1 as neo4j } from 'neo4j-driver';
import GraphClient from './GraphClient'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Settings extends Component{
    constructor(props){
        super(props);
        this.state = { Neo4JUrl: props.Neo4JUrl,User: props.User, Password:props.Password }
    }

    UpdateNeo4JSettings = () =>{        
        const {Neo4JUrl, User, Password} = this.state;        
        GraphClient.UpdateSettings(Neo4JUrl, User, Password);
    }

    render(){
        const {Neo4JUrl, User, Password} = this.props;
        return(
            <form  noValidate autoComplete="off">
                    <TextField
                    required
                    id="url"
                    label="Required"
                    defaultValue="bolt://localhost:7687"
                    margin="normal"
                    onChange={e => this.setState({ Neo4JUrl: e.target.value })}
                    />
                    <br/>
                    <TextField
                    required
                    id="user"
                    label="Required"
                    defaultValue="neo4j"
                    margin="normal"
                    onChange={e => this.setState({ User: e.target.value })}
                    />
                    <br/>
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue="neo4jpass"
                    margin="normal"
                    onChange={e => this.setState({ Password: e.target.value })}
                    />
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.UpdateNeo4JSettings}>
                        Save Settings
                    </Button>
                
            </form>
        );
    }
}

export default Settings;
