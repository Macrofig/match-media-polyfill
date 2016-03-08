// WIP
import can from 'can';

var MediaQueryList = can.Map.extend({
    init: function (query) {
        // Register media queries
        // trigger one check to populate matches
        if (query) {
            return;
        }
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
        if (cb) {
            return;
        }
    },
    removeListener: function (target) {
        // Unregister callback from main listener
        if (target) {
            return;
        }
    }
});

export default MediaQueryList;
