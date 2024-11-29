/*------------------------------------------------------------------------------
    파일명 : 초기화

    분류순서
    @Variables  : 전역변수
    @Init       : 초기실행
------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------
    @Variables
------------------------------------------------------------------------------*/
/* container inner height */
function resizeContInrH() {
    $('#container .upr + .inr').each(function() {
        var contH = $(this).parent().height(),
            uprH = $(this).prev('.upr').outerHeight(),
            $btn = $(this).children('[class^=btn_]'),
            btnH = $btn.outerHeight();
        if ($btn.length == 0) var h = contH - uprH;
        else var h = contH - uprH - btnH;
        $(this).outerHeight(h);
    });
}

function dim_open() {
    $(".dim").show();
    $("html, body").css({
        "overflow": "hidden",
        "height": "100%"
    });
}

function dim_close() {
    $(".dim").hide();
    $("html, body").css({
        "overflow": "auto",
        "height": "auto",
        "overflow-x": "hidden"
    });
}

// 배너 정지버튼
function bnr_stop(bnr, btn) {
    if (btn.text() === '정지') {
        bnr.slick('slickPause');
        btn.text('시작');
        btn.addClass('start');
        btn.removeClass('stop');
    } else {
        bnr.slick('slickPlay');
        btn.text('정지');
        btn.addClass('stop');
        btn.removeClass('start');
    };
};

//Layer Content
function layerContShow(thisClass) {
    $('.' + thisClass).show();
}

function layerContHide(thisClass) {
    $('.' + thisClass).hide();
}

/*tab menu*/
function contTabChange(t) {
    var $tab = t.parents('.tab-menu'),
        $mTab = $tab.find('#mobile-tab-on'),
        menuName = t.find('span').text();

    var $cont = $tab.siblings('.tab-cont'),
        id = t.data('id');
    if (id != '') {
        $cont.find('.tab-cont-box').removeClass('on');
        $('#' + id).addClass('on');
    }
}

/*search*/
function schClose() {
    $(".search_wrap").removeClass("on");
    $(".m_type .header_inner, .search_wrap, .m_gnb_open").css("z-index", "3");
    dim_close();
}

/*zoom*/
var timer = null,
    scrollTop = 0,
    seemSize = 1,
    zoomSize = 1,
    browser = {
        a: navigator.userAgent.toLowerCase()
    };
browser = {
    ie: (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (browser.a.indexOf("msie") != -1),
    opera: !!window.opera,
    safari: browser.a.indexOf('safari') != -1,
    safari3: browser.a.indexOf('applewebkit/5') != -1,
    mac: browser.a.indexOf('mac') != -1,
    chrome: browser.a.indexOf('chrome') != -1,
    firefox: browser.a.indexOf('firefox') != -1
}

function zooms() {
    // console.log(browser);
    document.body.style.webkitTransform = 'scale(' + seemSize + ')';
    document.body.style.webkitTransformOrigin = '50% 0 0'; //after zoom posiiton
    document.body.style.MozTransform = 'scale(' + seemSize + ')';
    document.body.style.MozTransformOrigin = '50% 0 0';
    document.body.style.OTransform = 'scale(' + seemSize + ')';
    document.body.style.OTransformOrigin = '50% 0 0';
    document.body.style.msTransform = 'scale(' + seemSize + ')';
    document.body.style.msTransformOrigin = '50% 0 0';
    document.body.style.transform = 'scale(' + seemSize + ')';
    document.body.style.transformOrigin = '50% 0 0';
    if (browser.ie) {
        $('#header').css({
            'transform': 'scale(' + seemSize + ')',
            'transform-origin': '50% 0 0'
        });
    }
}

/* 파일첨부 */
function fileAttach(obj) {
    var $this = $(obj).closest('.file');
    $this.find('[type=file]').trigger('click');
    $this.find('[type=file]').not('.is-evented').on('change', function() {
        var value = $(this).val();
        $this.find('[type=text]').val(value);
    }).addClass('is-evented');
}

function fileAttachAdd(obj, str) {
    var $group = $(obj).closest('.form-controls.type-file'),
        idx = $group.find('.file').length,
        id = str + idx,
        html = '' +
        '<div class="row">' +
        '	<span class="file">' +
        '		<input type="text" id="sFileName' + idx + '" class="input demo1" title="첨부된 파일명" />' +
        '		<label for="' + id + '" class="btn demo2 btn_file" role="button">' +
        '			<span><input type="file" name="' + id + '" id="' + id + '" value="찾아보기" tabindex="-1" aria-hidden="true" onchange="fileAttachSrc(this, event)" />첨부</span>' +
        '		</label>' +
        '		<button type="button" class="btn demo2 type-add" onclick="fileAttachAdd(this, \'sFilesAdd2\')"><span>추가</span></button>' +
        '		<button type="button" class="btn demo2 type-remove" onclick="fileAttachRemove(this)"><span>삭제</span></button>' +
        '	</span>' +
        '</div>';

    $group.append(html);
}

function fileAttachRemove(obj) {
    var $row = $(obj).closest('.row');
    if ($row.siblings().length) {
        $(obj).closest('.row').remove();
    }
}

function fileAttachSrc(obj, e) {
    var $eleFormText = $(obj).closest('.file').find('input[type=text]');
    if ($eleFormText) {
        var fileValue = $(obj).val().split("\\");
        var fileName = fileValue[fileValue.length - 1];
        $eleFormText.val(fileName);
    }
}

function fileAttachPreview(id, e) {
    var sel_files = [];
    var $eleFormImg = $('#' + id);
    if ($eleFormImg.length) {
        //이미지 사진보기
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);

        filesArr.forEach(function(f) {
            if (!f.type.match("image.*")) {
                alert('확장자는 이미지 확장자만 가능합니다.');
                return;
            }
            sel_files.push(f);

            var reader = new FileReader();
            reader.onload = function(e) {
                var eleImg = '<img src="' + e.target.result + '" alt="첨부된파일">';
                $eleFormImg.html(eleImg);
            }
            reader.readAsDataURL(f);
        })
    }
}

