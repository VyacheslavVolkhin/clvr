//button scroll 
document.querySelectorAll('.js-anchor-button').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		document.querySelector('.popup-menu-wrap .btn-popup-toggle').classList.remove('active')
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});



//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')
function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}
	
}
for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('[data-tab]')) {
			let tabsNavElements = this.querySelector('[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('[data-tab]').classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
tabsActiveStart()




//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')
function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}
function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}
function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}
for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
				window.scrollTo({top: 0, behavior: 'smooth'});
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.querySelector('.button-title').innerHTML = ''
			popupElementButton.querySelector('.button-title').insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.querySelector('.button-title').innerHTML = ''
				popupElementButton.querySelector('.button-title').insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})


//mobile menu
const menuButton = document.querySelectorAll('.footer .menu-inner-wrap li a');
for (i = 0;i < menuButton.length;i++) {
	menuButton[i].addEventListener('click', function(e) {
		if (innerWidth < 768) {
			if (this.parentElement.classList.contains('submenu')) {
				this.parentElement.classList.toggle('open')
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		}
	})
}





$(document).ready(function(){

	if (!!$('.header').offset()) {
		let stickyTop = $('.header').offset().top;
		$(window).scroll(function(){
			let windowTop = $(window).scrollTop();
			if (stickyTop < windowTop){
				$('.wrap').addClass('wrap-header-fixed');
			}
			else {
				$('.wrap').removeClass('wrap-header-fixed');
			}
		});
	}

	//popups
	let popupCurrent;
	$('.js-popup-open').on('click', function () {
		$('.popup-outer-box').removeClass('active');
		$('body').addClass('popup-open');
		popupCurrent = $(this).attr('data-popup');
		$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		return false;
	})
	$('.js-popup-close').on('click', function () {
		$('body').removeClass('popup-open');
		$('.popup-outer-box').removeClass('active');
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-open-scroll');
			$('.popup-outer-box').removeClass('active');
			return false;
		}
	})


	//more
	$('.more-box a').on('click', function() {
		$(this).toggleClass('active').parents('.more-outer-wrap').toggleClass('active');
		return false;
		
	})


	//video-slider-box
	if (!!$('.video-slider-box').offset()) {
		$('.video-slider-box .slider').slick({
			dots: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						dots: false,
					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
						adaptiveHeight: true,
						dots: false,
					}
				},
			]
		});
		
	}

	//equipments-slider-box
	if (!!$('.equipments-slider-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.equipments-slider-box .slider').slick({
				dots: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				touchThreshold: 100,
				variableWidth: false,
				infinite: true,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 1400,
						settings: {
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
						}
					},
				]
			});
		}
	}

	
});


