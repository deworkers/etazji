
$(document).ready(function() {
    

    var scrollTo = function(pos) {
        var pos;
        $('html,body').animate({scrollTop:pos}, 1000);
        return false;
    }

    $('.j-scroll-to').click(function(event) {
        event.preventDefault(); 
        var div = $(this).attr('href');
        var toPos = $(div).offset().top;
        scrollTo(toPos);
    });


    /*Модальные окна*/
    var overlay = $('#overlay'); 
    var open_modal = $('.open_modal'); 
    var close = $('.modal__close'); 
    var modal = $('.modal'); 
    // для открытия модалки нужна ссылка вида <a href="#name"></a> и класс "open_modal"
    // будет открыта модалка с id="name"
    open_modal.on('click',  function(event){
        modal.fadeOut(200);
        event.preventDefault(); 
        var div = $(this).attr('href'); 
        overlay.fadeIn(400);
        $(div).fadeIn(400);
        $('html, body').addClass('j-noScroll');
    });

    close.on('click', function() {
        modal.fadeOut(200);
        overlay.fadeOut(200);
        $('html, body').removeClass('j-noScroll');
    });

    overlay.on('click', function(event) {
        if ( $( event.target ).attr('id') == 'overlay' ) {
            $(this).fadeOut(200);
            modal.fadeOut(200);
            $('html, body').removeClass('j-noScroll');
        }
    });


    //селект
    $('.select').click(function(event) {
        if ( !$(this).hasClass('j-open') ) {
            event.stopPropagation();
            $(this).addClass('j-open');
            $('.select-list').hide();
            $('.select').not(this).removeClass('j-open');
            $(this).find('.select-list').slideDown(200);
        } else {
            $(this).find('.select-list').slideUp(200);
            $(this).removeClass('j-open');
        }
    });

    $('body').click(function() {
        $('.select-list').slideUp(200);
        $('.select').removeClass('j-open');
    });

    $('.select-list__one').click(function(event) {
        event.stopPropagation();
        var val = $(this).text();
        $('.select').removeClass('j-open');
        $(this).parents('.select').find('input').val(val);
        $(this).parents('.select').find('.select-list').slideUp(200);
    });

    //календарь
    $( ".date input" ).datepicker( $.datepicker.regional[ "ru" ] );

    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
        'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);


    //множественный выбор
    $('.filtr-type-one').on('click', function() {
        $(this).toggleClass('active');
    });
    //одиночный выбор
    $('.filtr-rooms').on('click', function() {
        $(this).toggleClass('active');
    });


    //календарь с выбором промежутка дат
    var startDate;
    var endDate;

    $('#date_range').datepicker({
        range: 'period', // режим - выбор периода
        numberOfMonths: 2,
        minDate: 0,
        onSelect: function(dateText, inst, extensionRange) {
            // extensionRange - объект расширения
            startDate = extensionRange.startDate;
            endDate = extensionRange.endDate;
            deltaDate = (endDate.getTime() - startDate.getTime()) / (1000*60*60*24);
            $('.calendar-result__days span').text(deltaDate+1);
            $('[name=startDate]').val(extensionRange.startDateText);
            $('[name=endDate]').val(extensionRange.endDateText);
        }
    });

    $('.filtr-date').on('click', function() {
        $('.calendar-box').fadeToggle();
    });

    var getDayName = function(thisDate) {
        var days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        var months =['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        var date = new Date(thisDate);
        var dateText = '<span>'+date.getDate() +' '+ months[date.getMonth()] +'</span>, '+ days[date.getDay()]
        return dateText;
    }

    $('.setDate').on('click', function(event) {
        // обработка календаря
        event.preventDefault();
        $('.calendar-box').fadeOut();
        $('.filtr-date').html(getDayName(startDate)+' — '+getDayName(endDate));
    });


    //фильтр дополнительных параметров
    $('.filtr-add-button, .filtr-add__close').on('click', function() {
        if ( $('.filtr-add-button').hasClass('js-open') ) {
            $('.filtr-add').slideUp();
            $('.filtr-add-button').removeClass('js-open');
        } else {
            $('.filtr-add').slideDown();
            $('.filtr-add-button').addClass('js-open');
        }
    });

    $('.other-filtr').on('click', function(e) {
        e.preventDefault;
        $(this).next().slideToggle();
    });

    $('.other-filtr-select, .other-filtr-close').on('click', function() {
        $('.other-filtr-inn').slideUp();
    });

    $('.other-filtr-select-all').on('click', function() {
        $('.other-filtr-inn .checkbox').each(function() {
            $(this).find('input[type="checkbox"]').prop('checked', true);
        })
    });

    $('.filtr-reset').on('click', function(e) {
        $('.filtr-add input[type="checkbox"]').prop('checked', false);
        $('.filtr-add .filtr-rooms').removeClass('active');
    });

    $('.catalog-tag__one').on('click', function() {
        $(this).remove();
    });


    //карта объектов
    $('.map-show-button, .filtr-map__close').on('click', function() {
        if ( $('.map-show-button').hasClass('js-open') ) {
            $('.map').slideUp();
            $('.map-show-button').removeClass('js-open');
        } else {
            $('.map').slideDown();
            $('.map-show-button').addClass('js-open');
        }
    });

    // карусель фото в карточке
    $('.card-slider').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        center: true,
        navText: ['',''],
        responsive: {
            1000 : {
                items: 2
            },
            1160 : {
                items: 3
            }
        },
        URLhashListener:true
    });

    $('.card-slider-zoom').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        image: {
            verticalFit: false
        }
    });

    $('.card-param-showmore').on('click', function() {
        $(this).slideUp().next().slideDown();
        $(this).prev().css('border','none');
    });


    // карусель отзывов в карточке товаров 
    $('.review-main').each(function() {
        var mainScore = $(this).find('span').text();
        var scoreToWidth = (mainScore*100)/5;
        $(this).find('.review-main-graph__active').css('width', scoreToWidth+"%");
    });
    
    $('.rating-list-one').each(function() {
        var thisScore = parseInt($(this).find('.rating-score').text(), 10);
        var graph = $(this).find('.rating-score__graph i');
        for (i = 0; i < thisScore; i++) {
            graph.eq(i).addClass('active');
        } 
    });

    $('.card-review-slider').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        navText: ['',''],
        items: 1
    });



    //форма заказа звонка
    $("input[name=phone]").mask("+7(999) 999-99-99");
    
    $('#order').validate({ 
        rules:{
            phone:{
                required: true,
            },
            name:{
                required: true,
            }
        },

        messages:{
            phone:{
                required: "Обязательное поле",
            },
            name:{
                required: "Обязательное поле",
            }
        },

        submitHandler: function() {
            $('#order').html('<h2>Ваша заявка отправлена.</h2><p>Мы свяжемся с вами с бижайшее время</p>');
        }
    });



    // блок выбора квартиры по номеру
    $('.select-number__close').on('click', function() {
        $('.select-number').animate({'top':'-50px'}, 300);
    });

    $('.show-number').on('click', function() {
        $('.select-number').show().animate({'top':'0px'}, 300);
    });



    // табы карточки
    $('.card-tabs-list a').on('click', function(event) {
        event.preventDefault();
        $('.card-tabs-list a').removeClass('active');
        $(this).addClass('active');
        
        tabId = $(this).index();
        $('.card-tabs > div').hide();
        $('.card-tabs > div').eq(tabId).show();
    });


    // табы контента
    $('.content-tab-menu a').on('click', function(event) {
        event.preventDefault();
        $('.content-tab-menu a').removeClass('active');
        $(this).addClass('active');
        
        tabId = $(this).index();
        $('.content-tab-list > div').hide();
        $('.content-tab-list > div').eq(tabId).show();
    });


    //спрятать
    $('.hint__hide').on('click', function() {
        $(this).parents('.hint').fadeOut();
    });

    $('.card-review__more').on('click', function(event) {
        event.preventDefault();
        $('.card-tabs-list a').removeClass('active');
        $('.card-tabs-list a').eq(2).addClass('active');
        $('.card-tabs > div').hide();
        $('.card-tabs > div').eq(2).show();
    });

    //перенос блока в календаре с прошлой строчки
    $('.calendar-one:nth-child(7n)').not('.disabled').each(function() {
        var setClass = String($(this).find('.calendar-one-inn').attr('class'));
        var blockClass = setClass.split(' ')[1];
        html = '<div class="calendar-warp '+ blockClass +'"><i></i></div>';
        htmlAlt = '<div class="calendar-warp '+ blockClass +'" style="width: 35px"><i></i></div>';
        if ( $(this).next().find('.calendar-one-inn').hasClass('busy') && 
             $(this).find('.calendar-one-inn').hasClass('busy') ) 
        {
            $(this).next().append(htmlAlt);
            //$(this).find('.calendar-one-inn').text('занято');
        } else {
            $(this).next().append(html); 
        }
    });

    //занятые дни
    $('.calendar-one').not('.calendar-one:nth-child(7n)').each(function() {
        if ( $(this).find('.calendar-one-inn').hasClass('busy') && 
             $(this).next().find('.calendar-one-inn').hasClass('busy') ) 
        {
            $(this).find('.calendar-one-inn').css('width', 'calc(100% - 10px)');
        }
    });

    //выбор даты

    var setBooking = function() { //пихаем все выделенные в объект booking 
        var booking = {
            dates: [],
            days: 0,
            price: 0
        }
        
        $('.calendar-one').each(function() {
            if ( $(this).hasClass('selected') ) {
                var selectedDate = {
                    date: $(this).data('date'),
                    price: $(this).data('price'),
                }

                booking.dates.push(selectedDate.date);
                booking.days++;
                booking.price += selectedDate.price;

                console.log(selectedDate);
                $('.booking-price').text(booking.price);
                $('.booking-days').text(booking.days);
            }
        });

        console.log(booking);
        var n = booking.dates.length-1;
        $('.booking-date .filtr-date').text(booking.dates[0]+ ' - ' + booking.dates[n]);

    }

    $('.calendar-one').not('.disabled').on('click', function() {
        if ( !$(this).find('.calendar-one-inn').hasClass('busy') ) {
            $(this).find('.calendar-one-inn').toggleClass('booking');
            $(this).toggleClass('selected');
            setBooking();
        }


        if ( $('.calendar-one.selected').length == 0 ) {
            $('.booking-button__price').hide();
            $('.booking-date .filtr-date').text('Выберете дату заселения');
        } else {
            $('.booking-button__price').show();
        }
    });

});