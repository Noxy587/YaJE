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
    events: {
        "click li.tool": "selectTool"
    },
    loadToolbar: function(jsonSrc) {
        this.collection.reset();
        if (jsonSrc !== undefined && jsonSrc != null) {
            var self = this;
            $.getJSON(jsonSrc, function(toolbarJSON) {
                toolbarJSON.toolset.forEach(function(toolJSON) {
                    self.collection.add(new Tool(toolJSON));
                });
            });
        }
    },
    selectTool: function(event) {
        var selected = $("#"+this.id).find(".selected");
        if (selected.length > 0) {
            selected.removeClass('selected');
        }
        $(event.target).parent('li').addClass('selected');
        this.currentTool = this.collection.findToolWithElement(event.target);
        this.trigger('toolSelected');
    },
    render: function() {
        var idx = 0;
        this.collection.forEach(function(tool) {
            var toolView = new ToolView({model: tool});
            var toolEle = toolView.render().$el;
            if (idx == 0) {
                toolEle.addClass('first');
            }
            if (idx >= this.collection.length -1) {
                toolEle.addClass('last');
            }
            this.$el.append(toolEle);
        }, this);
        return this;
    }
});
