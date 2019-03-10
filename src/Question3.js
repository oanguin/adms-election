import React, { Component } from 'react';
import GraphClient from './GraphClient';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';
import AppScss from './App.scss';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Question3 extends Component{
    constructor(props){
        super(props);
        this.state = { winningParty: ""};
    }

    componentDidMount(){
        this.props.setActiveStatus(true);
        GraphClient.GetWinningParty().then(          
            result =>{
                this.setState({winningParty:result.records[0].get('winningParty')},this.props.setActiveStatus(false));
            }
        )
    }

    render(){
        const {winningParty} = this.state;
        return(        
            <div>
                <h1>Question 3</h1>
                <h2><i>Winning Party.</i></h2>
                <div><h3>{winningParty}</h3></div>
            </div>
            )
    }
}

export default Question3;