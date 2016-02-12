import can from 'can';

var attrHandler = function () {

};

// Attach to `data-interchange` props
can.view.attr('data-interchange', function ($el, data) {
    var attrValue = $el.getAttribute('data-interchange');

    var matches = window.matchMedia(attrValue);

    // Add listener when media query changes
    var listener = matches.addListener(attrHandler);

    //Initial call if matches exist
    if (matches.matches) {
        //attrHandler(matches.media);
    }

    // TODO: When $el is removed from dom, listener on `matches` should be removed
});
