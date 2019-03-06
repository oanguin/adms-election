import React, { Component } from 'react';
import './App.css';

class Settings extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {Neo4JUrl, UpdateNeo4JUrl} = this.props;
        return(
            <div>
                <input type="text" bind={Neo4JUrl} value={Neo4JUrl} onChange={UpdateNeo4JUrl.bind(this)}/>
            </div>
        );
    }
}

export default Settings;
