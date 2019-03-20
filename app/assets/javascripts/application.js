// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require_tree .
          let success = (pos) => {
            var MyLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var mapArea = document.getElementById('maps');
            var Options = {
              zoom: 15,      //地図の縮尺値
              center: MyLatLng,    //地図の中心座標
              mapTypeId: 'roadmap'   //地図の種類
            };
            var map = new google.maps.Map(mapArea, Options);  //マップを生成

            // ボタンが押されたときのみピンが追加される
            $('.button').on('click', function(){
              //フェードインする
              $('.click-massage').fadeIn("500", function () {
                //コールバックで3秒後にフェードアウト	
                $(this).delay(3000).fadeOut("500");
              });
              // ピンを追加
              map.addListener('click', function(e) {
                getClickLatLng(e.latLng, map);
              });
              function getClickLatLng(lat_lng, map) {

                // マーカーを設置
                var marker = new google.maps.Marker({
                  position: lat_lng,
                  map: map
                });

              }
            });

            // 現在地のマーカー
            myLocation = new google.maps.Marker({
              map: map, 
              position: Options.center, //Optionsから座標を指定
              icon: {
                url: 'https://higemura.com/wordpress/wp-content/uploads/2018/10/ic_gmap_mylocation.svg', // icon画像（png画像でも可）
                scaledSize: new google.maps.Size(32, 32) // 表示するアイコンサイズ
              },
            });
          }
          // 位置情報取得が失敗したら
          let error = (err) => {
            // エラーメッセージ
            msg = 'エラーが発生しました: ' + err;
            console.log(msg);
          }
          
          // 位置情報を取得
          navigator.geolocation.getCurrentPosition(success, error);
            
            
          //   function initMap() {
          //   //解説2：変数
          //   var mapPosition = new google.maps.LatLng(35.170662, 136.923430);
          //   var mapArea = document.getElementById('maps');
          //   var mapOptions = {
          //     center: mapPosition,
          //     zoom: 15,
          //     mapTypeId: 'roadmap'
          //   };

          //   //解説1：マップを生成するMapクラス
          //   var map = new google.maps.Map(mapArea, mapOptions);
          // }
