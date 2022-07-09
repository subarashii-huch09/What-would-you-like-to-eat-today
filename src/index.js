// 
// Feature: Switch Languages ( Eng-Man-JAP)
// 
// // DOM selectors
const langs = document.querySelector(".languages");
const links = document.querySelectorAll("a");

const title = document.querySelector(".title");
const instruction = document.querySelector(".instruction");
const myFav = document.querySelector(".my-fav");
const spin = document.querySelector(".spin");
const addFav = document.querySelector(".add-fav");
const google = document.querySelector("#google");

// // run through all the links via forEach
// // attach  addEventListener to individual link
// // The clicked/targeted link will be removed with active class regardless of  if it had one
// // Then the active class will be added it back
// // Retrieve attribute value i.e. language = "English/Mandarin/Japanese" 
// // Use Switch statement to alter google API region & language
// // Use bracket notation rather than dot notation to access object then assign the retrieved values to each DOM selectors respectively

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    langs.querySelector(".active").classList.remove("active");
    link.classList.add("active");
    // console.log(link)
    let attr = link.getAttribute("language");

    switch (attr) {
      case "mandarin":
        // console.log(e.target.getAttribute("language"));
        google.setAttribute(
          "src",
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAG3-yC4hODHxY6M-8KkvoUXx_d8NXYMDA&libraries=places&callback=initMap&region=TW&language=zh-TW"
        );
        // console.log(google.getAttribute("src"));
        break;
      case "japanese":
        // console.log(e.target.getAttribute("language"));
        google.setAttribute(
          "src",
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAG3-yC4hODHxY6M-8KkvoUXx_d8NXYMDA&libraries=places&callback=initMap&region=JP&language=ja"
        );
        // console.log(google.getAttribute("src"));
        break;
      default:
        // console.log(e.target.getAttribute("language")+"hi");
        google.setAttribute(
          "src",
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAG3-yC4hODHxY6M-8KkvoUXx_d8NXYMDA&libraries=places&callback=initMap"
        );
      // console.log(google.getAttribute("src"));
    }

      title.textContent = data[attr].title;
      instruction.innerHTML = data[attr].instruction;
      myFav.textContent = data[attr].myFav;
      spin.textContent = data[attr].spin;
      addFav.textContent = data[attr].addFav;
  });
});

let data = {
  english: {
    title: "What'd you like to eat today?",
    instruction: `
        <p>Can’t decide what’s for lunch or dinner? You've come to the right place !</p>
          <p>    
            For better user experience, allow the site to use your current
            location.
          </p>
          <p>
            Once the map is loaded with your current location, enter your
            favourite food place
          </p>
          <p>
            Select the place from the drop-down menu then click the green button
            below
          </p>
          <p>
            After the button is clicked, the food place will be added under My
            Favourites
          </p>
          <p>
            Click Spin the Wheel. Feel free to add more places before spinning
            the wheel :D
          </p>
           <p>
            A pop-up will announce the winning place. The map above will display relevant information for that place ! 
          </p>
    `,
    myFav: "My Favourites",
    addFav: "Add to My Favourites",
    spin: "Spin the Wheel",
  },

  mandarin: {
    title: "今天想吃什麼？",
    instruction: `
        <p>還是無法決定午餐或晚餐想吃什麼嗎？您來到對的地方啦！
        </p>
        <p>
            為了有更好的使用者體驗，請按下允許此網站使用您目前的位置。
          </p>
          <p>當地圖已載入您目前所在位置後，請輸入您喜愛的飲食地點。
          </p>
          <p>
            選取選單中的地點，然後請按下面的綠色按鈕
          </p>
          <p>
            完成上許步驟後，您喜愛的飲食地點會被加入下面
          </p>
          <p>
            點選『轉輪子來抽籤』。可以加入越多地點越好哦:D
          </p>
           <p>
            選出的地點將會在視窗上顯示。同時上面的地圖會顯示該地點的資訊。
          </p>
          `,
    myFav: "我的最愛",
    addFav: "加入最愛❤️",
    spin: "轉輪子來抽籤",
  },

  japanese: {
    title: "今日は何を食べたいですか？",
    instruction: `<p>ランチとディナーのどちらを選ぶか決められませんか？あなたは正しい場所に来ました！</p>
    <p>
            ユーザーエクスペリエンスを向上させるには、サイトが現在の場所を使用できるようにします。
          </p>
          <p>
            地図に現在地が読み込まれたら、お気に入りの食べ物の場所を入力します
          </p>
          <p>
           ドロップダウンメニューから場所を選択し、下の緑色のボタンをクリックします
          </p>
          <p>
          ボタンをクリックすると、お気に入りの下に食べ物の場所が追加されます
          </p>
          <p>
           [ホイールを回転]をクリックします。ホイールを回す前に、自由に場所を追加してください：D
          </p>
          <p>ポップアップが当選場所を発表します。上の地図には、その場所に関連する情報が表示されます。
          </p>
          `,
    myFav: "私のお気に入り",
    addFav: "私のお気に入りに追加 ❤️",
    spin: "ホイールを回転させる",
  },
};


