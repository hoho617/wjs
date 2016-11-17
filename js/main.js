'use strict';
$(function(){
	// 函数的作用是当屏幕发生改变时，相应的改变背景图片，并包括当使用较小屏幕时，就该使用img标签
	var flag = 0; // 控制图片的插入次数
	function resize() {
		var windowWidth = $(window).width();// 获取到当前屏幕的宽度
		var isSmallScreen = windowWidth < 768;// 判断是否是小屏幕
		// 获取到每个item,进行遍历，为其添加图片src属性
		$("#main_ad > .carousel-inner > .item").each(function(i,item){
			var $item = $(item);// 将DOM对象转换为jQuery对象,item为每个轮播项
			var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
			$item.css('backgroundImage','url("'+ imgSrc +'")');
			/*当使用较小屏幕时，使用插入img标签*/
			if(isSmallScreen) {
					$item.html('<img src="'+imgSrc+'" alt="" />');
			}else {
					$item.empty();
					// $(window).unbind('resize');
			}

		});
		// 动态设置标签的标签宽度
		var $ulContainer = $('.nav-tabs');
		// 获取所有子元素的宽度和
		var width = 40;// 因为原本ul上面有padding-left
		$ulContainer.children().each(function(i,ele){
			width += ele.clientWidth;
		});
		// 判断ul是否大于当前屏幕的宽度,若是则设置ul的宽度为li的总和
		if(width > $(window).width()){
			$ulContainer.css('width',width).parent().css('overflow-x','scroll');
		}
		}
		/*trigger是为了打开浏览器一开始就调用，*/
		$(window).on('resize',resize).trigger('resize');


		//初始化tooltips插件
		$('[data-toggle = "tooltip"]').tooltip();

		var newsTitle = $("#news .news-title");
		// 为每个a注册点击和hover事件，让其显示标题
		$("#news .container .nav-pills a").on('click',function(){
			// 获取到每个点击的元素
			var $this = $(this);// 将DOM对象转换为jQuery对象
			// 得到点击的a的标题data-title属性
			var title = $this.data('title');
			// 为news-title设置title属性
			newsTitle.text(title);
		});
		$("#news .container .nav-pills a").on('mouseenter',function(){
			// 获取到每个点击的元素
			var $this = $(this);// 将DOM对象转换为jQuery对象
			// 得到点击的a的标题data-title属性
			var title = $this.data('title');
			// 为news-title设置title属性
			newsTitle.text(title);
		});

		// 实现轮播图在手机屏幕下的左滑右滑效果
		/*1、获取手指在轮播元素上的滑动方向(左右)
		    2、根据获取到的方向决定上一张还是下一张*/

		    // 1、获取到手指在轮播元素上的滑动方向
		    // 获取界面上的轮播图容器
		    var $carousels = $(".carousel");
		    var startX,endX;// 用来记录手机开始滑动的X坐标和手指离开时的X坐标
		    var offset = 50;// 设置一个阈值，用来判断何时才为滑动
		    // 注册滑动事件touchstar、touchmove、touchend
		    $carousels.on('touchstart',function(e){
		    	startX = e.originalEvent.touches[0].clientX;
		    	console.log(startX);
		    });
		    $carousels.on('touchmove',function(e){
		    	endX = e.originalEvent.touches[0].clientX;
		    	console.log(endX);
		    });
		    $carousels.on('touchend',function(){
		    	var distance = Math.abs(startX - endX);
		    	if(distance > offset) {
		    		 //2、根据获取到的方向决定上一张还是下一张
		    		 //原生的carousel方法
		    		 $carousels.carousel(startX > endX ? 'next':'prev');
		    	}
		    });

});