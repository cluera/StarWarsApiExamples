import * as Characters from './characters';

Characters.getHomeworldsWithCharacters().then((result) => {
  console.log(`Homeworlds: ${JSON.stringify(result)}`);
}).catch((err) => {
  console.log(`An error occurred! '${err}'`);
});