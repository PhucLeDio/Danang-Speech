import acronymDict from "assets/dict_acronym.json";
import "assets/css/styleAcronym.css"
import iconVoice from "data-base64:assets/icon-voice.png"
import logoITV from "data-base64:assets/logo-itv.png"
import backgroundImg from "data-base64:assets/background.png"

function searchAcronym(jsonData, selectedText) {
    return jsonData[selectedText];
}

export default function AcronymResultPopup(props) {

    let acronym = searchAcronym(acronymDict,props.selectedText)

    return (
        <div id="result" style={{position: "absolute",top: props.mousePos.y, left: props.mousePos.x, backgroundImage: `url(${backgroundImg})`}} className="container-acronym-itv">
            <div className="header-acronym-itv">
                <div className="word-acronym-itv">
                    <span>{props.selectedText}</span>
                    <div className="voice-acronym-itv">
                        <img src={iconVoice} alt="Error img"></img>
                    </div>
                </div>
                <div className="logo-acronym-itv">
                    <img src={logoITV} alt="Error img" />
                </div>
            </div>
            <div className="label-acronym-itv">Từ Viết Tắt</div>            
            <div className="acronym-itv">
                <div>{acronym}</div>
            </div>
           
        </div>
    );
}




