import can from 'can';
import 'can/view/stache/stache';
var tag = 'interchange-';
var handleSource = function ($el) {
    if ($el.is('img')) {
        $el.attr('src', $el.attr('interchange-src'));
    } else {
        $el.css({
            'background-image': 'url(' + $el.attr('interchange-src') + ')'
        });
    }
};
// Return handler for unit testing
export {handleSource};

var mediaHandler = function (ev) {
    var $el = this;
    var parent = $el.parents('[interchange-parent]');
    var matches = ev.matches;
    if (matches) {
        // Turn off default in parent, if it has one
        if (parent.length > 0) {
            parent.find('[interchange-default]').hide();
        }
        // Apply the source if we have not done so already
        if (!this.data('matchedOnce')) {
            if (!$el.attr('src')) {
                handleSource($el);
            }
            $el.data('matchedOnce', true);
        }

        // Show this item
        $el.show();
    } else {
        $el.hide();
        // Turn on default of parent, if it has one and if it everything else is hidden
        if (parent.length > 0) {
            var items = 0;

            // Check if any siblings are visible
            parent.find('[interchange-item]').each(function () {
                if (can.$(this).is(':visible')) {
                    items++;
                }
            });

            // If no siblings visible, enable the default
            if (items === 0) {
                var def = parent.find('[interchange-default]');
                if (def) {
                    def.show();
                    if (def.attr('interchange-src')) {
                        handleSource(def);
                    }
                }
            }
        }
    }
};

// Return handler for unit testing
export {mediaHandler};

var attrHandler = function (el, data) {
    var $el = can.$(el);
    var attributeName = data.attributeName;
    var interchangeType = attributeName.substr(tag.length);
    var attrValue;
    var matches;
    // is parent
    if (interchangeType === 'item') {
        attrValue = el.getAttribute(attributeName);
        matches = matchMedia(attrValue);

        // Add listener when media query changes
        matches.addListener(can.proxy(mediaHandler, $el));

        //Initial call if matches exist
        var feuxEv = {
            media: attrValue,
            matches: matches.matches
        };
        mediaHandler.call($el, feuxEv);
    }

    // Remove listener when element is destroyed
    $el.bind('removed', function () {
        matches.removeListener(can.proxy(mediaHandler, $el));
    });
};
// Return handler for unit testing
export {attrHandler};

// Attach to `data-interchange` props
can.view.attr(/interchange-[\w\.]+/, attrHandler);
