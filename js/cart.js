// function changeNum(obj){
//     var $num=$(obj).find(".num"),
//         num=parseInt($num.val());
//     $(obj).on("click",".add",function(){
//         num++;
//         getNum();
//     }).on("click",".delete",function(){
//         if(num==0){
//             num==0;
//         }else{
//             num--;
//         }
//         getNum();
//     });
//     function getNum(){
//         $num.val(num);
//     }
//
// }
function bodyMinH(){
    $("body").css({"min-height":$(window).height()});
}
function changeNum(obj){
    $(obj).on("click",".add",function(){
        var $num=$(this).siblings(".num"),
            a=parseInt($num.val());
        a++;
        $num.val(a);
    }).on("click",".reduce",function(){
        var $num=$(this).siblings(".num"),
            a=parseInt($num.val());
        if(a==0){
            a=0;
        }else{
            a--;
        }
        $num.val(a);
    });
}
function priceSum(obj){
    var choice=$(obj).find(".choice"), /*选择框*/
        price=$(obj).find(".price"),   /*价格框*/
        numBox=$(obj).find(".buy_num"),       /*数量框*/
        num=$(obj).find(".num"),       /*数量框*/
        allsum=$("#allsum"), /*总价格框*/
        total=$(obj).find(".total"),   /*单商品小计框*/
        allChoose=$(".all_choose"), /*全选框*/
//            allNull=$(".all_null"),    /*清空框*/
        rowTotal=0,    /*单商品小计*/
        allTotal=0,    /*总价格*/
        rowPrice=0,   /*价格*/
        rowNum=0;    /*数量*/
    /*商品选择事件触发*/
    function choiceEvent(){
        choice.on("click",function(){
            getRowTotal();
            if(choice.is(":checked")){
                $(".js_item").addClass("active");
                $(this).parents(obj).find(".buy_num").on("click keyup",function(){
                    getRowTotal();
                });
            }else{
                numBox.unbind("click keyup");
            }
        });
    }
    choiceEvent();
    /*价格计算*/
    function getRowTotal(){
        allTotal=0;
        for(var i=0;i<choice.length;i++){
            if($(".choice:checked").length>0){
                $(".js_item").addClass("active");
            }else{
                $(".js_item").removeClass("active");
            }
            rowPrice = parseInt($(".choice:checked").eq(i).parents(obj).find(".price").html());
            rowNum = parseInt($(".choice:checked").eq(i).parents(obj).find(".num").val());
            if (isNaN(rowNum)) {
                rowNum = 0;
            }
            if (isNaN(rowPrice)) {
                rowPrice = 0;
            }
            rowTotal = rowNum * rowPrice;
            $(".choice:checked").eq(i).parents(obj).find(".total").html(rowTotal);
            allTotal += rowTotal;
            allsum.html(allTotal);
        }
    }
    /*全选清空事件*/
    function allChooseEvent(){
        /*全选*/
        allChoose.on("click",function(){
            if($(this).is(":checked")){
                choice.prop("checked",true);
                getRowTotal();
//                    allNull.prop("checked",false);
                numBox.on("click keyup",function(){
                    getRowTotal();
                })
            }else{
                choice.prop("checked",false);
                numBox.unbind("click keyup");
                num.val(" ");
                total.html("");
                allsum.html("");
            }
        });
//            /*清空*/
//            allNull.on("click",function(){
//                if($(this).is(":checked")){
//                    choice.prop("checked",false);
//                    $(".all_choose").prop("checked",false);
//                    num.unbind("keyup");
//                    num.val("");
//                    total.html("");
//                    allsum.html("");
//                }
//            });
    }
    allChooseEvent();
}