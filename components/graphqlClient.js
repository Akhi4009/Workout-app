import {GraphQLClient, gql, request} from "graphql-request";

const url = `https://braga.stepzen.net/api/wobbling-angelfish/__graphql`;


const client = new GraphQLClient(url,{
    headers: {
        Authorization: 'apikey braga::stepzen.io+1000::8b083db0df4ff247a81d5044f502d8ba767c37b9cff137b529d38b2fb8a4c00c'
    }
});


export default client;