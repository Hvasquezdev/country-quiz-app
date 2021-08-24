import { GenericObject } from '../domain/models/GenericObject';

const getFirstLetterUpperCase = (word: string): string => {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
};

const getParsedStringName = (name: string): string => {
  const wordsArr = name.split(' ');
  const parsedName = wordsArr.map((word, index) => {
    if (index > 0) {
      return getFirstLetterUpperCase(word.toLocaleLowerCase());
    }

    return word.toLocaleLowerCase();
  });

  return parsedName.join('');
};

const getRandomIndexes = (quantity: number, limit: number): number[] => {
  const indexes: { [key: number]: number } = {};

  while (Object.keys(indexes).length < quantity) {
    const randomNumber = Math.floor(Math.random() * limit);

    if (!(randomNumber in indexes)) {
      indexes[randomNumber] = randomNumber;
    }
  }

  return Object.values(indexes);
};

const suffleArrayOfObjects = (
  arr: Array<GenericObject>
): Array<GenericObject> => {
  const stringifyList = arr.map((el: GenericObject) => JSON.stringify(el));
  const shuffledArr = shuffleArray(stringifyList) as Array<string>;

  return shuffledArr.map((el: string) => JSON.parse(el));
};

const shuffleArray = (arr: Array<string | number>): Array<string | number> => {
  const arrToShuffle = Array.from(arr);

  for (let i = arrToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    if (j !== i) {
      [arrToShuffle[i], arrToShuffle[j]] = [arrToShuffle[j], arrToShuffle[i]];
    }
  }

  return arrToShuffle;
};

async function delay(delayTime: number): Promise<void> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve();
      clearTimeout(timeout);
    }, delayTime);
  });
}

export {
  getFirstLetterUpperCase,
  getParsedStringName,
  shuffleArray,
  suffleArrayOfObjects,
  getRandomIndexes,
  delay,
};
