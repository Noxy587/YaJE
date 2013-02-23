/**
 * Created with JetBrains WebStorm.
 * User: roblane09
 * Date: 2/20/13
 * Time: 9:15 PM
 * To change this template use File | Settings | File Templates.
 */
var Toolset = Backbone.Collection.extend({
    model: Tool,
    findToolWithElement: function(element) {
        var queryClass = $(element).clone().removeClass('toolIcon')[0].className;
        return this.where({'className': queryClass});
    }
});
