$(document).ready(function() {
    
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

    var booking;

    //выбор даты
    var setBooking = function() { //пихаем все выделенные в объект booking 
        booking = {
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
        
        if ( $('.calendar-one.selected').length == 0 ) {
            $('.booking-button__price').hide();
            $('.booking-date .filtr-date').text('Выберете дату заселения');
        } else {
            $('.booking-button__price').show();
        }

    }

    $('.calendar-one').not('.disabled').on('click', function() {
        if ( !$(this).find('.calendar-one-inn').hasClass('busy') ) {
            $(this).find('.calendar-one-inn').toggleClass('booking');
            $(this).toggleClass('selected');
            setBooking();
        }


    });

    


    //выбор с помощью выпадающего календаря
    $('.m-setDate').on('click', function() {
        var start = $('[name="m-startDate"]').val(),
              end = $('[name="m-endDate"]').val();

        console.log(start, end);
        $('.booking-alert').fadeOut();
        $('.calendar-one').each(function() {
            $(this).removeClass('selected').find('.calendar-one-inn').removeClass('booking');
        });

        block = $('[data-date="'+start+'"]');
        if ( ! block.find('.calendar-one-inn').hasClass('busy') ) {
            block.addClass('selected').find('.calendar-one-inn').addClass('booking');
            while ( block.data('date') != end && block.next().hasClass('calendar-one')) {
                block = block.next();
                block.addClass('selected').find('.calendar-one-inn').addClass('booking');
                if ( block.find('.calendar-one-inn').hasClass('busy') ) {
                    // если есть занятые даты
                    console.log('дата занята ' + block.data('date'));
                    $('.booking-alert').fadeIn();
                    $('.calendar-one').each(function() {
                        $(this).removeClass('selected').find('.calendar-one-inn').removeClass('booking');
                    });
                    break;
                }
            }
        } else {
            // начальная дата занята
            console.log('дата занята ' + block.data('date'));
            $('.booking-alert').fadeIn();
        }

        setBooking();

    });


    // бронирование в карточке
    $('.start-booking').on('click', function() {
        $('.booking-inn').slideDown();
    });

    $('.booking-button').on('click', function() {
        $('.booking-end').animate({
            'left':'0'
        }, 300);
    });

    $('.booking-end__back').on('click', function() {
        $('.booking-end').animate({
            'left':'-100%'
        }, 300);
    });

});