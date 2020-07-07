module.exports = function getSignUpPasswordError(password, email) {
   if (password === "") {
      return "Please create a password.";
   }
   if (password.length < 9) {
      return "Your password must be at least 9 characters";
   }
   const localPartEmail = email.split("@")[0];
   if (password === localPartEmail) {
      return "Password cannot contain email.";
   }
   if (findNumberOfUniqueCharacters(password).length < 3) {
      return "Password must contain at least 3 unique characters";
   }

   return "";
};

function findNumberOfUniqueCharacters(str) {
   const arrFromString = str.split("");
   const arrOfUniqueCharacters = arrFromString.reduce((a, b) => {
      if (a.indexOf(b) === -1) {
         a.push(b);
      }
      return a;
   }, []);

   return arrOfUniqueCharacters;
}
