import { v1 as neo4j } from 'neo4j-driver';

class GraphClient{
    
    constructor(){
        this.url = "bolt://localhost:7687";
        this.user = "neo4j";
        this.password = "123456";
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
}

export default new GraphClient();