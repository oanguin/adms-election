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

class Question4 extends Component{
    constructor(props){
        super(props);
        this.state = { parties: []};
    }

    componentDidMount(){
        GraphClient.GetPartiesWhomContested().then(          
            result =>{
                this.setState({parties:result.records})
            }
        )
    }

    render(){
        const {parties} = this.state;
        return(        
            <div>
                <h1>Question 4</h1>
                <h2><i>Parties Whom Contested the election and the votes they recived.</i></h2>
                {
                    (parties && parties.length > 0) ?
                    <PartiesDiv parties={parties}/>
                    :<div className="resultsDiv"><h2>Sorry No Results</h2></div>
                }
            </div>
            )
    }
}

function PartiesDiv(props){
    const {parties} = props;
    return(
        <div className="resultsDiv">
        <Paper >
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Party</TableCell>
                <TableCell align="right">Votes</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {parties.map(party => (
                <TableRow key={party.get('party')}>
                <TableCell component="th" scope="row">
                    {party.get('party')}
                </TableCell>
                <TableCell align="right">{party.get('seatswon').low}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
        </div>
    )
}

export default Question4;