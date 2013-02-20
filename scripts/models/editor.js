/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/18/13
 * Time: 6:59 PM
 * To change this template use File | Settings | File Templates.
 */

var EditorModel = Backbone.Model.extend({
    initialize: function() {
        this.className = "drawingCanvas";
        this.id = "editorDrawingCanvas";
        this.width = 1024;
        this.height = 1024;
    }
});
