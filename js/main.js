$(document).ready(function($) {

	"use strict";


	var loader = function() {
		setTimeout(function() {
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function() {
		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			stagePadding: 5,
			nav: false,
			navText: ['<span class="icon-chevron-left">', '<span class="icon-chevron-right">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});
	};
	carousel();


	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');
				}

				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function() {

		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.ftco-number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});

			}

		} , { offset: '95%' } );

	}
	counter();



	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();



	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });

  $('#m_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});
	$('#m_time').timepicker();

	$('.cart_function').click(function(event){

		if(!$(event.target).hasClass('cart_dropdown') && !$(event.target).parents().hasClass('cart_dropdown')){
						$('.cart_dropdown').toggle();
						load_cartDate();
		}
	});
	$(document).click(function(){
		if ($('.cart_function').is(':visible')) {
			if(!$(event.target).hasClass('cart_function') && !$(event.target).parents().hasClass('cart_function')){
					$('.cart_dropdown').hide();
			}
		}
	});
	load_cartDate();
});

var cartList = {};

function clikToAddCart(ele){
	var temp = $(ele).parents('.media-body');			//this function change cart data
	var product_name = temp.children('h5').html().replace(/ /g, "_");
	if(Object.keys(cartList).indexOf(temp.children('h5').html().replace(/ /g, "_"))>-1){
		cartList[product_name].count = cartList[product_name].count+1;
	}
	else{
		product_detail = {};
		product_detail.name = temp.children('h5').html();
		product_detail.price = temp.children('.menu-price').html();
		product_detail.count=1;
		cartList[product_name]=product_detail;
	}
	load_cartDate();
}
function load_cartDate(){
	var template = $('.list_template').html();
	$('.cart-list').html('');
	if(Object.keys(cartList).length==0){
		$('.empty_cart_template').show();
		$('.cart-list').hide();
		$('.bb-list-total').hide();
		$('.bb-popover-footer').hide();
		$('.cart_dot').hide();
	}
	else{
		$('.empty_cart_template').hide();
		$('.cart-list').show();
		$('.bb-list-total').show();
		$('.bb-popover-footer').show();
		$('.cart_dot').show();
		$('.cart_dot').html(Object.keys(cartList).length);
	}
	var total=0;
	for(var a in cartList){
		$('.cart-list').append("<div class='bb-list list_"+a+"'>"+template+"</div>");
		$('.cart-list .list_'+a+' .item-name').html(cartList[a].name);
		$('.cart-list .list_'+a+' .count').html(cartList[a].count);
		var price = parseFloat(cartList[a].price.replace('₹',''))*cartList[a].count;
		total = total+price;
		$('.cart-list .list_'+a+' .price').html('₹'+price);
	}
	$('.bb-list-total .price').html('₹'+total);
}
function increaseCount(ele){
	var rec_name = $(ele).parents('.quantity').siblings('.item-name').html().replace(/ /g, "_");
	cartList[rec_name].count = cartList[rec_name].count + 1;
	load_cartDate();
	$('.cart_dropdown').delay(5000).show();
}
function decreaseCount(ele){
	var rec_name = $(ele).parents('.quantity').siblings('.item-name').html().replace(/ /g, "_");
	if(cartList[rec_name].count<=1){
			delete cartList[rec_name];
	}
	else{
			cartList[rec_name].count = cartList[rec_name].count - 1;
	}
	load_cartDate();
	$('.cart_dropdown').delay(5000).show();
}
