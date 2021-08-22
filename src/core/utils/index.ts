const getFirstLetterUpperCase = (word: string) => {
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

export { getFirstLetterUpperCase, getParsedStringName, getRandomIndexes };
