/*------------------------------------------------------------------------------
    파일명 : 가이드 문서 스크립트

    분류순서
    @Variables  : 전역변수
    @Init       : 초기실행
------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------
    @Variables
------------------------------------------------------------------------------*/
// /* 종류 */
// var name1 = null
// _;
//
// var ui = {
//     /*------------------------------------------------------------------------------
//         @Init
//     ------------------------------------------------------------------------------*/
//     /* 초기실행 */
//     init: function(){},
//
//     /* 재실행 */
//     update function(){},
//
//     /*------------------------------------------------------------------------------
//         @분류
//     ------------------------------------------------------------------------------*/
//     /* 이름 */
//     object: {},
// }
// $(function(){
//     ui.init();
//     ui.update();
// });

$(function(){
    $('.content-nav > ul > li > a').each(function(){
        if($(this).siblings('ul').length>0){
            $(this).css('cursor', 'default');
        }else{
            if($('#content > article > h3:nth-of-type('+($(this).parent().index()+1)+') ~ .content-body').first().offset()){
                $(this).click(function(e){
                    e.preventDefault();

                    $('html, body').animate({'scrollTop':($('#content > article > h3:nth-of-type('+($(this).parent().index()+1)+') ~ .content-body').first().offset().top-200)}, 300);
                });
            }
        }
    });
    $('.content-nav > ul > li > ul > li > a').each(function(){
        if($('#content > article > h3:nth-of-type('+($(this).parent().parents('li').index()+1)+') ~ .content-body').first().find('section:nth-of-type('+($(this).parent().index()+1)+')').offset()){
            $(this).click(function(e){
                e.preventDefault();

                $('html, body').animate({'scrollTop':($('#content > article > h3:nth-of-type('+($(this).parent().parents('li').index()+1)+') ~ .content-body').first().find('section:nth-of-type('+($(this).parent().index()+1)+')').offset().top-80)}, 300);
            });
        }
    });

    $('#fs').keyup(function(){
        $('.fontset p').css('font-size', $(this).val()+'px');
    });
});

/* 소스 미리보기 */
$(function() {
    $(document).on("click", ".g-example-header .g-example-btn", function() {
        $(this).parents(".g-example-header").siblings(".g-example-footer").toggleClass("is-active");
    });

    $(document).ready(function() {

        $('.g-example-nav a').click(function() {
            var tab_id = $(this).attr('data-tab');

            $('.g-example-nav a').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#" + tab_id).addClass('current');
        });

    });
});
/* 소스 미리보기 */
