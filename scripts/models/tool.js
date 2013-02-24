/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/18/13
 * Time: 7:15 PM
 * To change this template use File | Settings | File Templates.
 */
Tool = Backbone.Model.extend({
    settingsFields: function() {
        fields = [];
        if (this.get('className')) {
            var toolType = this.get('className');
            if (toolType == "pencilTool") {
                fields.push({title: "Size", field: "size", type: "number", value: this.get("size")});
                fields.push({title: "Color", field: "color", type: "color", value: this.get("color")});
            }
        }
        return fields;
    },
    defaultSettings: function() {
        var type = this.get('className');
        var defSettings = {};
        if (type == 'pencilTool') {
            if (this.get("size") == undefined) {
                defSettings['size'] = 3;
            }
            if (this.get("color") == undefined) {
                defSettings['color'] = "#000000";
            }
        }
        this.set(defSettings);
    },
    buildContext: function(context) {
        var type = this.get('className');
        if (type == 'pencilTool') {
            context.strokeStyle=this.get('color');
            context.lineWidth=this.get('size');
        }
        return context;
    }
});