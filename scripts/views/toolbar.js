/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/18/13
 * Time: 8:08 PM
 * To change this template use File | Settings | File Templates.
 */
var Toolbar = Backbone.View.extend({
    className: "toolbar",
    id: "editorToolbar",
    tagName: "ul",
    //TODO: Update this to a function that selects a "default"
    currentTool: null,
    currentMenu: null,
    initialize: function() {
        return this.render();
    },
    render: function() {
        var idx = 0;
        this.collection.forEach(function(tool) {
            var toolView = new ToolView({model: tool});
            toolView.on("toolSelected", function(toolView) {
                this.currentTool = toolView.model;
                this.trigger('toolSelected');
            }, this);
            var toolEle = toolView.render().$el;
            if (idx == 0) {
                toolEle.addClass('first');
            }
            if (idx >= this.collection.length -1) {
                toolEle.addClass('last');
            }
            toolEle.addClass('toolbarControl');
            this.$el.append(toolEle);
        }, this);
        return this;
    }
});
