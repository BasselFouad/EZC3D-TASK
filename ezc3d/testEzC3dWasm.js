var factory = require('./c3d_wrapper.js');

factory().then((instance) => {

  const api = {
    testFunction: instance.cwrap('testFunction', 'string', []),
    testMessage: instance.cwrap('testMessage', 'string', [])
  }

  let jsonParsed = JSON.parse(api.testFunction());
  console.log(jsonParsed.data)
  console.log(api.testMessage());

});
