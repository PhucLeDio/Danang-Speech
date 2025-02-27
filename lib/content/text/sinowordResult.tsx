import hanviet from "assets/hanviet.json";
import "assets/css/styleSino.css"
import iconVoice from "data-base64:assets/icon-voice.png"
import logoITV from "data-base64:assets/logo-itv.png"
import backgroundImg from "data-base64:assets/background.png"
import HanVietPage from "~pages/HanViet";


export default function SinoResultPopup(props) {

  let hanvietWord = hanviet.words.find(word => word.hanviet === props.selectedText).meaning.split("/").join(", ")

  // return (
  //     <div id="result" style={{position: "absolute",top: props.mousePos.y, left: props.mousePos.x, backgroundImage: `url(${backgroundImg})`}} className="container-sino-itv">
  //         <div className="header-sino-itv">
  //             <div className="word-sino-itv">
  //                 <span>{props.selectedText}</span>
  //                 <div className="voice-sino-itv">
  //                     <img src={iconVoice} alt="Eror img"></img>
  //                 </div>
  //             </div>
  //             <div className="logo-sino-itv">
  //                 <img src={logoITV} alt="Error img" />
  //             </div>
  //         </div>
  //         <div className="label-sino-itv">Từ hán việt</div>            
  //         <div className="sino-itv">
  //             <div>{hanvietWord}</div>
  //         </div>

  //     </div>
  // );

  return (
    <div id="result" style={{ position: "absolute", top: props.mousePos.y, left: props.mousePos.x, height: '320px', width: '600px' }}>
      <HanVietPage name={props.selectedText} data={hanvietWord} />
    </div>
  );

}




