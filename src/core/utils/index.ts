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

export { getFirstLetterUpperCase, getParsedStringName };
