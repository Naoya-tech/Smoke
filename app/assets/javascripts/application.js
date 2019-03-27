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
    zoom: 19,      //地図の縮尺値
    center: MyLatLng,    //地図の中心座標
    mapTypeId: 'roadmap',   //地図の種類
    mapTypeControl: false, //マップタイプ コントロール
    fullscreenControl: false, //全画面表示コントロール
    streetViewControl: false, //ストリートビュー コントロール
    zoomControl: false, //ズーム コントロール
  };
  var map = new google.maps.Map(mapArea, Options);  //マップを生成
  
  $(function(){
    $("#setMypo").on('click', function(){
      map.setCenter(MyLatLng);
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
  marker_free = []
  for (i = 0; i < features.length; i++) {
      marker_free[i] = new google.maps.Marker({
      position: features[i].position,
      map: map 
    });
  }
  var infowin_free = [];
  for (var i = 0; i < len; i++) {
    //マーカーウィンドウ
    infowin_free[i] = new google.maps.InfoWindow({ content: areas_ad[i] });
    // mouseoverイベントを取得するListenerを追加
    google.maps.event.addListener(marker_free[i], 'mouseover', function (e) {
      for (var i = 0; i < len; i++) {
        if (marker_free[i].position.lat() === e.latLng.lat()) {
          infowin_free[i].open(map, marker_free[i]);
        }
      }
    });
    // mouseoutイベントを取得するListenerを追加
    google.maps.event.addListener(marker_free[i], 'mouseout', function () {
      for (var i = 0; i < len; i++) {
        infowin_free[i].close();
      }
    });
  }

// ログインユーザーのみのピンの色を変更する
  // ボタンが押されたときのみピンが追加される
  $('.button').on('click', function () {
    //フェードインする
    $('.click-massage').fadeIn("500", function () {
      //コールバックで3秒後にフェードアウト	
      $(this).delay(3000).fadeOut("500");
    });
    // ピンを追加
    map.addListener('click', function (e) {
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
  
  var new_areas_la_login = [];
  for (var i = 0; i < areas_la_login.length; ++i) {
    if (areas_la_login[i] !== "") 
      new_areas_la_login.push(areas_la_login[i]);
  }
  var len_login = new_areas_la_login.length;
  var features_login = [];
  for (i = 0; i < len_login; i++) {
    features_login[i] =
      {
        position: new google.maps.LatLng(areas_la_login[i], areas_lo_login[i]),
      }
  }

  var marker_login = []
  for (i = 0; i < features_login.length; i++) {
      marker_login[i] = new google.maps.Marker({
      position: features_login[i].position,
      map: map,
      icon: new google.maps.MarkerImage(
        '/assets/pin.png',
        new google.maps.Size(35, 45),    //マーカー画像のサイズ
        new google.maps.Point(0, 0),     //位置（0,0で固定）
        // new google.maps.Point(値x, 値y), //位置（任意の調整値）
        ),
    });
  }
  var infowin_login = [];
  for (var i = 0; i < len_login; i++) {
    var contentString = '<div id="content">' +
      '<h2 id="firstHeading" class="firstHeading">'+areas_ad_login[i]+'</h2>' +
      '<div id="bodyContent">' +
      '<p><b>Tokyo</b>は人多いよ〜</p>' +
      '<p>詳細はこちら: <a href="">' +
      'リンクをペッ</a> ' +
      '</p>' +
      '</div>' +
      '</div>';
    //マーカーウィンドウ
    infowin_login[i] = new google.maps.InfoWindow({ content: contentString });
    infowin_login[i].open(marker_login[i].getMap(), marker_login[i]);
      
  }

}
// 位置情報取得が失敗したら
let error = (err) => {
  // エラーメッセージ
  msg = 'エラーが発生しました: ' + err;
}
// 位置情報を取得
navigator.geolocation.getCurrentPosition(success, error);