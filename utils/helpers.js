module.exports = {
   toJson(data) {
      return JSON.stringify(data);
   },
   toSafeParse(string) {
      try {
         JSON.parse(string);
      } catch (error) {
         console.log(error);
         return string;
      }

      return JSON.parse(string);
   },
};
