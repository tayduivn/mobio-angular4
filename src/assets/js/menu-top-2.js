 $(document).ready(function () {
            $('.menu-icon-sammo').click(function () {
                /* Act on the event */
                if ($('.menumobiletop').hasClass('show-menu')) {
                    $('.menumobiletop').removeClass('show-menu');
                } else {
                    $('.menumobiletop').addClass('show-menu');
                }
                return false;

            });

            $('body').click(function () {
                if ($('.menumobiletop').hasClass('show-menu')) {
                    $('body').find('.menumobiletop').removeClass('show-menu');
                }
            });
            // Ẩn các thẻ con
            $('.wrapper-menu .menu_mobile_list .menu_mobile_list-body').hide();

            //Dấu + cấp 1
            $('.wrapper-menu > .menu_mobile_list > h3 > a.show-cat').click(function (e) {
                $('.wrapper-menu .menu_mobile_list .menu_mobile_list-body').slideUp();
                if (!$(this).hasClass('active')) {
                    $(this).parent().next().slideToggle();
                    $('.wrapper-menu > .menu_mobile_list > h3 > a.show-cat').removeClass('active');
                    $('.wrapper-menu > .menu_mobile_list > h3 > a.show-cat span').html("+");
                    $(this).addClass('active');
                    $(this).find('span').html("-");
                }
                else if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).find('span').html("+");
                }
                return false;
            });

        });
		
		 $(document).ready(function () {
            $('.menu-icon-sammo').click(function () {
                /* Act on the event */
                if ($('.menumobiletop-full').hasClass('show-menu')) {
                    $('.menumobiletop-full').removeClass('show-menu');
                } else {
                    $('.menumobiletop-full').addClass('show-menu');
                }
                return false;

            });

            $('body').click(function () {
                if ($('.menumobiletop-full').hasClass('show-menu')) {
                    $('body').find('.menumobiletop-full').removeClass('show-menu');
                }
            });
            // Ẩn các thẻ con
            $('.wrapper-menu .menu_mobile_list .menu_mobile_list-body').hide();

            //Dấu + cấp 1
            $('.wrapper-menu > .menu_mobile_list > h3 > a.show-cat').click(function (e) {
                $('.wrapper-menu .menu_mobile_list .menu_mobile_list-body').slideUp();
                if (!$(this).hasClass('active')) {
                    $(this).parent().next().slideToggle();
                    $('.wrapper-menu > .menu_mobile_list > h3 > a.show-cat').removeClass('active');
                    $('.wrapper-menu > .menu_mobile_list > h3 > a.show-cat span').html("+");
                    $(this).addClass('active');
                    $(this).find('span').html("-");
                }
                else if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).find('span').html("+");
                }
                return false;
            });

        });
		
		
		
		window.addEventListener("resize", function () {
            var myWidth = 0;
            if (typeof (window.innerWidth) == 'number') {
                myWidth = window.innerWidth;
                if (myWidth > 959) {
                    $(".menumobiletop").removeClass("show-menu");
                }
            }
        });