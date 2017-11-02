new IScroll("#home",{

	mouseWheel:true,
    scrollbars:true
});
new IScroll("#list",{
	mouseWheel:true,
    scrollbars:true
})


var Dates = null;
//ajax返回数据

$.ajax({
	url:'data/data.json',
	dataType:"json",
	success:function(data){
		Dates=data;
	}
})


// console.log(Dates)

$(".container").on('click','a',function(e){

	e.preventDefault();

	var that = $(this).attr("href");
	console.log(1+that)
	$(that).css({
		transition:'all .3s',
		transform:'translateX(0)'

	}).siblings().css({
		transition:'all .3s',
		transform:'translateX(100%)'
	})
	// $("#return").attr("href","#home")
	

	var idx = $(this).index();


	if( this.parentNode.nodeName=='NAV' ){
		$("#mark").css({
			transition:'all .3s',
			left:idx*25+"%"
		})
	}
	//首页效果
	resetHead($(this));
})

function resetHead(dom){
//改变header内容的
	var href = dom.attr('href'),
		returns = $("#return"),
		fav = $("#fav"),
		search = $("#search"),
		id=dom.attr("id");

	if(href=="#home"){
		$('header').find("h2").text("孕育宝典");
		search.show();
		returns.hide();
		fav.hide()
	}
	else if(href=='#favorite'){
		$('header').find("h2").text("收藏");
		returns.show();
		search.show();
		fav.hide();
        return   $("#return").attr("href","#home")
	}else if(href=='#history'){
		returns.show();
		search.show();
		fav.hide()
		$('header').find("h2").text("历史记录");
        return   $("#return").attr("href","#home")
	}else if(href=='#config'){
		returns.show();
		search.show();
		fav.hide();
		$('header').find("h2").text("设置");
        return   $("#return").attr("href","#home")
	}else if(href=='#list'){
		returns.show();
		search.hide();
		fav.hide();
        return   $("#return").attr("href","#home");
		$('header').find("h2").text(dom.attr("title"));
		var str = '';
		$.each(Dates[id].fenlei,function(idx,val){

			console.log(idx);
			str+=`
				<div>
					<a href='#content' id='${id}_${idx}'>
					<img src="img/tu/${val.img}" alt="" />
					<h2>${val.title}</h2>
					</a>
				</div>
			`
		})


		$("#list_iscroll").append(str);

	}else if(href=='#content'){
		search.hide();
		fav.show();
		var cons =' ';
		var str =  dom.attr("id");
		var arr = str.split("_");
        return   $("#return").attr("href","#list")
		console.log(	Dates[arr[0]].fenlei[arr[1]])
		cons=`
			<div>
				<h2>${Dates[arr[0]].fenlei[arr[1]].title}</h2>
				<p>${Dates[arr[0]].fenlei[arr[1]].content}</p>
			</div>
		  `
		// cons=Dates[arr[0]].fenlei[arr[1]].content
		$('#content').html(cons)
	}
	

}

