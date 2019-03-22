import React, { Component } from 'react';
import GraphClient from './GraphClient';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ConstituencySelect from './ConstituencySelect'

class Question2 extends Component{
    constructor(props){
        super(props);
        this.state = {constituencies : [], ukarea:"", parties: []};
    }

    componentDidMount(){
        this.props.setActiveStatus(true);
        GraphClient.GetAllUkAreas().then(
            result =>{
                this.setState({constituencies:result.records},this.props.setActiveStatus(false));
            }
        )
    }

    handleChange = event => {
        this.props.setActiveStatus(true);
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
                    this.setState({ parties: result.records},this.props.setActiveStatus(false));
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
                <ConstituencySelect constituencies={constituencies} ukarea={ukarea} handleChange={this.handleChange} SelectClass={SelectClass}/>
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