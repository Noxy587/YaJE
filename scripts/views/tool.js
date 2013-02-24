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
    events: {
        "click": "selectTool"
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
            return this.selectToolbarControl(event);
        }
        else {
            //TODO Display tool settings
            $("ul.toolbarMenu.selected").removeClass('selected').hide();
        }
    },
    getToolClass: function() {
        return /\s+ (.+Tool)/.exec(this.className);
    },
    selectToolbarControl: function(event) {
        var selected = $(event.target).closest("ul.toolbar").find('li.selected');
        if (selected.length > 0 && selected[0] !== $(event.target).parent('li.tool')[0]) {
            selected.removeClass('selected');
            selected.children("ul.toolbarMenu").removeClass('selected').hide();
        }
        if ($(event.target).parent("li.tool").children("ul.toolbarMenu").length <= 0) {
            var toolbarMenu = new ToolbarMenu({collection: this.model.get("subTools")}).render().$el;
            $(event.target).parent("li.tool").append(toolbarMenu);
        }
        else {
            toolbarMenu = $(event.target).parent("li.tool").children("ul.toolbarMenu");
        }
        toolbarMenu.addClass('selected').show();
        $(event.target).parent("li.tool").addClass('selected');
    }
});