export interface GetLobbyInfo {
  gameName?: number;
  playerID?: number;
  authKey?: string;
}

export interface Deck {
  heroName: string;
  hero: string;
  material: string[];
  cards: string[];
  materialSB: string[];
  cardsSB: string[];
  demiHero?: string[];
  cardDictionary?: CardData[];
}



export interface CardData {
  id:string;
  pitch:number;
}

export interface GetLobbyInfoResponse {
  badges: string[];
  amIActive: boolean;
  nameColor: string;
  displayName: string;
  overlayURL: string;
  deck: Deck;
  format: string;
}

export interface DeckResponse {
  deck: string[];
  material: string[];
  inventory?: string[];
}
