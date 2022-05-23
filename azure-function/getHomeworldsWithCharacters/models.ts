export interface IName {
  name: string
}

export interface ICharacter extends IName {
  id: string
}

export interface IHomeworld extends IName {
  characters: ICharacter[]
}

export interface CharactersResponse {
  sWAPI_Characters: {
    edges: [
      {
        node: {
          birthYear: string | null | undefined,
          homeworld: {
            id: string,
            name: string
          }
          id: string,
          name: string
        }
      }
    ]
  }
};