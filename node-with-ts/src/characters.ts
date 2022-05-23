import { GraphQLClient, gql } from 'graphql-request';
import { CharactersResponse, ICharacter, IHomeworld } from './models';
import 'dotenv/config';

export const getHomeworldsWithCharacters = async (): Promise<IHomeworld[]> => {
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

  const response: CharactersResponse = await client.request(query);

  const homeworlds: IHomeworld[] = [];
  response?.sWAPI_Characters?.edges?.forEach((edge) => {
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

  return homeworlds;
};

const configureGraphQLClient = (): GraphQLClient => {
  const apiHost = process.env.API_HOST;
  const appId = process.env.APP_ID;
  const apiKey = process.env.API_KEY;

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