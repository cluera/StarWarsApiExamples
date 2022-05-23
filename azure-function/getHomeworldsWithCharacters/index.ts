import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { GraphQLClient, gql } from 'graphql-request';
import { CharactersResponse, ICharacter, IHomeworld } from './models';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const client = configureGraphQLClient();

    const query = gql`query {
        sWAPI_Characters (where: { birthYear: { exists: false }}) {
        edges {
            node {
            birthYear
            homeworld {
                id,
                name
            }
            id
            name
            }
        }
        }
    }`;
    const response = await client.request(query);
    const data: CharactersResponse = response;
    const homeworlds: IHomeworld[] = [];
    data.sWAPI_Characters.edges.forEach((edge) => {
        const homeworldIdx = homeworlds.findIndex((h) => h.name === edge.node.homeworld.name);
        const character: ICharacter = {
        id: edge.node.id,
        name: edge.node.name
        };

        if (homeworldIdx === -1) {
        homeworlds.push({
            name: edge.node.homeworld.name,
            characters: [
            character
            ]
        })
        } else {
        homeworlds[homeworldIdx].characters.push(character);
        }
    });
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: homeworlds
    };

};

const configureGraphQLClient = (): GraphQLClient => {
    const apiHost = process.env["API_HOST"];
    const appId = process.env["APP_ID"];
    const apiKey = process.env["API_KEY"];
  
    if (apiHost === undefined || appId === undefined || apiKey === undefined) {
      throw new Error('One or more environment variable are missing.');
    }
  
    return new GraphQLClient(apiHost, {
      headers: {
        'X-Parse-Application-Id': appId,
        'X-Parse-REST-API-Key': apiKey
      }
    });
  };

export default httpTrigger;