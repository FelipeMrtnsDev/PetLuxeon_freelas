(function() { 
   document.querySelectorAll('[data-carousel="circular"]').forEach(function(carousel) { 
     var track = carousel.querySelector('.category-carousel-1__track'); 
     var leftBtn = carousel.querySelector('.category-carousel-1__arrow--left'); 
     var rightBtn = carousel.querySelector('.category-carousel-1__arrow--right'); 
     var itemWidth = 200; // width + gap 
 
     // Posicionar no centro (segundo terço) 
     track.scrollLeft = track.scrollWidth / 3 - track.clientWidth / 2; 
 
     function checkInfinite() { 
       var singleWidth = track.scrollWidth / 3; 
       if (track.scrollLeft < singleWidth * 0.2) { 
         track.style.scrollBehavior = 'auto'; 
         track.scrollLeft += singleWidth; 
         track.style.scrollBehavior = 'smooth'; 
       } else if (track.scrollLeft > singleWidth * 1.8) { 
         track.style.scrollBehavior = 'auto'; 
         track.scrollLeft -= singleWidth; 
         track.style.scrollBehavior = 'smooth'; 
       } 
     } 
 
     var scrollTimeout; 
     track.addEventListener('scroll', function() { 
       clearTimeout(scrollTimeout); 
       scrollTimeout = setTimeout(checkInfinite, 100); 
     }); 
 
     leftBtn.addEventListener('click', function() { 
       track.style.scrollBehavior = 'smooth'; 
       track.scrollLeft -= itemWidth; 
     }); 
 
     rightBtn.addEventListener('click', function() { 
       track.style.scrollBehavior = 'smooth'; 
       track.scrollLeft += itemWidth; 
     }); 
 
     // Touch/drag support 
     var isDown = false, startX, scrollLeft; 
     track.addEventListener('mousedown', function(e) { 
       isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; 
       track.style.cursor = 'grabbing'; 
     }); 
     track.addEventListener('mouseleave', function() { isDown = false; track.style.cursor = 'grab'; }); 
     track.addEventListener('mouseup', function() { isDown = false; track.style.cursor = 'grab'; }); 
     track.addEventListener('mousemove', function(e) { 
       if (!isDown) return; 
       e.preventDefault(); 
       var x = e.pageX - track.offsetLeft; 
       var walk = (x - startX) * 1.5; 
       track.scrollLeft = scrollLeft - walk; 
     }); 
     track.style.cursor = 'grab'; 
   }); 
 })();