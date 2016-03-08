# Match Media Polyfill and Friends

I tried using simple media queries like so:

```js
<p interchange-item="(max-width: 480px)">
    <img src="https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_m.jpg">
</p>
```
This works fine except when you want to have a group of items. In some cases, you don't want to render the innerHTML until the media query evaluates to true. Like in this example:

```html
    <p interchange-item="(max-width: 480px)">
        <img src="https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_m.jpg">
    </p>
    <p interchange-item="(max-width: 1024px) and (min-width: 481px)">
        <img src="https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_z.jpg">
    </p>
    <p interchange-item="(only screen)">
        <img src="https://c1.staticflickr.com/3/2502/3730369443_7e6ec0ae75_o.jpg">
    </p>
```

The last item is our default. We don't want that item to render if the other two render. Furthermore, we don't want the any of the items to render until their query evaluates to true. This will prevent unnecessary loading of the image asset.

This is what I have now, which fixes my default issue:

```html
<div interchange-parent>
    <p interchange-item="(max-width: 480px)">
        <img src="https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_m.jpg">
    </p>
    <p interchange-item="(max-width: 1024px) and (min-width: 481px)">
        <img src="https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_z.jpg">
    </p>
    <p interchange-default>
        <img src="https://c1.staticflickr.com/3/2502/3730369443_7e6ec0ae75_o.jpg">
    </p>
</div>
```

But I still have the problem of rendering the content before it is ready.  This leads me to two ideas:

**Idea 1:**

```html
<div interchange-parent>
    <p interchange-item="(max-width: 480px)" interchange-src="https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_m.jpg"></p>
    <p interchange-item="(max-width: 1024px) and (min-width: 481px)" interchange-src="https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_z.jpg"></p>
    <p interchange-default interchange-src="https://c1.staticflickr.com/3/2502/3730369443_7e6ec0ae75_o.jpg"></p>
</div>
```
Doing this will create an `img` element on the fly when the query evaluates to true.

**Idea 2:**

```html
<div interchange-parent>
    <img interchange-item="(max-width: 480px)|https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_m.jpg">
    <img interchange-item="(max-width: 1024px) and (min-width: 481px)|https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_z.jpg">
    <img interchange-default="https://c1.staticflickr.com/3/2502/3730369443_7e6ec0ae75_o.jpg">
</div>
```

This uses the same api as Foundation. The can.view.attr knows what element the interchange is attaching to and will handle it properly. So, if, for example, one used a `div` instead of an `img` and the url ended in a valid image extension, than the image would be loaded as a background image property instead.

I would prefer to use what I have now. But instead of using jQuery's hide/show, I would wrap remove the innerHTML and move it to shadow dom, where I can toggle it's visiblity using a block helper with Stache. The end result would look kinda like:


```html
<p interchange-item="(max-width: 480px)" style="{{#if visible}}display:block;{{else}}display:none;{{/if}}">
    {{! This would be false by default, then, when query evals to true, this becomes true for life.}}
    {{! This way, the innerHTML loads only when actually needed}}
    {{#matchedOnce}}
    <img src="https://c1.staticflickr.com/3/2502/3730369443_dd0f2cfa44_m.jpg">
    {{/matchedOnce}}
</p>
```

So, I tried this and there's a huge problem, the image tag renders on load just before I strip it out. This defeats the purpose since we don't want the browser to load the image source.


### Documents used for research

- http://foundation.zurb.com/sites/docs/v/5.5.3/components/interchange.html
- https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
- https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
