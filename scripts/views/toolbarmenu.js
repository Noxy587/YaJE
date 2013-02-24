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
        this.$el.html("");
        //collection will render tools
        if (this.collection) {
            return this.renderToolMenu();
        }
        //model will render settings
        else if (this.model) {
            return this.renderSettingsMenu();
        }
        //just return self
        return this;
    },
    renderToolMenu: function() {
        this.collection.forEach(function(tool) {
            var toolView = new ToolView({model: tool});
            this.$el.append( toolView.render().$el);
        }, this);
        return this;
    },
    renderSettingsMenu: function() {
        var settings = this.model.settingsFields();
        settings.forEach(function(setting){
            var settingView = new ToolSettingView();
            settingView.model = this.model;
            settingView.settingObject = setting;
            this.$el.append(settingView.render().$el);
        }, this);
        return this;
    }
});
