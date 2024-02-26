import { Field, useFormikContext } from 'formik';
import React from 'react';
import CardImage from 'routes/game/components/elements/cardImage/CardImage';
import { DeckResponse } from 'interface/API/GetLobbyInfo.php';
import styles from './Deck.module.css';
import CardPopUp from 'routes/game/components/elements/cardPopUp/CardPopUp';

type DeckProps = {
  deck: string[];
};

const Deck = ({ deck }: DeckProps) => {
  const { values } = useFormikContext<DeckResponse>();

  return (
    <div className={styles.container}>
      {deck.map((card, ix) => {
        return (
          <div key={`deck${ix}`} className={styles.deckCardContainer}>
            <label>
              <Field type="checkbox" name="deck" value={`${card}`} />
              <CardPopUp cardNumber={card.split("-")[0]}>
                <CardImage
                  src={`/cardsquares/${card.split("-")[0]}.webp`}
                  draggable={false}
                  className={styles.card}
                />
              </CardPopUp>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Deck;
