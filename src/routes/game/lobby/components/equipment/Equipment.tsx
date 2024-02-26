import { Field, FieldArray, useFormikContext } from 'formik';
import React from 'react';
import CardImage from 'routes/game/components/elements/cardImage/CardImage';
import {
  DeckResponse,
  GetLobbyInfoResponse,
  CardData
} from 'interface/API/GetLobbyInfo.php';
import styles from './Equipment.module.css';
import CardPopUp from 'routes/game/components/elements/cardPopUp/CardPopUp';

type EquipmentProps = {
  lobbyInfo: GetLobbyInfoResponse;
  material: string[];
  materialSB: string[];
};

const Equipment = ({ lobbyInfo, material, materialSB }: EquipmentProps) => {
  const { values } = useFormikContext<DeckResponse>();
  const allMaterial = [...material, ...materialSB];
  const demiHero = [...(lobbyInfo.deck.demiHero ?? [])];
  return (
    <div className={styles.container}>
      <div className={styles.eqCategory}>
        <FieldArray
          name="material"
          render={(arrayHelpers) => (
            <div className={styles.categoryContainer}>
              {allMaterial.map((card, ix) => {
                return (
                  <div key={`deck${ix}`} className={styles.cardContainer}>
                    <label>
                        {/*Removed equipment selection/ TODO: re-implement as sideboarding */}
                      <CardPopUp cardNumber={card}>
                        <CardImage
                          src={`/cardsquares/${card}.webp`}
                          draggable={false}
                          className={styles.card}
                        />
                      </CardPopUp>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        />
      </div>
      {demiHero.length > 0 && (
        <div className={styles.eqCategory}>
          <h3>Demi-Hero</h3>
          <div className={styles.categoryContainer}>
            {demiHero.map((card, ix) => {
              return (
                <div key={`deck${ix}`} className={styles.cardContainer}>
                  <label>
                    <CardPopUp cardNumber={card}>
                      <CardImage
                        src={`/cardsquares/${card}.webp`}
                        draggable={false}
                        className={styles.card}
                      />
                    </CardPopUp>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className={styles.spacerDiv}></div>
    </div>
  );
};

export default Equipment;
