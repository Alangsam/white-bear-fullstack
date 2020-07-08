function checkStringAgainstNumber(string, num) {
   if (string.length > num) {
      return true;
   } else {
      return false;
   }
}

const MAX_CARD_CHARACTERS = 240;

// eslint-disable-next-line

export { checkStringAgainstNumber, MAX_CARD_CHARACTERS };
