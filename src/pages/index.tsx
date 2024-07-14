import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { FaFaceGrinSquint, FaFaceMeh, FaFaceFrown } from "react-icons/fa6";
import { IoIosWater } from "react-icons/io";
import { FaPoop } from "react-icons/fa6";

// import Plant0 from 
// const inter = Inter({ subsets: ["latin"] });

// const Phases = {
//   Phase0: "https://i.imgur.com/6SQLWb0.png",
//   Phase1: "https://i.imgur.com/tls1NEq.png",
//   Phase2: "https://i.imgur.com/Tkc4Pgl.png",
//   Phase3: "https://i.imgur.com/5vAZ9nV.png",
//   Phase4: "https://i.imgur.com/0a5lnss.png",
//   Phase5: "https://i.imgur.com/GVGWbNl.png",
//   Phase6: "https://i.imgur.com/uj5K8D1.png",
//   Phase7: "https://i.imgur.com/kdeNNh8.png",
// }

const Phases = [
  "https://i.imgur.com/6SQLWb0.png",
  "https://i.imgur.com/tls1NEq.png",
  "https://i.imgur.com/Tkc4Pgl.png",
  "https://i.imgur.com/5vAZ9nV.png",
  "https://i.imgur.com/0a5lnss.png",
  "https://i.imgur.com/GVGWbNl.png",
  "https://i.imgur.com/uj5K8D1.png",
  "https://i.imgur.com/kdeNNh8.png",
]

const Home = () => {

  const [currentPhase, setCurrentPhase] = useState<number>(7)
  const $audio = useRef<HTMLAudioElement>(null)

  const handleStartButton: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    console.log('currentTarget', { currentTarget })
    if ($audio.current) {
      // $audio.current.play()
      console.log("audio is playing")
      currentTarget.parentElement?.classList.add("!hidden")
    }
  }

  return (
    <>
      <main className="Home">
        <div className="Plant" style={{ backgroundImage: `url(${Phases[currentPhase]})` }}></div>
        <div className="plant-state">
          <FaFaceGrinSquint size={40} className="fill-emerald-500" />
          <FaFaceMeh size={40} className="fill-gray-500" />
          <FaFaceFrown size={40} className="fill-gray-500" />
        </div>
        <div className="actions">
          <button>
            <IoIosWater size={20} />
          </button>
          <button className="!bg-yellow-950">
            <FaPoop size={20} />
          </button>
        </div>
        <div className="overlay">
          <button onClick={handleStartButton}>START</button>
        </div>
      </main>
      <audio ref={$audio} loop controls className="hidden" src="https://jtnrmwagncsharindxpw.supabase.co/storage/v1/object/public/my-plant-storage/background_music.mp3"></audio>
    </>
  );
}


export default Home;