//
// Feature: Google Maps API 
//
let map;
let currentPosition;
let selectedPlace;
let marker;

let directonService;
let directionRender;

let infoWindow;

function initMap() {
  // create a map
  map = new google.maps.Map(document.querySelector(".map"), {
    // the center of map  剛開始地圖的中心點
    center: { lat: -36.848461, lng: 174.763336 },

    // initial zoom ratio 剛開始地圖的縮放大小
    // 1-20，數字愈大，地圖愈細：1是世界地圖，20就會到街道
    zoom: 7,

    // hybrid 顯示正常和衛星視圖的混合。
    mapTypeId: "hybrid",

    // 日間/夜間地圖
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });

  // 先確認使用者裝置能不能抓地點
  if (navigator.geolocation) {
    // get current position
    navigator.geolocation.getCurrentPosition((position)=> {
      currentPosition = {
        // coords = coordiantes
        // https://developers.google.com/maps/documentation/javascript/geolocation
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      //設定目前位置為中心點，並顯示在網頁上
      map.setCenter(currentPosition);
      map.setZoom(14);

      // 選取輸入匡
      // Autocomplete 會有兩個參數：輸入匡 ＆ 物件（可以針對搜尋的工作最設定）
      // https://developers.google.com/maps/documentation/javascript/places-autocomplete?hl=en#javascript
      const searchInput = new google.maps.places.Autocomplete(
        document.querySelector(".input"),
        {
          //設定景點種類
          types: ["restaurant", "bakery", "cafe"],

          // 以目前位置來設定搜尋的邊界
          // Create a bounding box with sides ~10km away from the center point
          //
          bounds: {
            east: currentPosition.lng + 0.1,
            west: currentPosition.lng - 0.1,
            south: currentPosition.lat - 0.1,
            north: currentPosition.lat + 0.1,
          },

          // 雖然搜尋是以上面的邊界設定為優先，但是我們還是不要太過限制，還是希望搜尋範圍不要只有限定在上面設定邊界
          strictBounds: false,
        }
      );

      // // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
      // 我們在這綁定監聽器，當點選某個選項時，就會呼救裡面的函式，裡面函式的功能是取得選取的地方訊息
      searchInput.addListener("place_changed", () => {
        const place = searchInput.getPlace();

        // console.log(place)
        selectedPlace = {
          location: place.geometry.location,
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          phoneNumber: place.formatted_phone_number,
          rating: place.rating,
        };

        //設定地圖中心就會更新到選取的地放的位置
        map.setCenter(selectedPlace.location);

        // marker一開始沒有值，所以我們就會進入判斷式，裡面製造一個marker
        // https://developers.google.com/maps/documentation/javascript/adding-a-google-map?hl=en
        if (!marker) {
          marker = new google.maps.Marker({
            map: map,
          });
        }
        // 指定marker位置為選取的地點位置
        marker.setPosition(selectedPlace.location);

        // https://developers.google.com/maps/documentation/javascript/directions?hl=en

        // 取得步行路線資訊
        //當directionService裡面是空的時候，我們會建立一個新的
        if (!directonService) {
          directonService = new google.maps.DirectionsService({
            map: map,
          });
        }

        // 畫出路線
        //當directionRender裡面是空的時候，我們會建立一個新的
        if (!directionRender) {
          directionRender = new google.maps.DirectionsRenderer({
            map: map,
          });
        }

        // 先確定directionRender是空的，所以先呼叫set來清空
        directionRender.set("directions", null);

        // 呼叫route 去取得路線資訊, route裡面有兩個參數
        directonService.route(
          {
            //起點：建立一個經度緯度的地圖物件
            origin: new google.maps.LatLng(
              currentPosition.lat,
              currentPosition.lng
            ),

            //終點
            destination: {
              placeId: selectedPlace.placeId,
            },
            //指定旅途方式
            travelMode: "WALKING",
          },
          function (response, status) {
            if (status === "OK") {
              directionRender.setDirections(response);

              //在marker上面加上一個框框，顯示資訊
              // https://developers.google.com/maps/documentation/javascript/infowindows?hl=en
              if (!infoWindow) {
                infoWindow = new google.maps.InfoWindow();
              }

              infoWindow.setContent(
                `
            <h3>${selectedPlace.name}</h3>
            <p><span> 🛖 Address: </span>${selectedPlace.address}</p>
            <p><span> ☎️ Phone Number : </span><a href="tel:${selectedPlace.phoneNumber}"> ${selectedPlace.phoneNumber}</a></p>
            <p><span> ⭐️ Rating: </span>${selectedPlace.rating}</p>
            <p><span>⏱ Walking Time: </span>${response.routes[0].legs[0].duration.text}</p>`
              );

              // 打開infowindow
              infoWindow.open(map, marker);
            }
          }
        );
      });
    });
  } else {
    alert("Your device does not support geolocation feature");
  }
 
}
// 這裡做初始化的設定，就是一開始從localStorage取得資料
const placeList = JSON.parse(localStorage.getItem("placeList")) || [];
// 然後使用forEach來loop過每個選項，並顯示出在我的最愛清單上
placeList.forEach((place) => {
  document.querySelector(".foodPlace_list").innerHTML += `
    <li class="list-group-item">${place.name} 
    <button class="btn-close float-end remove"></button>
    </li>
  `;
});


// 
//  Feature: Wheel
//
const colours = ["#eae56f", "#89f26e", "#7de6ef", "#e7706f"];
const wheel = new Winwheel({
  numSegments: placeList.length,
  segments: placeList.map((place, index) => {
    return {
      fillStyle: colours[index % 4],
      text: place.name,
      strokeStyle: "white",
      textFontSize: "12",
    };
  }),
  responsive: true,
  pins: true,
  animation: {
    type: "spinToStop",
    spins: 12,
    easing: "Power4.easeInOut",
    callbackSound: playSound,
    callbackFinished: function (segment) {
      //抽到之後，把視窗關起來
      document.querySelector(".wheel").style.display = "none";
      // 重新設置輪盤
      wheel.rotationAngle = 0;

      //呼叫wheel 讓它重新畫一次輪盤
      wheel.draw();

      window.alert(segment.text);
      //
      //從localStorage找到選項資料，然後透過find從列表裡找出來
      const placeList = JSON.parse(localStorage.getItem("placeList")) || [];
      selectedPlace = placeList.find((place) => {
        return place.name === segment.text;
      });

      // 以下就跟找到選取項目並標示出路線及資訊的方式一樣
      map.setCenter(selectedPlace.location);

      if (!marker) {
        marker = new google.maps.Marker({
          map: map,
        });
      }
      marker.setPosition(selectedPlace.location);
      if (!directonService) {
        directonService = new google.maps.DirectionsService({
          map: map,
        });
      }

      if (!directionRender) {
        directionRender = new google.maps.DirectionsRenderer({
          map: map,
        });
      }

      directionRender.set("directions", null);

      directonService.route(
        {
          origin: new google.maps.LatLng(
            currentPosition.lat,
            currentPosition.lng
          ),
          destination: {
            placeId: selectedPlace.placeId,
          },
          travelMode: "WALKING",
        },
        function (response, status) {
          if (status === "OK") {
            directionRender.setDirections(response);
            if (!infoWindow) {
              infoWindow = new google.maps.InfoWindow();
            }
            infoWindow.setContent(
              `
            <h3>${selectedPlace.name}</h3>
            <p><span> 🛖 Address: </span>${selectedPlace.address}</p>
            <p><span> ☎️ Phone Number : </span><a href="tel:${selectedPlace.phoneNumber}"> ${selectedPlace.phoneNumber}</a></p>
            <p><span> ⭐️ Rating: </span>${selectedPlace.rating}</p>
            <p><span>⏱ Walking Time: </span>${response.routes[0].legs[0].duration.text}</p>`
            );
            infoWindow.open(map, marker);
          }
        }
      );
    },
    callbackAfter: "drawTriangle()",
  },
});

drawTriangle();

function drawTriangle() {
  // Get the canvas context the wheel uses.
  let ctx = wheel.ctx;

  ctx.strokeStyle = "navy"; // Set line colour.
  ctx.fillStyle = "orange"; // Set fill colour.
  ctx.lineWidth = 2;
  ctx.beginPath(); // Begin path.
  ctx.moveTo(150, -10); // Move to initial position.
  ctx.lineTo(220, 0); // Draw lines to make the shape.
  ctx.lineTo(180, 25);
  ctx.lineTo(151, -10);
  ctx.stroke(); // Complete the path by stroking (draw lines).
  ctx.fill(); // Then fill.
}

let audio = new Audio('/tick.mp3');  // Create audio object and load desired file.
 
function playSound(){
        // Stop and rewind the sound (stops it if already playing).
        audio.pause(),
        audio.currentTime = 0,
 
        // Play the sound.
        audio.play()}

// 當增加的按鈕按下，就會清單內容就會增加
// 我們同時希望有刪除的功能，所以加上button
document.querySelector(".add").addEventListener("click", () => {
  document.querySelector(".foodPlace_list").innerHTML += `
    <li class="list-group-item">${selectedPlace.name} 
    <button class="btn-close float-end remove"></button>
    </li>`;

  //每次按下新增的時候， 我們從localStorage取得存在瀏覽器的選項列表
  // getItem 要傳一個字串，就是我們傳到瀏覽器資料的名稱
  // 取出來後，資料是字串，所以用JSON.parse，把資料轉為javascript陣列
  // 如果取出來是空值，我們就設置一個新的空的陣列
  const placeList = JSON.parse(localStorage.getItem("placeList")) || [];

  // 把選到的選項放進陣列裡
  placeList.push(selectedPlace);

  // 放進陣列後，我們再重新把他放到localStorage裡面
  // 存進去前，記得把資料轉換成字串
  localStorage.setItem("placeList", JSON.stringify(placeList));


  const colour = colours[placeList.length % 4];
  wheel.addSegment({
    fillStyle: colour,
    text: selectedPlace.name,
    strokeStyle: "white",
  });
  wheel.draw();
  
  // 當選項加入清單後，清除輸入匡內容，這樣就不用手動刪除
  document.querySelector(".input").value = "";
});


document.querySelector(".foodPlace_list").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.parentNode.remove();
      // 判斷裡面的物件target, 如果classList有remove的元素，我們會往回找，找出它的父元素，做出刪除的動作

      // 取得想要刪除選項的名稱
      const placeName = e.target.parentNode.innerText.trim();
      //刪除前，會先到localStorage取得所有在清單上的選項
      const placeList = JSON.parse(localStorage.getItem("placeList")) || [];

      const index = placeList.findIndex((place) => {
        return place.name === placeName;
      });

      wheel.deleteSegment(index + 1);
      wheel.draw()

      // 篩選，如果點到的名稱，跟loop裡面的一樣，就return false，就可以刪除
      const newPlaceList = placeList.filter((place) => {
        if (place.name === placeName) return false;
        return true;
        // return true 就會篩選出我們要的，並存放在新的陣列裡newPlaceList
      });
      // 最後把篩選過後的清單，存放回去
      localStorage.setItem("placeList", JSON.stringify(newPlaceList));
    }
  });


 // click spin the wheel 
document.querySelector(".draw").addEventListener("click", ()=> {
  document.querySelector(".wheel").style.display = "block";
  wheel.startAnimation();
});


