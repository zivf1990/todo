// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css";
// import { useStateRef } from "../hooks/useStateRef";

// function AlbumPage() {
//   const { albumId } = useParams();
//   const [album, setAlbum] = useState([]);
//   const albumRef = useRef([]);
//   const [picId, setPicId, picRef] = useStateRef((albumId - 1) * 50 + 1);

//   useEffect(() => {
//     // const localAlbum = JSON.parse(localStorage.getItem('Album' + albumId));
//     // console.log('localAlbum.length', localAlbum.length)
//     // if(localAlbum.length > 0){
//     //   console.log('ssss', localAlbum.length)
//     //   picRef.current = localAlbum.length;
//     // }
//     getPics();
//     return(
//       () => {
//         console.log(album)
//         localStorage.setItem('Album' + albumId, JSON.stringify(albumRef.current))}
//     )
//   }, []);

//   const getPics = async (counter = 8) => {
//     const limit = 50 * albumId;
//     console.log("getPics() ", picRef.current);

//     //Fetch 8 requests by default.
//     for (let i = 0; i < counter && picRef.current <= limit; i++) {
//       try {
//         const res = await fetch(
//           `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&id=${picRef.current}`
//         );
//         if (!res.ok) throw new Error(res.message);
//         const data = await res.json();
//         const pic = await data[0];
//         console.log(data[0]);
//         //Increment the picture id counter by 1.
//         await setPicId(picRef.current + 1);
//         setAlbum((prevPics) => [...prevPics, pic]);
//         albumRef.current.push(pic) ;
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   };



//   return (
//     <>
//       <div className="main-content">
//         <h1>Album {albumId}</h1>
//         <Splide className="splide"
//           // onDrag={() => {
//           //   getPics(4);
//           // }}
//           onMoved={() => {
//             getPics(4);
//           }}
//           aria-labelledby="carousel-heading"
//           options={{
//             perPage: 4,
//             arrows: true,
//             pagination: false,
//             drag: "free",
//             gap: "5rem",
//           }}
//         >
//           {album &&
//             album.map((pic) => (
//               <SplideSlide
//                 key={Math.random() * Number.MAX_SAFE_INTEGER}
//                 className="splide-item"
//               >
//                 <img
//                   key={Math.random()}
//                   className="album-pic"
//                   src={pic.thumbnailUrl}
//                   alt=""
//                 />
//                 <p>{pic.title}</p>
//               </SplideSlide>
//             ))}
//         </Splide>
//       </div>
//     </>
//   );
// }

// export default AlbumPage;

































import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useStateRef } from "../hooks/useStateRef";
import { setLocalStorage } from "../js/localsessionStorage";

function AlbumPage() {
  const { albumId } = useParams();
  const [album, setAlbum, albumRef] = useStateRef([]);
  const [picId, setPicId, picRef] = useStateRef((albumId - 1) * 50 + 1);
  const albumArr = [];


  useEffect(() => {

    window.onbeforeunload = toLocalStorage;
    const localAlbums = (JSON.parse(localStorage.getItem(`Album${albumId}`)));

    if (localAlbums !== null && localAlbums.length > 0){
      setAlbum(localAlbums)
      setPicId(((albumId - 1) * 50 + 1) + localAlbums.length)
    }
    getPics();
    return(
      () => {
        toLocalStorage()}
    )
  }, []);

  function toLocalStorage() {
    setLocalStorage('Album' + albumId , albumArr);
  }


  const getPics = async (counter = 8) => {
    const limit = 50 * albumId;

    for (let i = 0; i < counter && picRef.current <= limit; i++) {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&id=${picRef.current}`
        );
        if (!res.ok) throw new Error(res.message);
        const data = await res.json();
        const pic = await data[0];
        console.log(data[0]);
        //Increment the picture id counter by 1.
        await setPicId(picRef.current + 1);
        
        albumArr.push(pic)
        setAlbum((prevPics) => [...prevPics, pic]);
       
      } catch (e) {
        console.log(e);
      }
    }
  };



  return (
    <>
      <div className="main-content">
        <h1>Album {albumId}</h1>
        <Splide className="splide"
          // onDrag={() => {
          //   getPics(4);
          // }}
          onMoved={() => {
            getPics(4);
          }}
          aria-labelledby="carousel-heading"
          options={{
            perPage: 4,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {album &&
            album.map((pic) => (
              <SplideSlide
                key={Math.random() * Number.MAX_SAFE_INTEGER}
                className="splide-item"
              >
                <img
                  key={Math.random()}
                  className="album-pic"
                  src={pic.thumbnailUrl}
                  alt=""
                />
                <p>{pic.title}</p>
              </SplideSlide>
            ))}
        </Splide>
      </div>
    </>
  );
}

export default AlbumPage;

