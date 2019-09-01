const contentful = require("contentful");

const client = contentful.createClient({
  space: "kk2bw5ojx476",
  environment: "master",
  accessToken:
    "7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c"
});

export const getRecipes = () =>
  client.getEntries({
    "sys.contentType.sys.id": "recipe"
  });
