import React, { Component } from 'react';
import GraphClient from './GraphClient';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';
import AppScss from './App.scss';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

class Question1 extends Component{
    constructor(props){
        super(props);
        this.state = {constituencies : [], ukarea:"", winningParty: {}};
    }

    componentDidMount(){
        GraphClient.GetAllUkAreas().then(
            result =>{
                this.state.constituencies = result.records;
            }
        )
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value }, () =>{
            this.GetPartyWithMostVotes();
        });
        
    };

    GetPartyWithMostVotes = () =>{
        const {ukarea} = this.state;
        console.log(ukarea)
        GraphClient.GetPartWithMostVotesInArea(ukarea).then(
            result =>{
                if( result.records[0]){
                    //this.state.winningParty = result.records[0].get('ukp');
                    this.setState({ winningParty: result.records[0].get('ukp')});
                    console.log("Winner",this.state.winningParty)
                }
                
            }
        )
    };

    render(){
        const {constituencies, ukarea, winningParty} = this.state;
        var SelectClass = classNames({
            'selectList': true
          });
        return(        
            <div>
                <h1>Question 1</h1>
                <h2><i>Select UK Area to see which party won in that area.</i></h2>
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
                    (winningParty && winningParty.properties) ?
                    <WinningPartyDiv winningParty={winningParty}/>
                    :<div className="resultsDiv"><h2>Sorry No Results</h2></div>
                }
            </div>
            )
    }
}

function WinningPartyDiv(props){
    const {winningParty} = props;
    return(
        <div className="resultsDiv">
            <h2>Winning Party</h2>
            <div>Party: {winningParty.properties.party}</div>
            <div>Party Leader: {winningParty.properties.leader}</div>        
        </div>
    )
}

export default Question1;