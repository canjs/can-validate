"format steal";
steal("can/view/stache", "can/view/stache/intermediate_and_imports.js",function(stache, getIntermediateAndImports){

    function translate(load) {
        var intermediateAndImports = getIntermediateAndImports(load.source);

        intermediateAndImports.imports.unshift('can/view/stache/stache');
        var id = load.metadata.pluginArgument.replace(/\/|\./ig, '_');
        //Use preloadStringRenderer so the resulting renderer function has the render property. This is a temporary fix used on conjunction with
        //util/computeFix.
        return "define("+JSON.stringify(intermediateAndImports.imports)+",function(stache){" +
            "return can.view.preloadStringRenderer('" + id + "', stache(" + JSON.stringify(intermediateAndImports.intermediate) + "))" +
        "})";
    }

    return {
        translate: translate
    };

});
