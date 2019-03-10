import { v1 as neo4j } from 'neo4j-driver';

class GraphClient{
    
    constructor(){
        this.url = "bolt://localhost:7687";
        this.user = "neo4j";
        this.password = "neo4jpass";
        this.CreateDriver();
    }

    
    UpdateSettings = (url, user, password) =>{
        this.url = url;
        this.user = user;
        this.password = password;
        this.CreateDriver();
    }

    CreateDriver = () =>{
        this.driver = neo4j.driver(this.url, neo4j.auth.basic(this.user, this.password));
        this.session = this.driver.session();
    }

    PrintSettings =() => {
        console.log(this.url, this.user, this.password);
    }

    GetAllUkParties = function(){
        return this.session.run(
            'MATCH (p:Ukparty) RETURN p'
            );
    }

    GetAllUkAreas = () => {
        return this.session.run(
            'MATCH (c:Ukconst) RETURN DISTINCT c.ukarea ORDER BY c.ukarea'
        );
    }

    GetPartyWithMostVotesInArea = (ukarea) =>{
        return this.session.run(
            `MATCH (ukc:Ukconst{ukarea:"${ukarea}"})-[result:Ukresult]->(ukp:Ukparty) with max(result.ukvotes) ` +
            `as maxvotes MATCH (ukc:Ukconst{ukarea:"${ukarea}"})-[result:Ukresult]->(ukp:Ukparty) ` +
            `WHERE maxvotes = result.ukvotes RETURN ukp`
        );
        
    }

    GetPartiesContestedInArea = (ukarea) =>{
        return this.session.run(
            `MATCH (ukc:Ukconst{ukarea:"${ukarea}"})-[result:Ukresult]->(ukp:Ukparty) RETURN ukp.party, result.ukvotes ORDER BY result.ukvotes DESC`
        );
        
    }

    GetWinningParty = () =>{
        return this.session.run(
          "MATCH (ukc:Ukconst)-[result:Ukresult]->(ukp:Ukparty) WITH max(result.ukvotes) as maxvotes, ukc.ukarea as votesinarea " +
          "MATCH (ukc1:Ukconst)-[result1:Ukresult]->(ukp1:Ukparty) WITH ukp1.party as winningParty WHERE result1.ukvotes = maxvotes " +
          "RETURN winningParty,count(winningParty) as winningCount ORDER BY winningCount DESC LIMIT 1"
        );
    }

    GetPartiesWhomContested = () =>{
        return this.session.run(
            "MATCH (ukc:Ukconst)-[result:Ukresult]->(ukp:Ukparty) WITH max(result.ukvotes) as maxvotes, ukc.ukarea as votesinarea " +
            "MATCH (ukc1:Ukconst)-[result1:Ukresult]->(ukp1:Ukparty) WITH ukp1.party as winningParty WHERE result1.ukvotes = maxvotes " +
            "WITH collect({party:winningParty}) as winningparties MATCH (ukp:Ukparty) WITH winningparties  + " + 
            "collect({party:ukp.party}) as allparties UNWIND allparties as party RETURN party.party as party, count(party) -1 as seatswon ORDER BY seatswon DESC"
        );
    }

    GetPartiesWhomLostDeposit = (party) =>{
        return this.session.run(
            `MATCH (ukc:Ukconst)-[result:Ukresult]->(ukp:Ukparty{party:\"${party}\"}) ` + 
            `WHERE (result.ukvotes/(ukc.ukelectors * 1.0) * 100 < 5) WITH ` +
            `collect({area:ukc.ukarea,party:ukp.party,votes:result.ukvotes,percentOfVotes:result.ukvotes/(ukc.ukelectors * 1.0) * 100}) as tallies ` +
            `UNWIND tallies as tally RETURN tally.party as party, tally.percentOfVotes as percentofvotes, tally.area as area ` +
            `ORDER BY percentofvotes`
        );
    }

    GetAllWhomHaveLostDeposit = () =>{
        return this.session.run(
            `MATCH (ukc:Ukconst)-[result:Ukresult]->(ukp:Ukparty) WHERE (result.ukvotes/(ukc.ukelectors * 1.0) * 100 < 5) ` +
            `WITH collect({area:ukc.ukarea,party:ukp.party,votes:result.ukvotes,percentOfVotes:result.ukvotes/(ukc.ukelectors * 1.0) * 100}) as tallies ` +
            `UNWIND tallies as tally RETURN tally.party as party, tally.percentOfVotes as percentofvotes, tally.area as area ` +
            `ORDER BY party, area, percentofvotes`
        );
    }
    
}

export default new GraphClient();