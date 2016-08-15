window.addEventListener('load', ajaxfn);
imgCount = 0;

function ajaxfn() {
    var xmlhttp = new XMLHttpRequest();
    var url = "slider.json";
    Title = document.querySelector('.title');
    imgblock = document.querySelector('#imgSlider');
    t = document.getElementById('title');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            arr = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < arr.length; i++) {
                img = document.createElement('img');
                img.src = arr[i].path;
                img.title = arr[i].title;
                imgblock.appendChild(img);
            }
            window.addEventListener("keydown", handleKeyboardNav);

            function handleKeyboardNav(e) {
                var kc = e.keyCode;
                if (kc == 37) slide(1);
                else if (kc == 39) slide(-1);
            }

            //t.innerHTML = arr[imgCount].title;
            window.addEventListener("keydown", titlefn);
            window.addEventListener("click", titlefn);
            titlefn();

            function titlefn() {
                //console.log("Title index:" + imgCount);
                console.log("title click: " + arr[imgCount].title)
                t.innerHTML = arr[imgCount].title

            }
            //console.log(imgblock);
            imgFrame = 0;
            imgArray = document.querySelectorAll('#imgSlider img');
            var l = document.getElementById('left');
            var r = document.getElementById('right');
            l.addEventListener("click", function() {
                slide(1);
            });
            r.addEventListener("click", function() {
                slide(-1);
            });

            function slide(x) {
                //console.log(imgFrame)
                if (imgFrame === 0 && x == 1) {
                    imgCount = 4;
                    for (var i = 0; i < imgArray.length; i++) {
                        var temp = imgArray[i];
                        temp.style.transform = 'translate(' + (-3200) + 'px)';
                        console.log('translate(' + (imgFrame) + 'xpx)')
                    }
                    imgFrame = -3200;
                    console.log("breakpnt2: " + imgCount)

                } else if (imgFrame === -3200 && x === -1) {
                    imgCount = 0;
                    for (var i = 0; i < imgArray.length; i++) {
                        var temp = imgArray[i];
                        temp.style.transform = 'translate(0px)';
                        console.log('translate(' + (imgFrame) + 'px)')
                    }
                    imgFrame = 0;
                    console.log("breakpnt1: " + imgCount)

                } else {
                    imgCount -= x;
                    imgFrame += (x * 800);
                    for (var i = 0; i < imgArray.length; i++) {
                        var temp = imgArray[i];
                        temp.style.transform = 'translate(' + (imgFrame) + 'px)';
                        console.log('translate(' + (imgFrame) + 'opx)')
                    }
                    console.log("imgCount: " + imgCount)
                }
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
