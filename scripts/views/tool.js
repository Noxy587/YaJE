/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/18/13
 * Time: 8:41 PM
 * To change this template use File | Settings | File Templates.
 */
var ToolView = Backbone.View.extend({
    tagName: 'li',
    className: 'tool',
    initialize: function() {
        this.template = Handlebars.compile($("#toolbarTemplate").html());
    },
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});