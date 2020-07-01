function checkStringAgainstNumber(string, num) {
   if (string.length > num) {
      return true;
   } else {
      return false;
   }
}

const MAX_CARD_CHARACTERS = 240;

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export { checkStringAgainstNumber, MAX_CARD_CHARACTERS, EMAIL_REGEX };
