$(document).ready(function() {
	/*Call on load*/
	//Top Headlines
	makeAjaxRequest("top-headlines","https://newsapi.org/v2/top-headlines", {"country":"us", "apiKey":"c3148d355ebc4066ac152c078abe753a"});

	//Sources
	makeAjaxRequest("sources","https://newsapi.org/v2/sources/", {"apiKey":"c3148d355ebc4066ac152c078abe753a"});

	
	var currentCode = "US";//Firstly it points US
	$('.countries-drop').on('click', 'span',function(){                 //starting of onclick function on dropdown menu
		var code = $(this).text().split(":")[0];                        //will change when recognisez":"
		if(code != currentCode){
			currentCode = code;
			
			$('#top').html("");         //still empty
			$('#top').append("<div class='owl-carousel owl-theme col-md-12 px-0'></div");  // append the data or response using bootstrap classes
			makeAjaxRequest("top-headlines","https://newsapi.org/v2/top-headlines", {"country":code,"apiKey":"c3148d355ebc4066ac152c078abe753a"});
		}
	});

	$('.search-btn').on('click', function(){        //functionality for search button starts
		var q = $(".search").val();         
		$(".search").val("");       
		$(".search").text("");                                  //if the value in search is empty or text is empty then display none else display the content in the 
		$('#search-results').removeClass('d-none');
		$('.result-container').html("");
		 $([document.documentElement, document.body]).animate({         //animation applied
		        scrollTop: $("#search-results").offset().top                    
		    }, 2000);
		makeAjaxRequest("search","https://newsapi.org/v2/everything", {"q":q,"apiKey":"c3148d355ebc4066ac152c078abe753a"});
	});

	$('.source-btns').on('click', '.btn-source', function(){
		$('.source-container').html("");
		
		var value = $(this).next('input').val();   // matches the selector if found then add its next child
		makeAjaxRequest("source","https://newsapi.org/v2/top-headlines", {"sources":value,"apiKey":"c3148d355ebc4066ac152c078abe753a"});
	});

	/*AJAX Request*/
	function makeAjaxRequest(type, url, data){
	   $.ajax({
	      method: "GET",
	      url: url,
	      data: data,
	      dataType:'json',
	      success: function( response ) {           //fetching response.
	       if(type == "top-headlines")
	       		processTopHeadlines(response);
	       	else if(type == "sources")
	       		processSources(response);
	       	else if(type == "source")
	       		processSource(response);
	       	else if(type == "search")
	       		processSearch(response);
	      },  
	      fail: function() {
	        alert('fail');
	      }   
	    });
	}

	/*Output processers*/
	function processTopHeadlines(response){
		 var item = "";
        for(var i = 0; i < response.articles.length; i++){              //loop till where we need to go i.e till the length of response that array give
        	var imgUrl = (response.articles[i].urlToImage == null) ? "k1.jpg" : response.articles[i].urlToImage;         // if source contains the url image it will print else a randon pic
        	item = " <div class='item'><div class='card z-depth-0'><img class='card-img-top' src='"+imgUrl+"'/><div class='card-body'><h4 class='card-title black-text'><a>"+response.articles[i].title+"</a></h4><p class='card-text'>"+response.articles[i].description+"</p><a href='"+response.articles[i].url+"' class='btn btn-primary'>Read More</a></div></div</div"
        	$('.owl-carousel').append(item);        // appending the data or response in forms of carousel i.e a bootsrtap property of sliding contents on clicking.
        }

        setupCarousel();        //function setupCarousel called
	}

	function processSources(response){
		
		var item = "";
		 for(var i = 0; i < response.sources.length; i++){        //loop till where we want to display the sources news. 
		 	item = "<button type='button' class='btn btn-elegant d-block w-100 mt-0 btn-source'>"+response.sources[i].name+"</button><input type = 'hidden' value = '"+response.sources[i].id+"'>"; //appends the content or response on clicking of the button.
		 	$('.source-btns').append(item);
		 }
	}

	function processSource(response){
		var item = "";
        for(var i = 0; i < response.articles.length; i++){
        	var imgUrl = (response.articles[i].urlToImage == null) ? "k1.jpg" : response.articles[i].urlToImage;
        	item = "<div class='media mb-2'><img class='d-flex mr-3 source-news' src='"+imgUrl+"' alt='Generic placeholder image'/><div class='media-body'><h5 class='my-0 font-weight-bold'>"+response.articles[i].title+"</h5><span>"+response.articles[i].description+"</span><a href='"+response.articles[i].url+"' target='_blank'>Read More...</a></div></div>";
        	$('.source-container').append(item);
        }
	}

	function processSearch(response){
		var item = "";
		var loopAmount = (response.articles.length > 16)? 16:response.articles.length;
        for(var i = 0; i < loopAmount; i++){
        	var imgUrl = (response.articles[i].urlToImage == null) ? "k1.jpg" : response.articles[i].urlToImage;
        	item = "<div class='card card-image col-md-3 p-0' style='background-image: url("+imgUrl+");'><div class='text-white h-100 text-center d-flex align-items-center rgba-black-strong py-5 px-4'><div class='w-100'> <h5 class='orange-text'><i class='fas fa-newspaper'></i> "+response.articles[i].source.name+"</h5><h3 class='card-title pt-2'><strong>"+response.articles[i].title+"</strong></h3><a class='btn btn-orange' href='"+response.articles[i].url+"'><i class='fa fa-clone left'></i> View project</a></div></div></div>";
        	$('.result-container').append(item);
        }
	}

	/*Support functions*/
	function setupCarousel(){
		$('.owl-carousel').owlCarousel({
	    loop: true,
	    margin: 5,
	    responsiveClass: true,
	    responsive: {
	      0: {
	        items: 1,
	        nav: true
	      },
	      600: {
	        items: 2,
	        nav: false
	      },
	      1000: {
	        items: 3,
	        nav: true,
	        loop: true,
	        margin: 5
	      }
	    }
	  })
	}
});