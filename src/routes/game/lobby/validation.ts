import { array, boolean, object, string, number } from 'yup';

export const deckValidation = (minDeckSize: number, maxDeckSize: number) => {
  return object({
    //TODO enforce having a sprit
    material: array()
      .required()
      .of(string())
      .min(1, `Minimum material deck size is 1 card.`)
      .max(12, `Maximum material deck size is 12 cards.`),
    deck: array()
      .required()
      .of(string())
      .min(minDeckSize, `Minimum deck size is ${minDeckSize} cards.`)
      .max(maxDeckSize, `Maximum deck size is ${maxDeckSize} cards.`)
  });
};

export default deckValidation;
