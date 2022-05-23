import * as Characters from './characters';
import { GraphQLClient } from 'graphql-request';

jest.mock('dotenv/config');

describe('getHomeworldsWithCharacters', () => {
  beforeEach(() => {
    process.env.API_HOST='http://something';
    process.env.APP_ID='abc';
    process.env.API_KEY='123';
  });
  
  test('returns homeworlds with characters', async () => {
    const mockGraphQLRequest = jest.spyOn(GraphQLClient.prototype, 'request');
    mockGraphQLRequest.mockResolvedValue({
      sWAPI_Characters: {
        edges: [
          {
            node: {
              birthYear: null,
              homeworld: {
                id: 'U1dBUElfUGxhbmV0OnoydUoxTjdSVWo=',
                name: 'Kamino'
              },
              id: 'U1dBUElfQ2hhcmFjdGVyOjB2a0tCb0MybUI=',
              name: 'Taun We'
            }
          },
          {
            node: {
              birthYear: null,
              homeworld: {
                id: 'U1dBUElfUGxhbmV0OnoydUoxTjdSVWo=',
                name: 'Kamino'
              },
              id: 'U1dBUElfQ2hhcmFjdGVyOlVmdUFqRk56Z2M=',
              name: 'Lama Su'
            }
          },
          {
            node: {
              birthYear: null,
              homeworld: {
                id: 'U1dBUElfUGxhbmV0OjQzTnpHc2FPOTA=',
                name: 'Alderaan'
              },
              id: 'U1dBUElfQ2hhcmFjdGVyOjJJTnZzRkhpbkY=',
              name: 'Leia Organa'
            }
          }
        ]
      }
    });

    expect.hasAssertions();
    await expect(Characters.getHomeworldsWithCharacters()).resolves.toStrictEqual([
      {
        'name': 'Kamino',
        'characters': [
          {'id': 'U1dBUElfQ2hhcmFjdGVyOjB2a0tCb0MybUI=', 'name': 'Taun We'},
          {'id': 'U1dBUElfQ2hhcmFjdGVyOlVmdUFqRk56Z2M=','name': 'Lama Su'}
        ]
      },
      {
        'name': 'Alderaan',
        'characters': [
          {'id': 'U1dBUElfQ2hhcmFjdGVyOjJJTnZzRkhpbkY=','name': 'Leia Organa'}
        ]
      }
    ])
    expect(mockGraphQLRequest).toBeCalled();
  });

  test('returns empty array when no characters are returned', async () => {
    const mockGraphQLRequest = jest.spyOn(GraphQLClient.prototype, 'request');
    mockGraphQLRequest.mockResolvedValue({
      sWAPI_Characters: {
        edges: []
      }
    });

    expect.hasAssertions();
    await expect(Characters.getHomeworldsWithCharacters()).resolves.toStrictEqual([])
    expect(mockGraphQLRequest).toBeCalled();
  });

  test('returns empty array if no data is returned from API', async () => {
    const mockGraphQLRequest = jest.spyOn(GraphQLClient.prototype, 'request');
    mockGraphQLRequest.mockResolvedValue(undefined);

    expect.hasAssertions();
    await expect(Characters.getHomeworldsWithCharacters()).resolves.toStrictEqual([])
    expect(mockGraphQLRequest).toBeCalled();
  });

  test('throws error if API call fails', async () => {
    const mockGraphQLRequest = jest.spyOn(GraphQLClient.prototype, 'request');
    const err = new Error('test');
    mockGraphQLRequest.mockRejectedValue(err);

    expect.hasAssertions();
    await expect(Characters.getHomeworldsWithCharacters()).rejects.toThrow(err);
    expect(mockGraphQLRequest).toBeCalled();
  });

  test.each(['API_HOST', 'APP_ID', 'API_KEY'])('throws error if environment variable %s is not configured', async (envVar) => {
    delete process.env[envVar];
    await expect(Characters.getHomeworldsWithCharacters()).rejects.toThrow(Error);
  });
});