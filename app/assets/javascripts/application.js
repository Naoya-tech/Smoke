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
              mapTypeId: 'roadmap',   //地図の種類
              mapTypeControl: false, //マップタイプ コントロール
              fullscreenControl: false, //全画面表示コントロール
              streetViewControl: false, //ストリートビュー コントロール
              zoomControl: false, //ズーム コントロール
            };
            var map = new google.maps.Map(mapArea, Options);  //マップを生成

            // マーカーデータを地図に反映
            var la = document.getElementById('areas_lat');
            var lo = document.getElementById('areas_log');
            var ad = document.getElementById('areas_address');
            var areas_la = la.getAttribute('data-areas-lat');
            var areas_lo = lo.getAttribute('data-areas-log');
            var areas_ad = ad.getAttribute('data-areas-address');
            areas_la = areas_la.replace('[', '').replace(']', '').split(', ')
            areas_lo = areas_lo.replace('[', '').replace(']', '').split(', ')
            areas_ad = areas_ad.replace('["', '').replace('"]', '').split('", "')
            var len = areas_la.length;
            var features = [];
            for (i = 0; i < len; i++) {
              features[i] =
              {
                position: new google.maps.LatLng(areas_la[i], areas_lo[i]),
              }
            }
            for (i = 0; i < features.length; i++) {
              var marker_free = new google.maps.Marker({
                position: features[i].position,
                map: map 
              });
            }
            console.log(features.position);

            // ログインユーザーのみのピンの色を変更する

            // マーカーデータを地図に反映(ログインユーザー)
            var la_login = document.getElementById('login_areas_lat');
            var lo_login = document.getElementById('login_areas_log');
            var ad_login = document.getElementById('login_areas_address');
            var areas_la_login = la_login.getAttribute('login-data-areas-lat');
            var areas_lo_login = lo_login.getAttribute('login-data-areas-log');
            var areas_ad_login = ad_login.getAttribute('login-data-areas-address');
            areas_la_login = areas_la_login.replace('[', '').replace(']', '').split(', ')
            areas_lo_login = areas_lo_login.replace('[', '').replace(']', '').split(', ')
            areas_ad_login = areas_ad_login.replace('["', '').replace('"]', '').split('", "')

            var len_login = areas_la_login.length;
            var features_login = [];
            for (i = 0; i < len_login; i++) {
              features_login[i] =
                {
                  position: new google.maps.LatLng(areas_la_login[i], areas_lo_login[i]),
                }
            }
            var image = {
              url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
              // This marker is 20 pixels wide by 32 pixels high.
              size: new google.maps.Size(20, 150),
              // The origin for this image is (0, 0).
              origin: new google.maps.Point(0, 0),
              // The anchor for this image is the base of the flagpole at (0, 32).
              anchor: new google.maps.Point(0, 32),

              scaledSize: new google.maps.Size(30, 50)
            };

            for (i = 0; i < features_login.length; i++) {
              var marker_user = new google.maps.Marker({
                position: features_login[i].position,
                map: map,
                icon: image
              });
            }


            // ボタンが押されたときのみピンが追加される
            $('.button').on('click', function(){
              //フェードインする
              $('.click-massage').fadeIn("500", function () {
                //コールバックで3秒後にフェードアウト	
                $(this).delay(3000).fadeOut("500");
              });
              // ピンを追加
              map.addListener('click', function(e) {
                getClickLatLng(e.latLng, map)
              });
              
              function getClickLatLng(lat_lng, map) {

                // 座標を表示
                $('#lat_test').val([lat_lng.lat()]);
                $('#lng_test').val([lat_lng.lng()]);


                // マーカーを設置(このピンはデータベースには反映されない)
                var marker = new google.maps.Marker({
                  position: lat_lng,
                  map: map
                });

                $('#myModal').toggleClass('visible');

                $('.close').on('click', function () {
                  $('#myModal').removeClass('visible');
                });
              }
              
            });
            console.log(areas_ad);
            areas_ad.forEach(function (element) {
              
              //マーカーウィンドウ
              var infowin = new google.maps.InfoWindow({ content: element });
              // mouseoverイベントを取得するListenerを追加
              google.maps.event.addListener(marker_free, 'mouseover', function () {
                infowin.open(map, marker_free);
              });

              // mouseoutイベントを取得するListenerを追加
              google.maps.event.addListener(marker_free, 'mouseout', function () {
                infowin.close();
              });
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

          // $(function(){
          //   google.maps.event.addListener(maps, 'idle', function(){
          //     pos = map_canvas.getBounds()
          //     north = pos.getNorthEast().lat()
          //     south = pos.getSouthWest().lat()
          //     east = pos.getNorthEast().lng()
          //     west = pos.getSouthWest().lng()
          //     // # コントローラーに値をGETパラメータで渡す
          //     $.getScript("/areas/marker?&north=#{north}&south=#{south}&east=#{east}&west=#{west}")
          //   });
          // });
