/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/23/13
 * Time: 11:24 PM
 * To change this template use File | Settings | File Templates.
 */
var ToolSettingView = Backbone.View.extend({
    tagName: "li",
    className: "toolSetting",
    settingObject: null,
    events: {
        "change input": "settingUpdated"
    },
    initialize: function() {
        this.template = Handlebars.compile($("#toolSettingTemplate").html());
    },
    render: function() {
        if (this.settingObject) {
            this.$el.html(this.template({"settings": this.settingObject}));
            if (this.settingObject.type == 'color') {
                var colorPicker = new jscolor.color(this.$el.find('input.color')[0]);
            }
        }
        return this;
    },
    settingUpdated: function(event) {
        if (this.model && this.settingObject) {
            var newValue = $(event.target).val();
            var fieldName = this.settingObject.field;
            var newSettingObj = {};
            newSettingObj[fieldName] = newValue;
            this.model.set(newSettingObj);
        }
    }
});
