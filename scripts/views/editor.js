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
    events: {
        "mousedown": "startEditing",
        "mouseup": "stopEditing",
        "mousemove": "mouseMoved"
    },
    getContext: function() {
        var context = this.el.getContext("2d");
        var currentTool = this.model.get('currentTool');
        if (currentTool) {
            context = currentTool.buildContext(context);
        }
        return context;
    },
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.attr("width", this.width);
        this.$el.attr("height", this.height);
        return this;
    },
    startEditing: function(event) {
        this.model.set("isEditing", true);
        var startCoords = this.coordsFromEvent(event);
        this.model.set("startCoords", startCoords);
        var selectedToolEle = window.app.toolbar.$el.find('.selected');
        if (selectedToolEle.length > 0) {
            selectedToolEle.children("ul.selected").hide();
        }
        var selectedTool = this.model.get("currentTool");
        if (selectedTool) {
            var toolType = selectedTool.get("className");
            var context = this.getContext();
            if(toolType == "pencilTool") {
                context.beginPath();
                context.moveTo(startCoords.x, startCoords.y);
                context.lineTo(startCoords.x, startCoords.y);
                context.stroke();
            }
        }

    },
    stopEditing: function(event) {
        this.model.set("isEditing", false);
    },
    mouseMoved: function(event) {
        if(this.model.get("isEditing")) {
            var context = this.getContext();
            var coords = this.coordsFromEvent(event);
            context.lineTo(coords.x, coords.y);
            context.stroke();
        }
    },
    coordsFromEvent: function(event) {
        return {x: event.pageX-8, y: event.pageY+24};
    }
});
