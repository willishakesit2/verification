class Layout {
    constructor(){
        this.lastScrollTop = 0;
        this.scrollPosIn = 50
        this.increAmount = 1.000000
        this.timeOut;
    }
    getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const inputDate = new Date(`${year}-${month}-${day}`);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = inputDate.toLocaleDateString('ko-KR', options);
        $('.header-date').text(`${formattedDate}`)
    }
    loadOwlCar(){
        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            dots: false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:4
                }
            }
        })
    }
    sideBannerStick(_this){
        var windowHeight = $(window).height();
        var elementHeight = $('.side-banner').height();
        var scrollPos = $(window).scrollTop();
        var newPosition = (windowHeight - elementHeight) / 2 + scrollPos;
        $('.side-banner').css({
            'position': 'absolute',
            'top': newPosition + 'px'
        });
    }
    toggleEmoji(_this){
        $('.emoticon-box').hide()
        $(_this).siblings('emoji-picker').toggle()
    }
    toggleEmoji2(_this){
        $('.emoticon-box').hide()
        $(_this).find('emoji-picker').toggle()
    }
    toggleStickers(){
        $('emoji-picker').hide()
        $('.emoticon-box').toggle()
    }
    changeProfileEmoji(event){
        $('.change-profile .profile-wrapper').html(`<h1>${event.detail.emoji.unicode}</h1>`)
    }
    changeSticker(_this){
        let stickerSrc = $(_this).attr('src')
        $('.change-profile .profile-wrapper').html(`<img src="${stickerSrc}" alt="">`)
    }
    insertEmoji(event){
        var currentCursorPosition = $('#myTextArea')[0].selectionStart;
        var textToInsert = `${event.detail.emoji.unicode}`;

        var currentValue = $('#myTextArea').val();
        var newValue = currentValue.substring(0, currentCursorPosition) + textToInsert + currentValue.substring(currentCursorPosition);

        $('#myTextArea').val(newValue);
    }
    scrollFunction(_this){
        100 < $(_this).scrollTop() ? $(".scroll-top").fadeIn() : $(".scroll-top").fadeOut();
        if(window.innerWidth > 1000){
            10 < $(_this).scrollTop() ? $('.navbar-custom').addClass('active-bg') : $('.navbar-custom').removeClass('active-bg');
        }
    }
    toTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        return (
            $("html, body").animate(
                {
                    scrollTop: 0,
                },
                600
            ),
            !1
        );
    }
}

$(document).ready(function(){
    let layout = new Layout()
    layout.getTodayDate()
    layout.loadOwlCar()
    $(window).click(function(e){
        $('emoji-picker').hide()
        $('#mobile-menu').removeClass('active')
    })
    $('#toggleAllMenu').click(function(){
        $('.all-menu').slideToggle()
    })
    $(window).scroll(function(event){
        layout.sideBannerStick(this)
    });
    document.addEventListener(
        "click",
        function(event) {
            var target = event.target;
            var replyForm;
            if (target.matches("[data-toggle='reply-form']")) {
                replyForm = document.getElementById(target.getAttribute("data-target"));
                replyForm.classList.toggle("d-none");
            }
        },
        false
    );
    $('.emoji i').click(function(e){
        e.stopPropagation()
        layout.toggleEmoji(this)
    })
    $('.comment-form emoji-picker').on('emoji-click', function(event) {
        layout.insertEmoji(event)
    });
    $('.btn.emoji').click(function(e){
        e.stopPropagation()
        layout.toggleEmoji2(this)
    })
    $('.change-profile .btn:nth-child(1)').click(function(){
        layout.toggleStickers()
    })
    $('.change-profile emoji-picker').on('emoji-click', function(event) {
        layout.changeProfileEmoji(event)
    });
    $('.emoticon-box img').click(function(){
        layout.changeSticker(this)
    })
    $(window).scroll(function () {
        layout.scrollFunction(this)
    }),
    $(".scroll-top").on("click", function () {
        layout.toTop()
    })
    $('.mobile-menu-toggle').click(function(e){
        e.stopPropagation()
        $('#mobile-menu').toggleClass('active')
    })
    $('#mobile-menu').click(function(e){
        e.stopPropagation()
    })
    CKEDITOR.replace('editor1', {
        height: 300,
        toolbar: 'Basic'
    });
})
