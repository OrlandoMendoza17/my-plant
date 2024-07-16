import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { FaFaceGrinSquint, FaFaceMeh, FaFaceFrown } from "react-icons/fa6";
import { IoIosWater } from "react-icons/io";
import { FaPoop } from "react-icons/fa6";
import useAuth from "@/hooks/useAuth";
import { MdOutlineLogout } from "react-icons/md";
import { eraseCookie } from "@/utils/cookies";
import { useRouter } from "next/router";
import PlantService from "@/services/plants";
import { Plant } from "@/api/schemas/Plants";
import { FaUserCircle } from "react-icons/fa";

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

const base_url = "https://jtnrmwagncsharindxpw.supabase.co/storage/v1/object/public/my-plant-storage"

const Phases = [
  `${base_url}/0.png`,
  `${base_url}/1.png`,
  `${base_url}/2.png`,
  `${base_url}/3.png`,
  `${base_url}/4.png`,
  `${base_url}/5.png`,
  `${base_url}/6.png`,
  `${base_url}/7.png`,
]

const Home = () => {

  const router = useRouter()

  const [currentPhase, setCurrentPhase] = useState<number>(7)
  const $audio = useRef<HTMLAudioElement>(null)

  const [renderPage, credentials] = useAuth()

  const { user } = credentials

  const [plant, setPlant] = useState<Plant>({
    plantId: "",
    currentPhase: 0,
    ants: false,
    bees: false,
    userId: "",
    state: "GOOD",
    createdAt: "",
  })

  useEffect(() => {
    (async () => {
      if (renderPage) {

        const { userId } = credentials.user
        const service = new PlantService()

        const plant = await service.findOne(userId, "userId")
        setPlant(plant)
      }
    })()
  }, [renderPage])

  const handleStartButton: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    console.log('currentTarget', { currentTarget })
    if ($audio.current) {
      $audio.current.play()
      console.log("audio is playing")
      currentTarget.parentElement?.classList.add("!hidden")
    }
  }

  const handleLogOut: MouseEventHandler<HTMLButtonElement> = () => {
    eraseCookie("login")
    router.push("/sign-in")
  }

  return (
    (user && plant) ?
      <>
        <main className="Home">
          <div className="Plant" style={{ backgroundImage: `url(${Phases[plant.currentPhase]})` }}></div>

          <div className="user-name">
          <FaUserCircle size={20} /> <span>{user.name}</span>
          </div>

          <div className="actions">
            {/* <button>
              <IoIosWater size={20} />
            </button> */}
            <button className="!bg-yellow-950">
              <FaPoop size={20} />
            </button>
            <button onClick={handleLogOut} className="!bg-red-500">
              <MdOutlineLogout size={20} />
            </button>
          </div>
          
          <img className="plant" src={Phases[plant.currentPhase]} alt="" />
          
          <img className="absolute" width={30} height={30} src={`${base_url}/bachaco.webp`} alt="" />

          <div className="plant-state">
            <FaFaceGrinSquint size={40} className="fill-emerald-500" />
            <FaFaceMeh size={40} className="fill-gray-500" />
            <FaFaceFrown size={40} className="fill-gray-500" />
          </div>

          <div className="overlay">
            <button onClick={handleStartButton}>START</button>
          </div>

        </main>
        <audio ref={$audio} loop controls className="hidden" src={`${base_url}/background_music.mp3`}></audio>
      </>
      :
      <div></div>
  );
}


export default Home;