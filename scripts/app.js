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
        this.loadTools();
        this.toolbar.on('toolSelected', this.toolSelected, this);
        $("#appSpace").append(this.toolbar.render().$el);
        $("#appSpace").append(this.editorView.render().$el);
    },
    toolSelected: function(event) {
        this.editorView.model.set('currentTool', this.toolbar.currentTool);
        var cursorFile = "img/"+this.toolbar.currentTool.get("cursorImg");
        this.editorView.el.style.cursor = "url("+cursorFile+"),default";
    },
    loadTools: function() {
        if (this.toolbar && this.toolbar.collection) {
            var pencilTool = new Tool({"iconImg":"pencilIcon.png", "cursorImg":"pencilCursor.png", "className": "pencilTool"});
            this.toolbar.collection.add(pencilTool);
            var eraserTool = new Tool({"iconImg":"eraserIcon.png", "cursorImg":"eraserCursor.png", "className": "eraserTool"});
            this.toolbar.collection.add(eraserTool);

            var pencilSubTools = new Toolset();
            pencilSubTools.add(pencilTool);
            pencilTool.set({"subTools": pencilSubTools});

            var eraserSubTools = new Toolset();
            eraserSubTools.add(eraserTool);
            eraserTool.set({"subTools": eraserSubTools});
        }
    }
});

window.onload = function() {
    window.app = new App();
    window.app.on('route:defaultRoute', window.app.editor());
}