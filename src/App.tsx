import { useCallback, useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiDownload, FiInstagram, FiRefreshCcw } from "react-icons/fi";

import { toPng } from "html-to-image";

function App() {
  const [quote, setQuote] = useState("");
  const [chara, setChara] = useState("");
  const [anime, setAnime] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setQuote("");
    setChara("");
    setAnime("");
    axios
      .get("https://animechan.xyz/api/random")
      .then((res) => {
        setQuote(res.data.quote);
        setChara(res.data.character + " - ");
        setAnime(res.data.anime);
        console.log(res.data);
        setErr(false);
      })
      .catch((error) => {
        console.log(error);
        setErr(true);
      });
  }

  //

  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true, backgroundColor: "#000000" })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "RandomAnimeQuotes.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="w-full justify-center font-extrabold sm:flex sm:justify-center">
      <div className="h-full sm:w-[500px] text-neutral-950 flex flex-col pb-6 gap-4">
        <div ref={ref} className="p-6">
          <div className="from-lime-600 to-lime-400 bg-gradient-to-tr max-w-full p-4 max-h-[500px] rounded-xl">
            {!err ? (
              <div>
                <p className="opacity-80">Random Anime Quotes :)</p>
                <h2 className="text-xl my-4">{quote}</h2>
                <span className="font-bold opacity-80">
                  {chara} {anime}
                </span>
              </div>
            ) : (
              <div className="h-20 w-full flex justify-center text-center items-center">
                (┬┬﹏┬┬)
                <br />
                We Have Limit From Database
              </div>
            )}
          </div>
        </div>
        <div className="fixed sm:static bottom-6 sm:bottom-0 w-full flex justify-center items-center gap-4 font-extrabold text-center px-6">
          {!err ? (
            <button
              onClick={onButtonClick}
              className="bg-lime-500 w-16 h-16 rounded-lg justify-center items-center flex flex-col"
            >
              <FiDownload size={25} />
            </button>
          ) : (
            <button
              disabled
              className="bg-lime-500 cursor-not-allowed w-16 h-16 rounded-lg justify-center items-center flex flex-col"
            >
              <FiDownload size={25} />
            </button>
          )}
          <a
            href="https://instagram.com/cwpslxck"
            className="bg-lime-500 w-16 h-16 rounded-lg justify-center items-center flex flex-col"
          >
            <FiInstagram size={25} />
          </a>
          <button
            className="bg-lime-500 w-16 h-16 rounded-lg justify-center items-center flex flex-col"
            onClick={() => fetchData()}
          >
            <FiRefreshCcw size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
