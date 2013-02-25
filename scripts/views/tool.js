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
    toolbarMenu: null,
    events: {
        "click img.toolIcon": "selectTool",
    },
    initialize: function() {
        this.template = Handlebars.compile($("#toolbarTemplate").html());
    },
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    selectTool: function(event) {
        this.trigger('toolSelected', this);
        if ($(event.target).parent("li.tool").hasClass('toolbarControl')) {
            return this.showToolsMenu(event);
        }
        else {
            return this.showToolSettingsMenu(event);
        }
    },
    getToolClass: function() {
        return /\s+ (.+Tool)/.exec(this.className);
    },
    showToolsMenu: function(event) {
        var selected = $(event.target).closest("ul.toolbar").find('li.selected');
        if (selected.length > 0 && selected[0] !== $(event.target).parent('li.tool')[0]) {
            selected.removeClass('selected');
            selected.children("ul.toolbarMenu").removeClass('selected').hide();
        }
        if (this.toolbarMenu) {
            this.toolbarMenu.model = null;
            this.toolbarMenu.collection = this.model.get("subTools");
            this.toolbarMenu.render();
        }
        else {
            this.toolbarMenu = new ToolbarMenu({collection: this.model.get("subTools")});
            $(event.target).parent('li.tool').append(this.toolbarMenu.render().$el.hide());
        }
        $(event.target).parent("li.tool").addClass('selected');
        this.toolbarMenu.$el.addClass('selected').show();
    },
    showToolSettingsMenu: function(event) {
        if (this.toolbarMenu) {
            this.toolbarMenu.collection = null;
            this.toolbarMenu.model = this.model;
            this.toolbarMenu.render();
        }
    }
});