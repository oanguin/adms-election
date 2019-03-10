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

class Question6 extends Component{
    constructor(props){
        super(props);
        this.state = {results:[]};
    }

    componentDidMount(){
        this.props.setActiveStatus(true);
        GraphClient.GetAllWhomHaveLostDeposit().then(
            result =>{
                this.setState({results:result.records},this.props.setActiveStatus(false));
            }
        )
    }


    render(){
        const {results} = this.state;
        return(        
            <div>
                <h1>Question 6</h1>
                <h2><i>All parties whom have lost their deposts in a particular constituency.</i></h2>

                {
                    (results && results.length > 0) ?
                    <PartiesDiv parties={results}/>
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
                <TableCell align="left">Area</TableCell>
                <TableCell align="left">Percent of Votes</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {parties.map((party,index) => (
                <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {party.get('party')}
                </TableCell>
                <TableCell align="left">{party.get('area')}</TableCell>
                <TableCell align="left">{party.get('percentofvotes')}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
        </div>
    )
}

export default Question6;