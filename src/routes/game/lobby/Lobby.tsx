import React, {useEffect, useState} from 'react';
import Deck from './components/deck/Deck';
import LobbyChat from './components/lobbyChat/LobbyChat';
import Calculator from './components/calculator/Calculator';
import testData from './mockdata.json';
import styles from './Lobby.module.css';
import Equipment from './components/equipment/Equipment';
import classNames from 'classnames';
import {FaExclamationCircle} from 'react-icons/fa';
import {GiCapeArmor} from "react-icons/gi";
import {SiBookstack} from "react-icons/si";
import {Form, Formik} from 'formik';
import deckValidation from './validation';
import StickyFooter from './components/stickyFooter/StickyFooter';
import {
  useGetLobbyInfoQuery,
  useSubmitSideboardMutation,
  useSubmitLobbyInputMutation
} from 'features/api/apiSlice';
import {useAppSelector} from 'app/Hooks';
import {shallowEqual} from 'react-redux';
import {RootState} from 'app/Store';
import {DeckResponse} from 'interface/API/GetLobbyInfo.php';
import LobbyUpdateHandler from './components/updateHandler/SideboardUpdateHandler';
import {GAME_FORMAT, BREAKPOINT_EXTRA_LARGE} from 'appConstants';
import ChooseFirstTurn from './components/chooseFirstTurn/ChooseFirstTurn';
import useWindowDimensions from 'hooks/useWindowDimensions';
import {SubmitSideboardAPI} from 'interface/API/SubmitSideboard.php';
import {useNavigate} from 'react-router-dom';
import CardPortal from '../components/elements/cardPortal/CardPortal';
import Matchups from './components/matchups/Matchups';
import {GameLocationState} from 'interface/GameLocationState';
import CardPopUp from '../components/elements/cardPopUp/CardPopUp';
import {getGameInfo} from 'features/game/GameSlice';
import useSound from 'use-sound';
import playerJoined from 'sounds/playerJoinedSound.mp3';
import {createPortal} from 'react-dom';
import {useAppDispatch} from 'app/Hooks';
import useAuth from 'hooks/useAuth';

