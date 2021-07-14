@extends('front/layout')
@section('page_title', 'Order Successfully')
@section('container')
  
<!-- ...:::: Start Error Section :::... -->
<div class="error-section" style="margin-top: 70px">
    <div class="container">
        <div class="row">
            <div class="error-form">
                <h1 class="big-title" data-aos="fade-up" data-aos-delay="0"> Order Successfully </h1>
                <h4 class="sub-title" data-aos="fade-up" data-aos-delay="200">Your Order ID: {{session()->get('ORDER_ID')}}</h4>
                <p data-aos="fade-up" data-aos-delay="400">Thank you for choosing us
                  <span><i class="fa fa-heart text-danger"></i></span>
                </p>
                <div class="row">
                    <div class="col-10 offset-1 col-md-4 offset-md-4">
                        <a href="{{url('/')}}" class="btn btn-md btn-black-default-hover mt-7" data-aos="fade-up"
                            data-aos-delay="400">Back to home page</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div> <!-- ...:::: End Error Section :::... -->

@endsection

<?php
    Session::forget('ORDER_ID');
    Session::forget('TOTAL_PRICE');
?>
