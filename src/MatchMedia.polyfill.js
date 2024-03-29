// WIP
import can from 'can';
import MediaQueryList from './MediaQueryList.map';

var MatchMedia = can.Construct.extend({
    init: function (query) {
        return new MediaQueryList({media: query});
    }
}, {
    init: function () {
        // Add window width listener? Could use construct listeners...
        return;
    },
    windowCallback: function (ev) {
        // Checks if event matches a registered callback
        var match = false;
        if (match) {
            this.trigger(match, ev);
        }
    },
    one: function (query) {
        // Check query for matches
        if (query) {
            return;
        }
    },
    register: function () {},
    trigger: function (match, event) {
        // TODO: attach some extra properties to event object
        match.callback(event);
    }
});

export default MatchMedia;
