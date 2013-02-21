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
        this.toolbar = new Toolbar({collection: new Toolset()});
        if (this.toolbar.collection != undefined && this.toolbar.collection) {
            var toolsJSString = '[{"iconImg": "pencilIcon.png", "className": "pencilTool"}]';
            var toolsJSON = JSON.parse(toolsJSString);
            if (typeof(toolsJSON) == "object") {
                toolsJSON.forEach(function(item) {
                    var newTool = new Tool(item);
                    this.toolbar.collection.add(newTool);
                    newTool.on("click", this.editorView.onToolSelect, this.editorView);
                });
            }
        }
        $("#appSpace").append(this.toolbar.render().$el);
        $("#appSpace").append(this.editorView.render().$el);
    }
});

window.onload = function() {
    window.app = new App();
    window.app.on('route:defaultRoute', window.app.editor());
}