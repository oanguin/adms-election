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

class Question2 extends Component{
    constructor(props){
        super(props);
        this.state = {constituencies : [], ukarea:"", parties: []};
    }

    componentDidMount(){
        GraphClient.GetAllUkAreas().then(
            result =>{
                this.setState({constituencies:result.records});
            }
        )
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value }, () =>{
            this.GetPartiesContestedInArea();
        });
        
    };

    GetPartiesContestedInArea = () =>{
        const {ukarea} = this.state;
        console.log(ukarea)
        GraphClient.GetPartiesContestedInArea(ukarea).then(
            result =>{
                if( result.records){
                    this.setState({ parties: result.records});
                    console.log("Parties",result)
                }
                
            }
        )
    };

    render(){
        const {constituencies, ukarea, parties} = this.state;
        var SelectClass = classNames({
            'selectList': true
          });
        return(        
            <div>
                <h1>Question 2</h1>
                <h2><i>Select UK Area to see which parties contested the constituency.</i></h2>
                <Select 
                className={SelectClass}
                value={ukarea}
                onChange={this.handleChange}
                name="ukarea"
                autoWidth={true}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {constituencies.map((constituency,index) =>{
                        const ukarea = constituency.get('c.ukarea')
                        return(
                            <MenuItem value={ukarea} key={ukarea}>{ukarea}</MenuItem>
                        )
                    })}
                </Select>

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
                <TableRow key={party.get('ukp.party')}>
                <TableCell component="th" scope="row">
                    {party.get('ukp.party')}
                </TableCell>
                <TableCell align="right">{party.get('result.ukvotes').low}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
        </div>
    )
}

export default Question2;