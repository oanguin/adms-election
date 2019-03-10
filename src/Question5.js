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

class Question5 extends Component{
    constructor(props){
        super(props);
        this.state = {results:[], parties: [], party:""};
    }

    componentDidMount(){
        this.props.setActiveStatus(true);
        GraphClient.GetAllUkParties().then(
            result =>{
                this.setState({parties:result.records},this.props.setActiveStatus(false));
            }
        )
    }

    handleChange = event => {
        this.props.setActiveStatus(true);
        this.setState({ [event.target.name]: event.target.value }, () =>{
            this.GetPartiesWhomLostDeposit(event.target.value);
        });
        
    };

    GetPartiesWhomLostDeposit = (party) =>{
        const {ukarea} = this.state;
        console.log(ukarea)
        GraphClient.GetPartiesWhomLostDeposit(party).then(
            result =>{
                if( result.records){
                    this.setState({ results: result.records},this.props.setActiveStatus(false));
                }
                
            }
        )
    };

    render(){
        const {results, parties, party} = this.state;
        var SelectClass = classNames({
            'selectList': true
          });
        return(        
            <div>
                <h1>Question 5</h1>
                <h2><i>Select UK Area to see which parties lost their deposit.</i></h2>
                <Select 
                className={SelectClass}
                value={party}
                onChange={this.handleChange}
                name="party"
                autoWidth={true}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {parties.map((constituency,index) =>{
                        const party = constituency.get('p').properties.party
                        return(
                            <MenuItem value={party} key={party}>{party}</MenuItem>
                        )
                    })}
                </Select>

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
                <TableCell>Area</TableCell>
                <TableCell align="right">Percent of Votes</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {parties.map(party => (
                <TableRow key={party.get('area')}>
                <TableCell component="th" scope="row">
                    {party.get('area')}
                </TableCell>
                <TableCell align="right">{party.get('percentofvotes')}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
        </div>
    )
}

export default Question5;