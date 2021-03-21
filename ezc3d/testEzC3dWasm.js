var factory = require('./c3d_wrapper.js');

factory().then((instance) => {

  //console.log(instance)
  const api = {
    testReadC3d: instance.cwrap('testReadC3d', 'string', ['string']),
    testMessage: instance.cwrap('testMessage', 'string', ['string'])
  }

  console.log(api.testMessage('Hi there!'))
  let result = api.testReadC3d("/temp/Vicon.c3d");
  let json = JSON.parse(result);
  console.log(json)

});
