(function($) {
        
$(document).ready(function() {

    var template = {
        "fathers|5-10":[
            {
                "married|0-1":true,
                "name":"@MALE_FIRST_NAME @LAST_NAME",
                "sons":null,
                'daughters|0-3':[
                    {
                        "age|0-31":0, 
                        "name":"@FEMALE_FIRST_NAME"
                    }
                ]
            }
        ]
    };
    
    $.mockJSON(/mockme\.json/, template);
    $('#template').text(formatJSON(template));


    $.getJSON('mockme.json', function(json) {
        $('#result').text(formatJSON(json));
    });
    
});




function formatJSON(obj, indent) {
    var result = [];
    indent = (indent || '') + '  ';
    var type = $.isArray(obj)
        ? 'array' 
        : (obj === null)
            ? 'null'
            : typeof obj;
            
    switch (type) {
        case 'object':
            result.push('{ ');
            for (var i in obj) {
                result.push('"' + i + '" : ' + formatJSON(obj[i], indent) + ',');
            }
            var last = result.pop();
            result.push(last.substr(0, last.length - 1));
            result.push('}');
            break;
            
        case 'array':
            result.push('[ ');
            for (var i = 0; i < obj.length; i++) {
                result.push(formatJSON(obj[i], indent) + ',');
            }
            var last = result.pop();
            result.push(last.substr(0, last.length - 1));
            result.push(']');
            break;
            
        case 'string':
            result.push('"' + obj + '"');
            break;
            
        default:
            result.push(obj + '');
            break;
    }
    
     return result.join('\n' + indent);
}

})(jQuery);


