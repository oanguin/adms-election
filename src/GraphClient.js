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

    GetPartWithMostVotesInArea = (ukarea) =>{
        return this.session.run(
            `MATCH (ukc:Ukconst{ukarea:"${ukarea}"})-[result:Ukresult]->(ukp:Ukparty) with max(result.ukvotes) ` +
            `as maxvotes MATCH (ukc:Ukconst{ukarea:"${ukarea}"})-[result:Ukresult]->(ukp:Ukparty) ` +
            `WHERE maxvotes = result.ukvotes RETURN ukp`
        );
        
    }
}

export default new GraphClient();