/* Accordion */
$(document).ready(function() {
    /*
        focus event
        focus : 상효작용이 가능한 콘텐트 요소만 포커스 이벤트 발생 가능
        (input, a, button)
        focusin : 포커스가 들어갔을 떄
        fousout : 포커스가 떠났을 때
    */
    var $tab = $("#tab");
    var $btns = $tab.find("h4 a");
    var $boxs = $tab.find("ul");

    $btns.on("click  focusin", function(e) {
        e.preventDefault();
        var isOn = $(this).hasClass("on");

        if (isOn) return;
        activation(this);
    });

    function activation(self) {
        var target = $(self).attr("href");

        $btns.removeClass("on");
        $(self).addClass("on");

        $boxs.hide();
        $(target).show();
    }
});

/* tab메뉴 - 웹접근성 준수 */
$(document).ready(function() {
    var ui = {
        init: function() {
            if ($('.acco').length) {
                this.acco.init();
            } // acco
        },

        /* Accordion */
        acco: {
            speed: 200,
            init: function() {
                var self = this;
                self.update();
                self.event();
            },
            update: function() {
                $('.acco').each(function() {
                    if ($(this).data('sync') == undefined) {
                        $(this).data({
                            'sync': true
                        })
                    }
                    if ($(this).data('toggle') == undefined) {
                        $(this).data({
                            'toggle': true
                        })
                    }
                });
            },
            event: function() {
                var self = this;
                $document.off('click.accoEvent').on('click.accoEvent', '.acco-toggle', function(e) {
                    var id = $(this).data('id');
                    var isToggle = $(this).hasClass('is-active') && $(this).closest('.acco').data('toggle');
                    isToggle ? self.close(id) : self.open(id);
                });
            },
            reset: function(id, active, callback) {
                var $acco = $('#' + id);
                var $accoItem = $acco.find('>.acco-item');
                var $accoBtn = $acco.find('>.acco-item>.acco-title>.acco-toggle');
                var $accoCont = $acco.find('>.acco-item>.acco-cont');
                if (active == 'visible') {
                    $accoItem.addClass('is-active');
                    $accoBtn.addClass('is-active').attr({
                        'aria-expanded': 'true'
                    });
                    $accoCont.addClass('is-active').attr({
                        'aria-hidden': 'false'
                    }).removeAttr('style');
                }
                if (active == 'hidden') {
                    $accoItem.removeClass('is-active');
                    $accoBtn.removeClass('is-active').attr({
                        'aria-expanded': 'false'
                    });
                    $accoCont.removeClass('is-active').attr({
                        'aria-hidden': 'true'
                    }).removeAttr('style');
                }
                if (callback) {
                    typeof(callback) == 'function' ? callback(): callback;
                }
            },
            visible: function(id, callback) { //페이지로드시 노출
                var $accoBtn = $('[aria-controls=' + id + ']');
                var $accoCont = $('#' + id);
                var $accoItem = $accoCont.closest('.acco-item');
                var $accoWrap = $accoCont.closest('.acco');
                var $accoItemSiblings = $accoItem.siblings('.is-active');
                $accoItem.addClass('is-active');
                $accoBtn.addClass('is-active').attr({
                    'aria-expanded': 'true'
                });
                $accoCont.addClass('is-active').attr({
                    'aria-hidden': 'false'
                });
                if (callback) {
                    typeof(callback) == 'function' ? callback(): callback;
                }
                // Syncroize
                if ($accoWrap.data('sync') && $accoItemSiblings.length) {
                    $accoItemSiblings.removeClass('is-active');
                    $accoItemSiblings.find('.acco-title>.acco-toggle').removeClass('is-active').attr({
                        'aria-expanded': 'false'
                    });
                    $accoItemSiblings.find('.acco-cont').removeClass('is-active').attr({
                        'aria-hidden': 'true'
                    });
                }
            },
            open: function(id, callback) {
                var self = this;
                var $accoBtn = $('[aria-controls=' + id + ']');
                var $accoCont = $('#' + id);
                var $accoItem = $accoCont.closest('.acco-item');
                var $accoWrap = $accoCont.closest('.acco');
                var $accoItemSiblings = $accoItem.siblings('.is-active');
                if (!$accoBtn.is(':disabled')) {
                    $accoBtn.addClass('is-active').attr({
                        'aria-expanded': 'true'
                    });
                    $accoItem.addClass('is-active').attr({
                        'aria-hidden': 'false'
                    });
                    $accoCont.stop().slideDown(self.speed, function() {
                        $(this).addClass('is-active');
                        if (callback) {
                            typeof(callback) == 'function' ? callback(): callback;
                        }
                    });
                }
                // Syncroize
                if ($accoWrap.data('sync') && $accoItemSiblings.length) {
                    var closeID = $accoItemSiblings.find('>.acco-cont').attr('id');
                    self.close(closeID);
                }
            },
            close: function(id, callback) {
                console.log(id);
                var self = this;
                var $accoBtn = $('[aria-controls=' + id + ']');
                var $accoCont = $('#' + id);
                var $accoItem = $accoCont.closest('.acco-item');
                $accoBtn.attr({
                    'aria-expanded': 'false'
                }).removeClass('is-active');
                $accoItem.removeClass('is-active');
                $accoCont.stop().slideUp(self.speed, function() {
                    $(this).removeClass('is-active');
                    if (callback) {
                        typeof(callback) == 'function' ? callback(): callback;
                    }
                });
            },
        },
    }
});

