(function($) {
        
$(document).ready(function() {
        
    var template1 = {
        "fathers|5-10":[
            {
                "id|+1":0,
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

    var template2 = {
        "entry":{
            "id|8-8":"@LETTER_UPPER@NUMBER@LETTER_LOWER",
            "created_date":"@DATE_YYYY/@DATE_MM/@DATE_DD",
            "created_time":"@TIME_HH:@TIME_MM:@TIME_SS",
            "title|2-4":"@LOREM ",
            "description":"@LOREM_IPSUM"
        }
    };
    
    $('#template textarea').val(formatJSON(template1));
    $('#result textarea').val(''); // reset
    
    $('#button-template1').click(function() {
        $('#template textarea').val(formatJSON(template1));
        $('#button-generate').click();
    });
    
    $('#button-template2').click(function() {
        $('#template textarea').val(formatJSON(template2));
        $('#button-generate').click();
    });
    
    $('#button-generate').click(function() {
        try {
            var json = jQuery.parseJSON($('#template textarea').val());
            $.mockJSON(/mockme\.json/, json);
            //alert(formatJSON(template));
            //$('#template textarea').val(formatJSON(template));
        
            $.getJSON('mockme.json', function(json) {
                $('#result textarea').val(formatJSON(json));
            });
        } catch(e) {
            alert('Invalid JSON');
        }
    }).click();
    
    $.each($.mockJSON.data, function(keyword) {
        $('#keywords ul').append('<li><code>@' + keyword + '</code></li>');
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


