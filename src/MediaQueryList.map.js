var MediaQueryList = can.Map.extend({
  init: function (query) {
    // Register media queries

    // trigger one check to populate matches
  },
  define: {

    matches: {
      value: false,
      type: 'boolean'
    },
    // Docs say media should be a "DOMString" type
    media: {
      Value: String
    }
  },
  addListener: function (cb) {
    // Register this callback with main window listener
  },
  removeListener: function (target) {
    // Unregister callback from main listener
  }
});