const Lobby = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('equipment');
  const [unreadChat, setUnreadChat] = useState<boolean>(false);
  const [width, height] = useWindowDimensions();
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {playerID, gameID, authKey} = useAppSelector(
    getGameInfo,
    shallowEqual
  );
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState<boolean>(false);
  const gameLobby = useAppSelector(
    (state: RootState) => state.game.gameLobby,
    shallowEqual
  );
  const [playLobbyJoin] = useSound(playerJoined, {volume: 1});
  const {isPatron} = useAuth();

  let {data, isLoading, refetch} = useGetLobbyInfoQuery({
    gameName: gameID,
    playerID: playerID,
    authKey: authKey
  });

  const [submitSideboardMutation, submitSideboardMutationData] =
    useSubmitSideboardMutation();

  const [submitLobbyInput, submitLobbyInputData] =
    useSubmitLobbyInputMutation();

  useEffect(() => {
    if (gameLobby?.theirName != undefined && gameLobby?.theirName != '') {
      playLobbyJoin();
    }
  }, [gameLobby?.theirName]);

  useEffect(() => {
    setIsWideScreen(width > BREAKPOINT_EXTRA_LARGE);
  }, [width]);

  const handleEquipmentClick = () => {
    setActiveTab('equipment');
  };

  const handleDeckClick = () => {
    setActiveTab('deck');
  };

  const handleChatClick = () => {
    setUnreadChat(false);
    setActiveTab('chat');
  };

  const toggleShowCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  const handleMatchupClick = () => setActiveTab('matchups');

  if (data === undefined || data === null || Object.keys(data).length === 0) {
    data = testData;
  }

  if (data === undefined || data === null || !data.deck) {
    return null;
  }

  // if the game is ready then let's join the main game
  if (gameLobby?.isMainGameReady) {
    const searchParam = {
      playerID: String(playerID),
      gameName: String(gameID)
    };
    navigate(`/game/play/${gameID}`, {
      state: {playerID: playerID ?? 0} as GameLocationState
    });
  }

  const deckClone = [...data.deck.cards];
  const deckSBClone = [...data.deck.cardsSB];
  const deckIndexed = deckClone.sort().map((card, ix) => `${card}-${ix}`);
  const deckSBIndexed = deckSBClone
    .sort()
    .map((card, ix) => `${card}-${ix + deckIndexed.length}`);

  const leftPic = `url(/crops/${
    data.deck.hero === 'CardBack' ? 'UNKNOWNHERO' : data.deck.hero
  }_cropped.png)`;
  const rightPic = `url(/crops/${
    gameLobby?.theirHero === 'CardBack' ? 'UNKNOWNHERO' : gameLobby?.theirHero
  }_cropped.png)`;

  const eqClasses = classNames({secondary: activeTab !== 'equipment'});
  const deckClasses = classNames({secondary: activeTab !== 'deck'});
  const chatClasses = classNames({secondary: activeTab !== 'chat'});
  const matchupClasses = classNames({secondary: activeTab !== 'matchups'});
  const leaveClasses = classNames('secondary outline');

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Need a way to announce to the server that we are leaving
    navigate(`/`);
  };

  let deckSize = 60;
  let maxDeckSize = 99999;
  switch (data.format) {
    case GAME_FORMAT.BLITZ:
    case GAME_FORMAT.COMPETITIVE_BLITZ:
    case GAME_FORMAT.LLBLITZ:
      maxDeckSize = 40;
      deckSize = 40;
      break;
    case GAME_FORMAT.COMMONER:
    case GAME_FORMAT.CLASH:
      deckSize = 40;
      break;
    case GAME_FORMAT.SEALED:
    case GAME_FORMAT.DRAFT:
      deckSize = 30;
      break;
    case GAME_FORMAT.OPEN_FORMAT:
      deckSize = 0;
      break;
    default:
  }

  const mainClassNames = classNames(styles.lobbyClass);

  const [showChatModal, setShowChatModal] = useState(true);
  const [chatModal, setChatModal] = useState('');
  const [modal, setModal] = useState('Do you want to enable chat?');
  const dispatch = useAppDispatch();

  const clickYes = (e: any) => {
    e.preventDefault();
    setShowChatModal(false);
    submitLobbyInput({
      gameName: gameID,
      playerID: playerID,
      authKey: authKey,
      action: 'Request Chat'
    });
  };

  const clickNo = (e: any) => {
    e.preventDefault();
    setShowChatModal(false);
  };

  console.log(gameLobby?.chatInvited + ' ' + showChatModal);

  const needToDoDisclaimer = !acceptedDisclaimer && data.format === GAME_FORMAT.OPEN_FORMAT;
  //const needToDoDisclaimer = false;

  const handleFormSubmission = async (values: DeckResponse) => {
    setIsSubmitting(true);

    const selectedMaterial = values.material.map((card) => card);
    const selectedDeck = values.deck.map((card) => card);
    const inventory = [
      ...(data?.deck?.material ?? [])
        .concat(data?.deck?.materialSB ?? [])
        .filter((card) => !selectedMaterial.includes(card) && card !== 'NONE00'),
      ...(data?.deck?.demiHero ?? [])
    ];

    // encode it as an object
    const submitDeck = {
      hero: data?.deck.hero,
      selectedMaterial,
      selectedDeck,
      inventory
    };
    const requestBody: SubmitSideboardAPI = {
      gameName: gameID,
      playerID: playerID,
      authKey: authKey,
      submission: JSON.stringify(submitDeck) // the API unmarshals the JSON inside the unmarshaled JSON.
    };

    try {
      const data: any = await submitSideboardMutation(requestBody).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={mainClassNames}>
      {gameLobby?.chatInvited &&
        showChatModal &&
        createPortal(
          <>
            <dialog open className={styles.modal}>
              <article>
                <header>{modal}</header>
                <button onClick={clickYes}>YES</button>
                <button onClick={clickNo}>NO</button>
              </article>
            </dialog>
          </>,
          document.body
        )}
      {needToDoDisclaimer &&
        createPortal(
          <>
            <dialog open={needToDoDisclaimer}>
              <article className={styles.disclaimerArticles}>
                <header style={{marginBottom: '1em'}}>
                  ⚠️ Open Format Disclaimer
                </header>
                <p style={{marginBottom: '1em'}}>
                  Note that new cards are added on a 'best-effort' basis and
                  there may be more bugs and/or other innacurate card
                  interactions than usual, since there are no official release
                  notes from Weebs of the Shore yet.
                </p>
                <div className={styles.disclaimerButtons}>
                  <button
                    onClick={() => {
                      setAcceptedDisclaimer(true);
                    }}
                  >
                    I Accept!
                  </button>
                </div>
                <div className={styles.disclaimerButtons}>
                  <button
                    onClick={() => {
                      navigate('/');
                    }}
                    className="outline"
                  >
                    No Thanks!
                  </button>
                </div>
              </article>
            </dialog>
          </>,
          document.body
        )}
      <LobbyUpdateHandler isSubmitting={isSubmitting}/>
      <Formik
        initialValues={{
          deck: deckIndexed,
          material: [...data.deck.material]
        }}
        onSubmit={handleFormSubmission}
        validationSchema={deckValidation(deckSize, maxDeckSize)}
        enableReinitialize
      >
        <Form className={styles.form}>
          <div className={styles.gridLayout}>
            <div className={styles.titleContainer}>
              <CardPopUp
                cardNumber={data.deck.hero}
                containerClass={styles.leftCol}
              >
                <div
                  className={styles.leftCol}
                  style={{backgroundImage: leftPic}}
                >
                  <div className={styles.dimPic}>
                    <h3 aria-busy={isLoading}>{data.displayName.substring(0, 14)}</h3>
                    <div className={styles.heroName}>{data.deck.heroName}</div>
                  </div>
                </div>
              </CardPopUp>
              <CardPopUp
                cardNumber={gameLobby?.theirHero ?? 'CardBack'}
                containerClass={styles.rightCol}
              >
                <div
                  className={styles.rightCol}
                  style={{backgroundImage: rightPic}}
                >
                  <div className={styles.dimPic}>
                    <h3 aria-busy={!gameLobby?.theirName}>
                      {gameLobby?.theirName ?? ''}
                    </h3>
                    <div className={styles.heroName}>
                      {gameLobby?.theirHeroName != ''
                        ? gameLobby?.theirHeroName
                        : 'Waiting For Opponent'}
                    </div>
                  </div>
                </div>
              </CardPopUp>
            </div>
            {gameLobby?.amIChoosingFirstPlayer && !needToDoDisclaimer
              ? createPortal(<ChooseFirstTurn/>, document.body)
              : !isWideScreen && (
              <nav className={styles.mobileNav}>
                <ul>
                  {!isWideScreen && (
                    <li>
                      <button
                        className={leaveClasses}
                        onClick={handleLeave}
                        type="button"
                      >
                        Leave
                      </button>
                    </li>
                  )}
                </ul>
                <ul>
                  {gameLobby?.matchups != undefined &&
                    gameLobby?.matchups?.length > 0 && (
                      <li>
                        <button
                          className={matchupClasses}
                          onClick={handleMatchupClick}
                          type="button"
                        >
                          Matchups
                        </button>
                      </li>
                    )}
                  <li>
                    <button
                      className={eqClasses}
                      onClick={handleEquipmentClick}
                      type="button"
                    >
                      <div
                        className={styles.icon}>
                        <GiCapeArmor/>
                      </div>
                      Material
                    </button>
                  </li>
                  <li>
                    <button
                      className={deckClasses}
                      onClick={handleDeckClick}
                      type="button"
                    >
                      <div
                        className={styles.icon}>
                        <SiBookstack/>
                      </div>
                      Deck
                    </button>
                  </li>
                  <li>
                    <button
                      className={chatClasses}
                      onClick={handleChatClick}
                      type="button"
                    >
                      {unreadChat && (
                        <>
                          <FaExclamationCircle/>{' '}
                        </>
                      )}
                      Chat
                    </button>
                  </li>
                </ul>
              </nav>
            )}
            {isWideScreen ? (
              <div className={styles.deckSelectorContainer}>
                <nav className={styles.inLineNav}>
                  <ul>
                    <li>
                      <button
                        className={eqClasses}
                        onClick={handleEquipmentClick}
                        type="button"
                      >
                        <div
                          className={styles.icon}>
                          <GiCapeArmor/>
                        </div>
                        Material
                      </button>
                    </li>
                    <li>
                      <button
                        className={deckClasses}
                        onClick={handleDeckClick}
                        type="button"
                      >
                        <div
                          className={styles.icon}>
                          <SiBookstack/>
                        </div>
                        Deck
                      </button>
                    </li>
                  </ul>
                </nav>
                {activeTab !== 'deck' && (
                  <Equipment
                    lobbyInfo={data}
                    material={[...data.deck.material]}
                    materialSB={[...data.deck.materialSB]}
                  />
                )}
                {activeTab === 'deck' && (
                  <Deck deck={[...deckIndexed, ...deckSBIndexed]}/>
                )}
              </div>
            ) : (
              <>
                {activeTab === 'equipment' && (
                  <Equipment
                    lobbyInfo={data}
                    material={[...data.deck.material]}
                    materialSB={[...data.deck.materialSB]}
                  />
                )}
                {activeTab === 'deck' && (
                  <Deck deck={[...deckIndexed, ...deckSBIndexed]}/>
                )}
              </>
            )}
            {(activeTab === 'chat' || isWideScreen) && showCalculator && <Calculator/>}
            {(activeTab === 'chat' || isWideScreen) && !showCalculator && <LobbyChat/>}

            {isPatron == "1" && isWideScreen &&
              <button
                className={styles.smallButton}
                onClick={(e) => {
                  e.preventDefault();
                  toggleShowCalculator();
                }}
                disabled={false}>
                Calculator
              </button>
            }

            {isPatron != "1" && isWideScreen &&
              <div className={styles.patreonLink}>Support our <a href='https://www.patreon.com/clarent'
                                                                 target='_blank'>patreon</a> to use dynamic
                hypergeometric calculator!</div>
            }

            <div className={styles.spacer}></div>

            {(activeTab === 'matchups' || isWideScreen) && (
              <Matchups refetch={refetch}/>
            )}
            {!gameLobby?.amIChoosingFirstPlayer ? (
              <StickyFooter
                deckSize={deckSize}
                submitSideboard={gameLobby?.canSubmitSideboard ?? false}
                handleLeave={handleLeave}
                isWidescreen={isWideScreen}
              />
            ) : null}
          </div>
        </Form>
      </Formik>
      <CardPortal/>
    </main>
  );
};

export default Lobby;
