/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/18/13
 * Time: 7:05 PM
 * To change this template use File | Settings | File Templates.
 */
var EditorView = Backbone.View.extend({
    tagName: "canvas",
    className: "drawingCanvas",
    id: "editorDrawingCanvas",
    width: 1024,
    height: 1024,
    render: function() {
        this.$el.attr("width", this.width);
        this.$el.attr("height", this.height);
        return this;
    }
});
