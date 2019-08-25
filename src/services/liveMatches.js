import jsonp from "jsonp";

export const getLiveMatches = () => {
  let callBack;
  const promise = new Promise((resolve, reject) => {
    callBack = (error, values) => {
      if (error) {
        return reject(error);
      }
      resolve(values);
    };
  });

  jsonp(
    "http://api.unicdn.net/v1/feeds/sportsbook/event/live.jsonp?app_id=ca7871d7&app_key=5371c125b8d99c8f6b5ff9a12de8b85a",
    callBack
  );

  return promise;
};
