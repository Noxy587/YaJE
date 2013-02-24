/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/23/13
 * Time: 5:39 PM
 * To change this template use File | Settings | File Templates.
 */
var ToolbarMenu = Backbone.View.extend({
    tagName: "ul",
    className: "toolbarMenu",
    render: function() {
        if (this.collection) {
            this.collection.forEach(function(tool) {
                var toolView = new ToolView({model: tool});
                this.$el.append(toolView.render().$el);
            }, this);
        }
        return this;
    }
});
