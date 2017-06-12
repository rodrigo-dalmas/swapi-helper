exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['feature.test.js'],
  capabilities: {
     'browserName': 'firefox'
  },
}
