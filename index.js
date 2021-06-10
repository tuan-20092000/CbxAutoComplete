// biến thể hiện có đang show các option hay không (true là có, false là không)
var show = false;

// các biến con trỏ
var img = $("#img");
var input = $("#input");
var divInput = $("#divInput");
var options =  $("div.option");
var select = -1;

// gán giá trị ban đầu cho getValue() và getText() của $('input');
$.fn.getText = function(){
    return "";
}
$.fn.getValue = function(){
    return undefined;
}

$(document).ready(function(){
    //lắng nghe sự kiện khi người dùng ấn vào icon show
    img.click(function(){
        clickImg();
    })

    // lắng nghe sự kiện khi người dùng ấn vào các div option
    options.each(function(){
        $(this).click(function(){
            input.val($(this)[0].outerText);
            $("div.selected").removeClass('selected');
            $(this).addClass("selected");
            defaultImg();
            setTextAndValue();
            $(".border-red").removeClass("border-red");
            divInput.removeAttr('title');
        })
    })
    
    // kiểm tra giá trị input trùng với option nào ko khi blur input
    input.blur(function(){
        var isValid = 0;
        let value = input.val().toLowerCase();
        options.each(function(){
            if(value == $(this)[0].outerText.toLowerCase()){
                isValid = 1;
            }
        })
        if(isValid == 0){
            divInput.addClass('border-red');
            divInput.attr('title', 'Dữ liệu không tồn tại trong hệ thống.')
        }else{
            divInput.removeClass('border-red');
            divInput.removeAttr('title');
        }
    })

    // ẩn border red khi focus vào input nếu có
    input.focus(function(){
        $(".border-red").removeClass("border-red");
    });

    // ẩn option khi ấn enter mà đã có option được chọn
    input.on('keyup', function(e){
        if (e.key == 'Enter' || e.keyCode == 13) {
            if($(".selected").length > 0){
                input.val($(".selected")[0].innerText);
                defaultImg();
            }
        }
        
        // nhấn mũi tên xuống
        else if(e.keyCode == 40){
            e.preventDefault();
            select = returnIndexSelected();
            let countShow = $(".show").length;
            if(select < countShow - 1){
                select++;
                $(".selected").removeClass("selected");
                $('.show').eq(select).addClass('selected');
            }else{
                select = 0;
                $(".selected").removeClass("selected");
                $('.show').eq(select).addClass('selected');
            }
        }

        // nhấn mũi lên
        else if(e.keyCode == 38){
            e.preventDefault();
            select = returnIndexSelected();
            if(select > 0){
                select--;
                $(".selected").removeClass("selected");
                $('.show').eq(select).addClass('selected');
            }else{
                select = $(".show").length-1;
                $(".selected").removeClass("selected");
                $('.show').eq(select).addClass('selected');
            }
        }

        else{
            let value = input.val().toLowerCase();
            check();
            setTextAndValue();
            options.each(function(){
                let text = $(this)[0].innerText.toLowerCase();
                if(value != "" && text.includes(value)){
                    $(this).removeClass("hide");
                    $(this).addClass("show");
                }else{
                    $(this).removeClass("show");
                    $(this).addClass("hide");
                }
            })
        }
    });

    $(document).click(function (e)
    {
        var container = $(".wrap");
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            check();
            hideAll();
            defaultImg();
        }
    });

})


// hàm trả về vị trí mà div đang được select, nếu ko có trả về -1
function returnIndexSelected(){
    let optionNow = $(".show");
    for(let i=0; i<optionNow.length; i++){
        if(optionNow.eq(i).hasClass("selected"))
            return i;
    }
    return -1;
}

// hàm làm cho icon trở về mặc định
function defaultImg(){
    img.removeClass('transform');
    show = false;
    hideAll();
}


// hàm kiểm tra xem option trùng với text ở input hay không, trùng thì hightlight
function check(){
    options.each(function(){
        if(input.val().toLowerCase() == $(this)[0].outerText.toLowerCase()){
            $(this).addClass("selected");
            divInput.removeClass('border-red');
            divInput.removeAttr('title');
            input.val($(this)[0].outerText);
        }else{
            $(this).removeClass("selected");
        }
    });
}

// hàm show/hide các option khi ấn vào icon show
function clickImg(){
    img.toggleClass("transform");
    show = !show;
    if(show){
        showAll();
        input.focus();
    }else{
        hideAll();
    }
    
}

// hàm show tất cả các option
function hideAll(){
    select = -1;
    $(".select").removeClass("select");
    options.each(function(){
        $(this).removeClass("show");
        $(this).addClass("hide");
    })
}

// hàm ẩn tất cả các option
function showAll(){
    options.each(function(){
        $(this).removeClass("hide");
        $(this).addClass("show");
    })
}

// hàm set getValue và getText cho $('input')
function setTextAndValue(){
    $.fn.getText = function(){
        return input.val();
    }

    $.fn.getValue = function(){
        return $(".selected").attr('value');
    }
}