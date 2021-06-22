// const sizes = document.querySelectorAll('.size');

// function changeSize(){
// 	sizes.forEach(size => size.classList.remove('active'));
// 	this.classList.add('active');
// }

// sizes.forEach(size => size.addEventListener('click',changeSize));

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}


function showColor(size){
    jQuery('#size_id').val(size);
    jQuery('.size_'+size).show();
    jQuery('.size-details').css('border','1px solid #ccc');
    jQuery('#size_'+size).css('border','2px solid #b19361');
  }

function add_to_cart(id, size_str_id){
    var size_id = jQuery('#size_id').val();

    if(size_str_id==0){
        size_id='no';
    }
    if(size_id=='' && size_id!='no'){
      toastr.error("You haven't chosen a size yet !!!");
    }
    else{
        jQuery('#product_id').val(id);
        jQuery('#pqty').val(jQuery('#qty').val());
        jQuery.ajax({
          url:'/add_to_cart',
          data:jQuery('#frmAddToCart').serialize(),
          type:'post',
          success:function(result){
            toastr.success(result.msg);
          }
        });
    }
}

function updateQty(pid,size,attr_id,price){
    jQuery('#size_id').val(size);
    var qty=jQuery('#qty'+attr_id).val();
    jQuery('#qty').val(qty)
    add_to_cart(pid,size);
    jQuery('#total_price_'+attr_id).html(formatNumber(qty*price) + ' VND');
}

function deleteCartProduct(pid,size,attr_id){
    jQuery('#size_id').val(size);
    jQuery('#qty').val(0)
    add_to_cart(pid,size);
    jQuery('#cart_box'+attr_id).hide();
  }

jQuery('#frmLogin').submit(function(e){
  jQuery('#login_msg').html("");
  e.preventDefault();
  jQuery.ajax({
    url:'/login_process',
    data:jQuery('#frmLogin').serialize(),
    type:'post',
    success:function(data){
      if(data.status=="error"){
        toastr.error(data.msg);
      }
      if(data.status=="success"){
        toastr.success(data.msg);
        window.location.href='/'
      }
    },
  });
});

function applyCouponCode() {
  var coupon_code = jQuery('#coupon_code').val();
  if(coupon_code != '') {
    jQuery.ajax({
      type:'post',
      url:'/apply_coupon_code',
      data:'coupon_code='+coupon_code+'&_token='+jQuery("[name='_token']").val(),
      success:function(result){
        if(result.status=="success"){
          jQuery('#coupon_code_str').html(result.couponValue);
          jQuery('#total_price').html(formatNumber(result.totalPrice) + ' VND');
          jQuery('#total_price').css('font-weight',700);
          if(result.couponType == "Value") {
            jQuery('#coupon_type').html('VND');
          } else if(result.couponType == "Per") {
            jQuery('#coupon_type').html('%');
          }
          toastr.success(result.msg);
        }
        if(result.status=="error"){
          toastr.error(result.msg);
        }
      }
    });
  }
}

function formatNumber (num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

jQuery('#frmPlaceOrder').submit(function(e){
  e.preventDefault();
  jQuery.ajax({
    url:'/place_order',
    data:jQuery('#frmPlaceOrder').serialize(),
    type:'post',
    success:function(result){
      if(result.status=="success"){
        toastr.success(result.msg);
        window.location.href="/order_placed";
      }
      if(result.status=="error"){
        setTimeout(() => {
          toastr.error(result.msg);
          },500)
      }
    }
  });
});

function sort_by(){
  var sort_by_value=jQuery('#sort_by_value').val();
  jQuery('#sort').val(sort_by_value);
  jQuery('#categoryFilter').submit();
}

jQuery('#frmRegistration').submit(function(e){
  e.preventDefault();
  jQuery('.field_error').html('');
  jQuery.ajax({
    url:'registration_process',
    data:jQuery('#frmRegistration').serialize(),
    type:'post',
    success:function(result){
      if(result.status=="success"){
        toastr.success(result.msg);
        }
        if(result.status=="error"){
          jQuery.each(result.error,function(key,val){
            jQuery('#'+key+'_error').html(val[0]);
          });
        }
    }
  });
});

jQuery('#frmForgot').submit(function(e){
  e.preventDefault();
  jQuery.ajax({
    url:'/forgot_password',
    data:jQuery('#frmForgot').serialize(),
    type:'post',
    success:function(result){
      if(result.status=="success"){
        toastr.success(result.msg);
      }
      if(result.status=="error"){
        toastr.error(result.msg);
      }
    }
  });
});


jQuery('#frmUpdatePassword').submit(function(e){
  e.preventDefault();
  jQuery.ajax({
    url:'/forgot_password_change_process',
    data:jQuery('#frmUpdatePassword').serialize(),
    type:'post',
    success:function(result){
      jQuery('#frmUpdatePassword')[0].reset();
      if(result.status=="success"){
        toastr.success(result.msg);
      }
    }
  });
});