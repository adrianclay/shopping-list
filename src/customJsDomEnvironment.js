// Issue and where this code was inspired from
// https://github.com/facebook/jest/issues/7780#issuecomment-615890410

const JSDomEnvironment = require('jest-environment-jsdom');

class JsDomEnvironmentWhileMaintainingArrays extends JSDomEnvironment {
  constructor(config) {
    super(
      Object.assign({}, config, {
        globals: Object.assign({}, config.globals, {
          Uint32Array: Uint32Array,
          Uint8Array: Uint8Array,
          ArrayBuffer: ArrayBuffer,
        }),
      }),
    );
  }

}

module.exports = JsDomEnvironmentWhileMaintainingArrays;
