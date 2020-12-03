module.exports = (getDataElementValues) => ({
  buildInfo: {
    buildDate: '2019-11-07T20:31:52Z',
    environment: 'development',
    turbineBuildDate: '2019-06-25T22:25:24Z',
    turbineVersion: '1.0.0',
  },
  modules: {
    'adobe-cloud-connector/src/lib/actions/sendData.js': {
      extensionName: 'adobe-cloud-connector',
      displayName: 'Send Beacon',
      script: () => {},
    },
    'core/src/lib/dataElements/path.js': {
      extensionName: 'core',
      displayName: 'Path',
      script: () => {},
    },
    'core/src/lib/dataElements/customCode.js': {
      extensionName: 'core',
      displayName: 'Custom Code Data Element',
      script: () => {},
    },
    'core/src/lib/actions/customCode.js': {
      extensionName: 'core',
      displayName: 'Custom Code Action',
      script: () => {},
    },
    'core/src/lib/conditions/customCode.js': {
      extensionName: 'core',
      displayName: 'Custom Code Condition',
      script: () => {},
    },
  },
  dataElements: {
    ecid: {
      modulePath: 'core/src/lib/dataElements/path.js',
      settings: {
        path: 'event.xdm.identityMap.ECID[0].id',
      },
    },
    core: {
      modulePath: 'core/src/lib/dataElements/path.js',
      settings: {
        path: 'core',
      },
    },
    e1: {
      modulePath: 'core/src/lib/dataElements/customCode.js',
      settings: {
        source: function (settings, payload, turbine) {
          return getDataElementValue('e2');
        },
      },
    },
    "e2": {
      "modulePath": "core/src/lib/dataElements/customCode.js",
      "getSettings": context => getDataElementValues(['e3'], context).then(getDataElementValue => ({
        source: function (settings, payload, turbine) {
          return getDataElementValue("e3");
        }
      }))
    },
    "e3": {
      "modulePath": "core/src/lib/dataElements/customCode.js",
      "getSettings": context => getDataElementValues([], context).then(getDataElementValue => ({
        source: function (settings, payload, turbine) {
          return 910;
        }
      }))
    },
    myPrecious: {
      modulePath: 'core/src/lib/dataElements/customCode.js',
      settings: {
        source: function (settings, payload, turbine) {
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve('precious');
            }, 1444);
          });
        },
      },
    },
  },
  extensions: {
    'adobe-cloud-connector': {
      displayName: 'Adobe Cloud Connector',
    },
    core: {
      displayName: 'Core',
    },
  },
  company: {
    orgId: '0123ABC@AdobeOrg',
  },
  property: {
    name: 'server',
    settings: {
      platform: 'edge',
    },
  },
  rules: [
    {
      id: 'RLbb1d94c79fee4733a510564a86ba3c59',
      name: 'Send data to webhook',
      conditions: [
        {
          modulePath: 'core/src/lib/conditions/customCode.js',
          settings: {
            source: function (settings, payload, turbine) {
              return new Promise(function (resolve) {
                setTimeout(function () {
                  resolve(true);
                }, 1500);
              });
            },
          },
        },
      ],
      actions: [
        {
          modulePath: 'core/src/lib/actions/customCode.js',
          settings: {
            keyName: 'gigi',
            source: function (settings, payload, turbine) {
              return new Promise(function (resolve) {
                setTimeout(function () {
                  getDataElementValue('core a');
                  const b = (function () {
                    getDataElementValue('core a');
                  })(
                    (function a() {
                      getDataElementValue('core');
                    })(getDataElementValue('core'))
                  );
                  () => {
                    getDataElementValue('core');
                  };

                  const x = getDataElementValue('core');
                  const y = 'some getDataElementValue("core555")';
                  const y2 = "some getDataElementValue('core556')";
                  const y3 = "some getDataElementValue('core557')";
                  const y4 = 'some getDataElementValue("core558")';

                  getDataElementValue('core559');
                  getDataElementValue('core560');

                  const z = 5 + getDataElementValue('core');
                  const z2 = 5 + getDataElementValue('core') + 5;
                  resolve(5);
                }, 1500);
              });
            },
          },
        },
      ],
    },
  ],
});