/* Dropdown */
$(function() {
    $('#drop-menu > ul > li').click(function() {
        $(this).toggleClass('show_dep')
            .children('ul').slideToggle(300);
    });
});

/*gnb 오픈*/
$(function() {
    /* reset */
    $('a[href=""]').click(function(e) {
        e.preventDefault();
    });

    /* resize */
    var gnbDep2MaxH = 0;
    $(window).resize(function() {
        resizeContInrH();
        schClose();

        if ($(window).width() >= 1232) {
            $(".m_gnb_close").click();
            $(".gnb_wrap").attr("style", "");
            $("#header").addClass("p_type").removeClass("m_type");
            $(".gnb_wrap > .gnb_depth1 > li").removeClass("on")

            /*gnb bg height*/
            $('.fulldown .depth2Full').each(function() {
                var $this = $(this),
                    h = $this.outerHeight();
                if (gnbDep2MaxH < h) gnbDep2MaxH = h;
            });
            $('.fulldown .gnb_bg, .depth2Full').outerHeight(gnbDep2MaxH);
        } else if ($(window).width() <= 1231) {
            $("#header").addClass("m_type").removeClass("p_type");
            $(".fulldown .depth2Full").attr("style", "");
            $("html, body").css({
                "overflow": "hidden auto",
                "height": "auto"
            });
        }

        $('#mobile-tab-on').removeClass('act')
            .next('ul').removeAttr('style')
            .children('li').removeAttr('style');
        $(".tab-menu ul li").click(function() {
            var $tab = $(this).parents('.tab-menu'),
                $mTab = $tab.find('#mobile-tab-on');
            contTabChange($(this));
        });

    });
    $(window).trigger('resize');

    $(document).on("mouseenter focusin", ".p_type.fulldown > .gnb_wrap > .gnb_depth1 > li", function() {
        $("#header").addClass("gnb_on");
        $(this).addClass("on").siblings("li").removeClass("on");
        $(".fulldown .gnb_depth2").clearQueue().slideDown();
        $(".fulldown .gnb_wrap > .gnb_bg").clearQueue().slideDown();
    });
    $(document).on("mouseleave", ".p_type.fulldown > .gnb_wrap > .gnb_depth1", function() {
        $("#header").removeClass("gnb_on");
        $(this).find("li").removeClass("on");
        $(".fulldown .gnb_depth2").clearQueue().hide();
        $(".fulldown .gnb_wrap > .gnb_bg").clearQueue().hide();
    });
    $(document).focusin(function(e) {
        // gnb 포커스
        var el01 = $(".p_type.fulldown > .gnb_wrap > .gnb_depth1");
        if (el01.parents("#gnb").has(e.target).length === 0) {
            $("#header").removeClass("gnb_on");
            $(".p_type > .gnb_wrap > .gnb_depth1 > li").removeClass("on");
            $(".p_type").find(".gnb_depth2").clearQueue().hide();
            $(".gnb_wrap > .gnb_bg").clearQueue().hide();
        }
    });

});

