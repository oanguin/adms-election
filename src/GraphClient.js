import { v1 as neo4j } from 'neo4j-driver';

class GraphClient{
    
    constructor(url, user, password){
        const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "123456"));
        this.session = driver.session();
    }

    
    
    GetAllUkParties = function(){
        return this.session.run(
            'MATCH (p:Ukparty) RETURN p'
            );
    }
}

export default GraphClient;