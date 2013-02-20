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
    initialize: function() {
        this.collection.on("add", this.onToolAdd, this);
    },
    onToolAdd: function(tool) {
        var toolClassName = tool.get('className');
        //If first tool
        if (this.collection.length == 1) {
            toolClassName += " first last";
        } else {
            toolClassName += " last";
            var prevTool = this.collection.at(this.collection.length-2);
            prevTool.set('className', prevTool.get('className').replace(/\s?last\s?/, ''));
        }
        tool.set('className', toolClassName);
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
    render: function() {
        var html = "<ul id='editorToolbar' class='toolbar'>"
        this.collection.forEach(function(tool) {
            var toolView = new ToolView({model: tool});
            html += toolView.render().$el.html();
        });
        html += "</ul>";
        this.$el.html(html);
        return this;
    }
});
