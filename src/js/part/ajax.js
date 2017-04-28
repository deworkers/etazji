$(document).ready(function() {
    /*Модальные окна*/
    var overlay = $('#overlay'); 
    var open_modal = $('.open_modal'); 
    var close = $('.modal__close'); 
    var modal = $('.modal'); 

    //ajax фотогаллерея
    $('.ajax_modal').click(function(event) { 
        modal.fadeOut(200);
        overlay.fadeIn(400);
        $('#ajax-photo').fadeIn(400);
        $('html, body').addClass('j-noScroll');
        event.preventDefault();
        var getKv = $(this).parents('.catalog-one').data("id");
        $.ajax({
            type: 'POST',
            url: '/ajax/ajax-photo.php',
            data: {'kv': getKv}, // передача ID квартиры
            success: function(data) {
                $('#ajax-photo .order__inn').html(data);

                $('.catalog-gallery').owlCarousel({
                    loop:false,
                    margin:0,
                    nav:true,
                    items: 1,
                    navText: ['',''],
                    URLhashListener:true
                });

                $('.catalog-gallery-nav').owlCarousel({
                    loop:false,
                    margin:5,
                    nav:true,
                    items: 6,
                    navText: ['','']
                });

                $('.modal__close').on('click', function() {
                    modal.fadeOut(200);
                    overlay.fadeOut(200);
                    $('html, body').removeClass('j-noScroll');
                });

                $('.catalog-gallery').owlCarousel().on('changed.owl.carousel', function(event) {
                    curent = event.item.index;
                    $('.catalog-gallery-nav img').removeClass('active');
                    $('.catalog-gallery-nav img').eq(curent).addClass('active');
                });

                $('.catalog-gallery-nav img').on('click', function() {
                    $('.catalog-gallery-nav img').removeClass('active');
                    $(this).addClass('active');
                });
            }
        });
 
    });


    //сортировка похожих квартир
    $('.other-card-filtr__one').on('click', function(event) {
        if ( !$(this).hasClass('active') ) {
            $('.other-card-filtr__one').removeClass('active');
            $(this).addClass('active');
            var dataFiltr = $(this).data('filtr');
            $.ajax({
                type: 'POST',
                url: '/ajax/ajax-other.php',
                data: {'dataFiltr': dataFiltr}, // передача ID квартиры
                success: function(data) {
                    $('.other-card .catalog-list').html(data);
                    loadComment();
                }
            });
        } else {

        }
        
    });

   //вывод коментария
    var loadComment = function() {
        $('.catalog-one-reviews__bottom').on('mouseenter', function() {    
            if ( !$(this).hasClass('active') ) {
                var getKv = $(this).parents('.catalog-one').data("id");
                thisBlock = $(this);
                thisBlock.addClass('active');
                $.ajax({
                    type: 'POST',
                    url: '/ajax/ajax-comment-one.php',
                    data: {'kv': getKv}, // передача ID квартиры
                    success: function(data) {
                        $(thisBlock).append(data);
                        $(thisBlock).find('.comment-one').fadeIn();
                        $('.comment-one').on('mouseleave', function() {
                            $(this).fadeOut();
                            setTimeout(function() {
                                $('.comment-one').remove();
                            }, 100);
                            $('.catalog-one-reviews__bottom').removeClass('active');
                        });
                    }
                });
            }
        });
    }

   loadComment(); 

});