/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/18/13
 * Time: 8:47 PM
 * To change this template use File | Settings | File Templates.
 */
var App = Backbone.Router.extend({
    routes: {
        "*actions": "defaultRoute"
    },
    editor: function() {
        this.editorView = new EditorView({model: new EditorModel()});
        this.editorView.model.set('context', $("#"+this.editorView.model.get('id')));
        this.toolbar = new Toolbar({collection: new ToolSet()});
        if (this.toolbar.collection != undefined && this.toolbar.collection) {
            this.toolbar.collection.add({iconImg: "pencilIcon.png", className: "pencilTool"});
        }
        $("#appSpace").append(this.toolbar.render().$el);
        $("#appSpace").append(this.editorView.render().$el);
    }
});

window.onload = function() {
    window.app = new App();
    window.app.on('route:defaultRoute', window.app.editor());
}