$(function() {
    /*gnb 오픈*/
    $(".dropdown .gnb_wrap > .gnb_depth1 > li > a").on("mouseenter focusin", function() {
        $(this).parent("li").addClass("on").find(".gnb_depth2").clearQueue().slideDown().parent("li").siblings("li").removeClass("on").find(".gnb_depth2").clearQueue().hide();
    });
    $(".dropdown .gnb_wrap > .gnb_depth1").on("mouseleave", function() {
        // $(".gnb_depth1 > li").removeClass("on").find(".gnb_depth2").clearQueue().hide();
        /* m gnb 오류 수정 (2020-08-28) */
        $(".dropdown .gnb_wrap > .gnb_depth1 > li").removeClass("on").find(".gnb_depth2").clearQueue().hide();
    });
    $(document).focusin(function(e) {
        // gnb 포커스
        var el01 = $(".dropdown .gnb_wrap > .gnb_depth1");
        if (el01.parents("#gnb").has(e.target).length === 0) {
            el01.find("li").removeClass("on").find(".gnb_depth2").hide();
        }
        // 전체메뉴 포커스
        var el02 = $(".all_menu_wrap");
        if ($("#wrap").hasClass("all_menu")) {
            if (el02.parents("#header").has(e.target).length === 0) {
                $(".all_menu_btn a").focus();
            }
        }
    });

    /*gnb 2뎁스 높이*/
    $(".gnb_wrap > .gnb_depth1 > li > a").on("mouseenter focusin", function() {
        var depth2_li = $(this).parent().find(".gnb_depth2_bg > ul > li");
        var li_h1 = [];
        var li_h2 = [];
        for (var i = 0; i < depth2_li.length; i++) {
            if (i <= 4) {
                li_h1.push(depth2_li.eq(i).height());
            } else {
                li_h2.push(depth2_li.eq(i).height());
            }
        };
        for (var j = 0; j < li_h1.length; j++) {
            depth2_li.eq(j).height(Math.max.apply(null, li_h1));
        };
        for (var k = 0; k < li_h2.length; k++) {
            depth2_li.eq(k + 5).height(Math.max.apply(null, li_h2));
        };
    });

    /* modal */
    $('#header .btnOpen').click(function() {
        $('#modal').show().children('#left-drawer').animate({
            left: 0
        }, 300);
    });
    $('#modal .btn_dim, #modal .btn_close').click(function() {
        if ($('#left-drawer').is(':visible')) $('#left-drawer').animate({
            left: '-100%'
        }, 300);
        $('#modal').fadeOut(300);
    });
    $('#modal .btn_dim, #modal .close_dim').click(function() {
        if ($('#left-drawer').is(':visible')) $('#left-drawer').animate({
            left: '-100%'
        }, 300);
        $('#modal').fadeOut(300);
    });

    /* faq */
    $(".hide_cont").hide();
    $(".faq-list .subject").click(function() {
        $(this).next().slideToggle(200);
        $(".faq-list .subject").not(this).next().slideUp(200);
        return false;
    });
    $(".faq-list .subject").eq(0).trigger("click");


    $(function() {
        $(".tab-area .category ul li").click(function() {
            $(".tab-area .category ul li").removeClass('on');
            $(".tab-area .contBox").removeClass('on');
            $(this).addClass('on');
            $("#" + $(this).data('id')).addClass('on');
        });
    });

    // a:after
    $(function() {
        $(".faq-list .subject").click(function() {
            $(".faq-list .subject").removeClass('on');
            $(".faq-list .subject a").removeClass('on');
            $(this).addClass('on');
            $("#" + $(this).data('id')).addClass('on');
        });
        $(".faq-list .subject a").eq().trigger("click");
    });
});
