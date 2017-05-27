$(document).ready(function() {
    /*
    $("section").mCustomScrollbar({
    	axis:"y",
    	theme:"rounded-dots"
    });*/
    var inputHandler = (function() {
        var dataFields = [
            { name: "fullname", placeholder: "Full Name", type: "text", value: "" },
            { name: "dob", placeholder: "Date of Birth", type: "date", value: "" },
            { name: "about", placeholder: "About myself in around 50 words", type: "textarea", value: "" },
            { name: "country", placeholder: "I'm from", type: "text", value: "" },
            { name: "gender", placeholder: "I'm a", type: "radio", value: "" },
            { name: "theme", placeholder: "Please select your theme:", type: "radio", value: "" },
            { name: "coverpic", placeholder: "Cover Picture", type: "file", value: "" },
            { name: "profilepic", placeholder: "Profile Picture", type: "file", value: "" }
        ];
        var index = 1;

        function next() {
            dataFields[index].value = $(".inputElement").val();

            if (index < dataFields.length - 1)
                index++;
            return { index: index, data: dataFields[index], len :dataFields.length};
        };

        function prev() {
            dataFields[index].value = $(".inputElement").val();

            if (index >= 1)
                index--;
            return { index: index, data: dataFields[index],len :dataFields.length };
        };
        return {
            moveForward: function() {
                render(next());
            },
            moveBackward: function() {
                render(prev());
            }
        };
    })();
    inputHandler.moveBackward();
    $("#next").click(inputHandler.moveForward);
    $("#prev").click(inputHandler.moveBackward);

    function render(inputData) {
    	var total = $(".sliderParent").innerWidth();
    	var len = total*((inputData.index+1)/inputData.len);
    	console.log(inputData.index+","+inputData.len)
    	$(".sliderChild").css({"width":len+"px"});
        console.log(inputData.index);
        console.log(inputData.data);
        var datePickerSet = false;
        switch (inputData.data.type) {
            case "text":
                var htmlStr = '<div class="input_section"><input class="inputElement" type="text" name="' + inputData.data.name + '" id="' + inputData.data.name;
                htmlStr += '" value = "' + inputData.data.value + '"><label for="' + inputData.data.name + '" class="form-label">' + inputData.data.placeholder + '</label></div>';
                $(".input_wrapper").html(htmlStr);
                break;
            case "date":
                var htmlStr = '<div class="input_section"><input class="inputElement" name="' + inputData.data.name + '" id="' + inputData.data.name;
                htmlStr += '" value = "' + inputData.data.value + '"><label for="' + inputData.data.name + '" class="form-label">' + inputData.data.placeholder + '</label></div>';
                $(".input_wrapper").html(htmlStr);

                datePickerSet = true;
                $('.input_section').DatePicker({
                    flat: true,
                    date: '2008-07-31',
                    current: '2008-07-31',
                    calendars: 1,
                    starts: 1,
                    format: 'm/d/Y',
                    onChange: function(formated, dates) {
                        $('.input_section input').val(formated);
                        $("label").addClass("minified");
                        $(".datepicker").slideUp("slow");
                    }
                });
                $(".datepicker").hide();
                break;
            case "radio":
                var htmlStr = '';
                if (inputData.data.name == "gender") {
                    htmlStr = "<div class='input_section'><input class = 'inputElement' type='radio' id='male' name='gender'/><label for='male'><span></span>Male</label></div>";
                    htmlStr += "<div class='input_section'><input class = 'inputElement' type='radio' id='female' name='gender'/><label for='female'><span></span>Female</label></div>";
                    htmlStr += "<div class='input_section'><input class = 'inputElement' type='radio' id='other' name='gender'/><label for='other'><span></span>Other</label></div>";
                } else {
                    htmlStr = "<div class='input_section'><input class = 'inputElement' type='radio' id='theme1' name='theme'/><label for='theme1'><span></span>Theme 1</label></div>";
                    htmlStr += "<div class='input_section'><input class = 'inputElement' type='radio' id='theme2' name='theme'/><label for='theme2'><span></span>Theme 2</label></div>";
                }
                $(".input_wrapper").html(htmlStr);
                break;
            case "textarea":
                var htmlStr = '<div class="input_section"><textarea class="inputElement" name="' + inputData.data.name + '" id="' + inputData.data.name + '">'+inputData.data.value+'</textarea>';
                htmlStr += '<label for="' + inputData.data.name + '" class="form-label">' + inputData.data.placeholder + '</label></div>';
                $(".input_wrapper").html(htmlStr);
                break;
            case "file":
            	var htmlStr = '<div class="input_section">Drag and Drop your File here:</div>';
            	if(inputData.index == inputData.len-1)
            		htmlStr+="<button> SignUp!</button>";
                $(".input_wrapper").html(htmlStr);
                break;
            default:
                $(".input_wrapper").html("<h1> Not this time!");
        }
        if (inputData.data.value != '')
                    $("label").addClass("minified");

        if (datePickerSet) {
            $(".inputElement").focus(function(event) {
                $(".datepicker").slideDown("slow");
                $("label").addClass("minified");

            });
            $(".inputElement").blur(function(event) {
                var id = event.currentTarget.id;
                //$(".datepicker").slideUp("slow");
                if ($("#" + id).val() == '')
                    $("label").removeClass("minified");
            });
        } else {
            $(".inputElement").focus(function(event) {
                var id = event.currentTarget.id;
                $("label").addClass("minified");
            });
            $(".inputElement").blur(function(event) {
                var id = event.currentTarget.id;
                if ($("#" + id).val() == '')
                    $("label").removeClass("minified");
            });
        }
    }


});
