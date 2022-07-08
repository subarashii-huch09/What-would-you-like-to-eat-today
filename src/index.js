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
    navigator.geolocation.getCurrentPosition(function (position) {
      currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(currentPosition);
      map.setZoom(14);

      const autocomplete = new google.maps.places.Autocomplete(
        document.querySelector(".input"),
        {
          types: ["restaurant", "bakery", "cafe"],
          bounds: {
            east: currentPosition.lng + 0.001,
            west: currentPosition.lng - 0.001,
            south: currentPosition.lat - 0.001,
            north: currentPosition.lat + 0.001,
          },
          strictBounds: false,
        }
      );

      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();

        selectedPlace = {
          location: place.geometry.location,
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          phoneNumber: place.formatted_phone_number,
          rating: place.rating,
        };

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
      });
    });
  } else {
    alert("Your device does not support geolocation feature");
  }
 
}

const placeList = JSON.parse(localStorage.getItem("placeList")) || [];
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
  pins: true,
  animation: {
    type: "spinToStop",
    spins: 16,
    easing: "Power4.easeInOut",
    callbackFinished: function (segment) {
      document.querySelector(".wheel").style.display = "none";
      wheel.rotationAngle = 0;
      wheel.draw();
      window.alert(segment.text);
      const placeList =
        JSON.parse(localStorage.getItem("placeList")) || [];
      selectedPlace = placeList.find(function (place) {
        return place.name === segment.text;
      });

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
  },
});

document.querySelector(".add").addEventListener("click", function () {
  document.querySelector(".foodPlace_list").innerHTML += `
    <li class="list-group-item">${selectedPlace.name} 
    <button class="btn-close float-end remove"></button>
    </li>`;
  const placeList =
    JSON.parse(localStorage.getItem("placeList")) || [];

  const color = [placeList.length % 4];
  wheel.addSegment({
    fillStyle: color,
    text: selectedPlace.name,
    strokeStyle: "white",
  });
  wheel.draw();
  placeList.push(selectedPlace);
  localStorage.setItem("placeList", JSON.stringify(placeList));
  document.querySelector(".input").value = "";
});

document
  .querySelector(".foodPlace_list")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
      e.target.parentNode.remove();
      const placeName = e.target.parentNode.innerText.trim();
      const placeList =
        JSON.parse(localStorage.getItem("placeList")) || [];

      const index = placeList.findIndex((place) => {
        return place.name === placeName;
      });

      wheel.deleteSegment(index + 1);

      const newPlaceList = placeList.filter((place) => {
        if (place.name === placeName) return false;
        return true;
      });
      localStorage.setItem("placeList", JSON.stringify(newPlaceList));
    }
  });

document.querySelector(".draw").addEventListener("click", function () {
  document.querySelector(".wheel").style.display = "block";
  wheel.startAnimation();
});


