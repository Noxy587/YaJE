/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/18/13
 * Time: 7:05 PM
 * To change this template use File | Settings | File Templates.
 */
var EditorView = Backbone.View.extend({
    initialize: function() {
        this.template = Handlebars.compile($("#editorTemplate").html());
    },
    render: function() {
        this.$el.html(this.template(this.model));
        return this;
    }
});
