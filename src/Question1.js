import React, { Component } from 'react';
import GraphClient from './GraphClient';
import classNames from 'classnames';
import ConstituencySelect from './ConstituencySelect'

class Question1 extends Component{
    constructor(props){
        super(props);
        this.state = {constituencies : [], ukarea:"", winningParty: {}};
    }

    componentDidMount(){
        this.props.setActiveStatus(true);
        GraphClient.GetAllUkAreas().then(
            result =>{
                this.setState({constituencies:result.records}, () =>{
                    this.props.setActiveStatus(false);
                });
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
        if(!ukarea){
            return;
        }
        this.props.setActiveStatus(true);
        GraphClient.GetPartyWithMostVotesInArea(ukarea).then(
            result =>{
                if( result.records[0]){
                    this.setState({ winningParty: result.records[0].get('ukp')},this.props.setActiveStatus(false));
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
                <ConstituencySelect constituencies={constituencies} ukarea={ukarea} handleChange={this.handleChange} SelectClass={SelectClass}/>
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