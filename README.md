<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  <script>
  var timeInMinutes = 120;
  var currentTime = Date.parse(new Date());
  var countDownDate = new Date(currentTime + timeInMinutes*60*1000);
  // Update the count down every 1 second
  var x = setInterval(function() {
      // Get todays date and time
      var now = new Date().getTime();
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Output the result in an element with id="demo"
      document.getElementById("countdownTime").innerHTML = hours + "h : "
      + minutes + "m : " + seconds + "s";
      // If the count down is over, write some text
      if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "EXPIRED";
      }
  }, 1000);
  </script>
  <title>EmpowHerSF</title>
</head>

<body>
  <div class="container">

    <div class="header">
      <nav class="navbar">
        <a class="navbar-brand" href="#"><img id="logo" src="images/EmpowHer-SF.svg"></a>
        <ul class="nav navbar-nav">
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>
      </nav>
    </div>
  </div><!--container-->

      <!---CAROUSEL ===============================================-->
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
          </ol>

          <div class="carousel-inner" role="listbox">

            <div class="item active">
              <img class="first-slide" src="images/Fact1.jpg" alt="First slide">
              <div class="container">
                <div class="carousel-caption">
                  <h1> In 2016, California had the highest number of human trafficking cases by state (1323). Or about 3.5 per day. </h1>
                </div>
              </div>
            </div>

            <div class="item">
              <img class="second-slide" src="images/Fact2.jpg" alt="Second slide">
              <div class="container">
                <div class="carousel-caption">
                  <h1>More than one-third of $150 billion in human trafficking profits are from forced labour exploitation, and the remaining two-thirds from sexual exploitation.</h1>

                </div>
              </div>
            </div>

            <div class="item">
              <img class="third-slide" src="images/Fact3.jpg" alt="Third slide">
              <div class="container">
                <div class="carousel-caption">
                  <h1>499 victims of human trafficking were identified by 15 government and community agencies throughout San Francisco in 2015.</h1>

                </div>
              </div>
            </div>

            <div class="item">
              <img class="fourth-slide" src="images/Fact4.jpg" alt="Fourth slide">
              <div class="container">
                <div class="carousel-caption">
                  <h1>Of the almost 500 victims, 122 were minors, almost all of whom were victims of commercial sex exploitation.</h1>

                </div>
              </div>
            </div>


          </div>

          <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>

          <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      <!--END CAROUSEL====================================================-->

      <div class="row text-center countdown">
        <h1 id="countdownTime"></h1>
        <p id="countdownText">Time until the next person calls the National Trafficking Hotline </p>
      </div>

    <div class="row action">

      <div class="col-md-3"></div>
        <div class="col-md-6">
          <h2 class="text-center">What can you contribute?</h2>
          <svg height="10" width="500">
              <line x1="370" y1="0" x2="410" y2="0" style="stroke:rgb(240,46,116);stroke-width:4" />
          </svg>

          <p class="text-center description">
              Human trafficking isn't just an international issue. It's happening right here
              in our own communities. You can help by donating household goods or funding to services
              and organizations that help women get back on their feet. Select what you're willing
              to donate, and we'll match you with shelters that will put them to good use.
          </p>
        </div>
      <div class="col-md-3"></div>

    </div>

    <div class="row action">

      <div class="col-md-3"></div>
        <div class="col-md-6">
          <h2 class="text-center">Most Needed Items</h2>
        </div>
      <div class="col-md-3"></div>

    </div>

    <!--==========ITEM SELECTION============-->
    <form action="results.html" method="get">
    <div class="row action text-center">

      <div class="col-md-3"></div>
        <div class="col-md-2">
          <div class="text-center"><img src="icons/money.svg" class="img-check"></div>
        </div>
        <div class="col-md-2">
          <div class="text-center"><img src="icons/underwear.svg" class="img-check"></div>
        </div>
        <div class="col-md-2">
          <h2 class="text-center"><img src="icons/tampon.svg" class="img-check"></h2>
        </div>
      <div class="col-md-3"></div>

    </div>

    <div class="row text-center">
      <div class="col-md-3"></div>
        <div class="col-md-2">
          <p class="caption"><input type="checkbox" name="funding" value="funding"> Funding</p>
        </div>
        <div class="col-md-2">
          <p class="caption"><input type="checkbox" name="underwear" value="underwear"> Underwear</p>
        </div>
        <div class="col-md-2">
          <p class="caption"><input type="checkbox" name="hygiene" value="hygiene"> Feminine Hygiene</p>
        </div>
      <div class="col-md-3"></div>
    </div>



    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6 text-center">
        <input type="submit" value="Donate">
      </div>
      <div class="col-md-3"></div>
    </div>


  </form>

  <script>
  $('#myCarousel').on('slide.bs.carousel', function () {
    $('#myCarousel').carousel({
        interval: 2000
    });
  })
  $(document).ready(function(e){
    		$(".img-check").click(function(){
				$(this).toggleClass("check");
			});
	});
  </script>
</body>


</html>
