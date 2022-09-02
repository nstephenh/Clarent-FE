import CombatChainLink from './CombatChainLink';
import GameInfo from './GameInfo';
import Player from './Player';

export default interface GameState {
  gameInfo: GameInfo;
  playerOne: Player;
  playerTwo: Player;
  activeCombatChain?: CombatChainLink;
  oldCombatChain?: CombatChainLink[];
  activePlayer?: number; // 1 is us 2 is them
}