/**
 * Created with JetBrains WebStorm.
 * User: Rob Lane
 * Date: 2/18/13
 * Time: 7:16 PM
 * To change this template use File | Settings | File Templates.
 */
Handlebars.registerHelper('toolSettingField', function(setting) {
    var settingField = "<label for='"+setting.field+"'>"+setting.title+"</label>";
    if (setting.type == "select" || setting.type == 'multi-select') {
        settingField += "<select ";
        if (setting.type == 'multi-select') {
            settingField += 'multiple ';
        }
        settingField += "name='"+setting.field+"' id='"+setting.field+"_setting' class='field-setting'>";
        setting.options.forEach(function(option) {
            settingField += "<option name='"+option.field+"' value='"+option.value+"'";
            if (option.value == setting.value) {
                settingField += " selected";
            }
            settingField += ">"+option.display+"</option>";
        }, this);
        settingField += "</select>";
    }
    else if (setting.type == 'color') {
        settingField += '<input class="color" name="'+setting.field+'" id="'+setting.field+'" value="'+setting.value+'" />';
    }
    else {
        settingField += '<input type="'+setting.type+'" name="'+setting.field+'" id="'+setting.field+'_setting" class="field-setting" value="'+setting.value+'"/>'
    }
    return new Handlebars.SafeString(settingField);
});