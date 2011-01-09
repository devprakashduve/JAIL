// Create new YUI instance, and populate it with the required modules
YUI().use("node", "console", "test", "node-event-simulate", function (Y) {
 
	// Test Case for delayed images loaded
    var testCaseAsynch = new Y.Test.Case({

	    name: "TestCase Images loaded after timeout",
	
		setUp : function() {
			$('#container').append('<img class="lazy" name="../sample1.jpg" src="../img/blank.jpg" width="200" height="200"/> ');
		},
		
		tearDown : function() {
			$('.lazy').remove();
		},
		
	//	_should: {
	        //ignore: {
	         //   "test Images Loaded Asynchronously after DOM is ready": true, //ignore this test
				//"test Images Loaded Asynchronously with 1 seconds Delay" : true
	        //}
	    //},
	 
		
	    "test Images Loaded Asynchronously after DOM is ready" : function() {
		
			// Call to the method
	        $('img.lazy').asynchImageLoader();
			
			//wait 10 milliseconds and then run this function
		    this.wait(function(){
		   		Y.Assert.areEqual($('img.lazy').attr("src"), "../sample1.jpg");
		    }, 10);
	    },
	
		"test Images Loaded Asynchronously with 1 seconds Delay" : function () {
			
			// Call to the method with timeout
		    $('img.lazy').asynchImageLoader({timeout : 1000 });
		
			Y.Assert.areEqual($('img.lazy').attr("src"), "../img/blank.jpg");

			//wait 1000 milliseconds and then run this function
			this.wait(function(){
			    Y.Assert.areEqual($('img.lazy').attr("src"), "../sample1.jpg");
			}, 1000);
		}
	});
	
	// Test Case for images loading after a click
	var testCaseClickAsynch = new Y.Test.Case({

	    name: "TestCase Images loaded after a click",
	
		setUp : function() {
			$('#container').append('<a class="link">Link</a><img id="img1" class="lazy" name="img1.jpg" src="blank.jpg" /><img class="lazy" name="img2.jpg" src="blank.jpg" /> ');
			$('#container').append('<a class="link2">Link</a><img class="lazy" name="img3.jpg" src="blank.jpg" /><img class="lazy" name="img4.jpg" src="blank.jpg" 	/>');
		},
		
		tearDown : function() {
			$('.lazy').remove();
			$('.link').remove();
			$('.link2').remove();
		},
		
			//_should: {
		        //ignore: {
		        //    "test All Images Loaded after a click on a link": true
		       // }
		   // },
		
	    "test All Images Loaded after a click on a link" : function () {
		
			$('img.lazy').asynchImageLoader({event: "click", selector : "a.link" });
			
			//Click on the link
			Y.one("a.link").simulate("click");
			
			Y.Assert.areEqual($('img.lazy').eq(0).attr("src"), "img1.jpg");
			Y.Assert.areEqual($('img.lazy').eq(1).attr("src"), "img2.jpg");
			Y.Assert.areEqual($('img.lazy').eq(2).attr("src"), "img3.jpg");
			Y.Assert.areEqual($('img.lazy').eq(3).attr("src"), "img4.jpg");
		},
	
		"test Image Fades in after a click on the image placeholder" : function () {
			
		    $('img.lazy').asynchImageLoader({event: "click", effect : "fadein", placeholder: "img/loader" });

			Y.one("#img1").simulate("click");
			
			Y.Assert.areEqual($('img.lazy').eq(0).attr("src"), "img1.jpg");
			Y.Assert.areEqual($('img.lazy').eq(1).attr("src"), "img/loader");
			Y.Assert.areEqual($('img.lazy').eq(2).attr("src"), "img/loader");
			Y.Assert.areEqual($('img.lazy').eq(3).attr("src"), "img/loader");
		},
		
		
		"test Images loaded after a click on a link and callback associated" : function () {
			
			
			Y.Assert.areEqual(value, "10");
				
			$('img.lazy').asynchImageLoader({event: "click", selector : "a.link", callback : function(){value=20;}});

			Y.one("a.link").simulate("click");
			
			Y.Assert.areEqual($('img.lazy').eq(0).attr("src"), "img1.jpg");
			Y.Assert.areEqual($('img.lazy').eq(1).attr("src"), "img2.jpg");
			Y.Assert.areEqual($('img.lazy').eq(2).attr("src"), "img3.jpg");
			Y.Assert.areEqual($('img.lazy').eq(3).attr("src"), "img4.jpg");
			
			Y.Assert.areEqual(value, "20");
		}
	});
	
	// Test Case for images loading after mouseover on a div
	var testCaseMouseOverAsynch = new Y.Test.Case({

	    name: "TestCase Images loaded after mousing over on a div",
	
		setUp : function() {
			$('#container').append('<div id="tool" class="tool"></div><img id="img1" class="lazy" name="img1.jpg" src="blank.jpg" /><img class="lazy" name="img2.jpg" src="blank.jpg" /> ');
			$('body').append('<div id="wrapper"><div class="container2"><a class="link2">Link</a><img class="lazy" name="img3.jpg" src="blank.jpg" /><img class="lazy" name="img4.jpg" src="blank.jpg" /></div></div>');
		},
		
		tearDown : function() {
			$('.tool').remove();
			$('.tool').empty();
			$('.lazy').remove();
			$('.lazy').empty();
			$('.link').remove();
			$('.link').empty();
			$('#wrapper').remove();
			$('#wrapper').empty();
		},
		
	    "test All Images Loaded after a mouse over on a div" : function () {
		
			$('img.lazy').asynchImageLoader({event: "mouseover", selector : ".tool" });
			
			//Click on the link
			Y.one("#tool").simulate("mouseover");
			
			Y.Assert.areEqual($('img.lazy').eq(0).attr("src"), "img1.jpg");
			Y.Assert.areEqual($('img.lazy').eq(1).attr("src"), "img2.jpg");
			Y.Assert.areEqual($('img.lazy').eq(2).attr("src"), "img3.jpg");
			Y.Assert.areEqual($('img.lazy').eq(3).attr("src"), "img4.jpg");
			
			testCaseMouseOverAsynch.tearDown();
		},
		
		"test Image loading after mousing over" : function() {
			
			testCaseMouseOverAsynch.setUp();
			
			$('img.lazy').asynchImageLoader({event: "mouseover"});

			Y.one("#img1").simulate("mouseover");
			
			Y.Assert.areEqual($('img.lazy').eq(0).attr("src"), "img1.jpg");
			Y.Assert.areEqual($('img.lazy').eq(1).attr("src"), "blank.jpg");
			Y.Assert.areEqual($('img.lazy').eq(2).attr("src"), "blank.jpg");
			Y.Assert.areEqual($('img.lazy').eq(3).attr("src"), "blank.jpg");
			
			testCaseMouseOverAsynch.tearDown();
		},
		
		"test Images only inside a wrapper after mousing over on a link" : function() {
			
			testCaseMouseOverAsynch.setUp();
			$('img.lazy').asynchImageLoader({event: "mouseover", selector : ".tool", callback : function(){value2=20;}});

			Y.one(".tool").simulate("mouseover");
			
			Y.Assert.areEqual($('.container2 img.lazy').eq(0).attr("src"), "img3.jpg");
			Y.Assert.areEqual($('.container2 img.lazy').eq(1).attr("src"), "img4.jpg");
			
			Y.Assert.areEqual(value2, "20");
			
			testCaseMouseOverAsynch.tearDown();
		}
	});
	
	
	var console = new Y.Console({
	    verbose: true,
	    newestOnTop: false,
	    style: "block",
		width:"600px",
	    height:"900px"
	});

	console.render('#testLogger');

	Y.Test.Runner.add(testCaseAsynch);
	Y.Test.Runner.add(testCaseClickAsynch);
	Y.Test.Runner.add(testCaseMouseOverAsynch);
	Y.Test.Runner.run();
 
});
