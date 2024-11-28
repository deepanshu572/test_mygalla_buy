  document.addEventListener("DOMContentLoaded", function() {
    let lazyloadImages = document.querySelectorAll("img.lazyload");
    let imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazyload");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  });

// razorpay code
function pay_now(type) {
  if (type == 1) {
    // payment for installment
    var actual_amount = 700000;
  }
  if (type == 2) {
    // payment for installment
    var actual_amount = 1260000;
  }
  
  if (type == 3) {
    // payment for renwal
    var actual_amount = 800000;
  }
  
    let options = {

      key: "rzp_live_bu3pjWsgmoPheK", //ADD your API key here  
      currency: "INR",
      amount: actual_amount,
      callback_url: 'https://testapk.kalamitcompany.com/Thankyou.html',
      redirect: true,
      handler: function (response) {
        console.log(response);
        if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {       
        //   window.location.href = "index.html";
          alert("Payment Failed Please Try Again");
        } else {
          sendmail(response.razorpay_payment_id);
        }
      },

      "modal": {
        "ondismiss": function () {
          alert("Payment Cancelled");


          //  perform operation if modal is dismissed
        }
      }
    }

    var rzp1 = new Razorpay(options);
    rzp1.open();
  
 
}



function sendmail(paymentID) {console.log(paymentID);
  $.ajax({
    type: 'post',
    url: 'backend.php',
    data: { 'paymentID': paymentID },
    success: function(res) {
      if (res == 1) {
        alert("Congrats Payment Successful");
        window.location.href = "https://testapk.kalamitcompany.com/Thankyou.html";
      } else {
        alert("Mail not sent or payment failed");
        window.location.href = "https://testapk.kalamitcompany.com/Thankyou.html";
      }
    },
  });
}
