import { CSSProperties, MouseEventHandler, useEffect, useRef, useState } from "react";
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

type Fases = {
  image: string,
  ants: CSSProperties[],
}

// CSSProperties

const fase = 6

const imageSize = 9
const imageHalfSize = `${imageSize / 2}vh`

const fases: Fases[] = [
  {
    image: "0.png",
    ants: [
      {
        left: `calc(50vw - ${imageHalfSize} + 1vh)`,
        bottom: `calc(5vh - ${imageHalfSize})`,
      },
    ],
  },
  {
    image: "1.png",
    ants: [
      {
        left: `calc(50vw - ${imageHalfSize} - 1vh)`,
        bottom: `calc(5vh - ${imageHalfSize})`,
      },
    ],
  },
  {
    image: "2.png",
    ants: [
      {
        left: `calc(50vw - ${imageHalfSize} + 5vh)`,
        bottom: `calc(7vh - ${imageHalfSize})`,
      },
    ],
  },
  {
    image: "3.png",
    ants: [
      {
        left: `calc(50vw - ${imageHalfSize} - 1vh)`,
        bottom: `calc(26vh - ${imageHalfSize})`,
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 9vh)`,
        bottom: `calc(7vh - ${imageHalfSize})`,
      },
    ],
  },
  {
    image: "4.png",
    ants: [
      {
        left: `calc(50vw - ${imageHalfSize} - 1vh)`,
        bottom: `calc(26vh - ${imageHalfSize})`,
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 9vh)`,
        bottom: `calc(7vh - ${imageHalfSize})`,
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 2vh)`,
        bottom: `calc(35vh - ${imageHalfSize})`,
        transform: "rotateY(180deg)"
      },
    ],
  },
  {
    image: "5.png",
    ants: [
      {
        left: `calc(50vw - ${imageHalfSize} - 1vh)`,
        bottom: `calc(30vh - ${imageHalfSize})`,
        transform: "rotate(20deg)"
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 9vh)`,
        bottom: `calc(7vh - ${imageHalfSize})`,
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 6vh)`,
        bottom: `calc(35vh - ${imageHalfSize})`,
        transform: "rotateY(180deg)"
      },
    ],
  },
  {
    image: "6.png",
    ants: [
      {
        left: `calc(50vw - ${imageHalfSize} - 4vh)`,
        bottom: `calc(40vh - ${imageHalfSize})`,
        transform: "rotate(20deg)"
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 9vh)`,
        bottom: `calc(7vh - ${imageHalfSize})`,
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 7vh)`,
        bottom: `calc(30vh - ${imageHalfSize})`,
        transform: "rotateY(180deg) rotate(20deg)"
      },
    ],
  },
  {
    image: "7.png",
    ants: [
      {
        left: `calc(50vw - ${imageHalfSize} + 9vh)`,
        bottom: `calc(7vh - ${imageHalfSize})`,
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 1vh)`,
        bottom: `calc(38vh - ${imageHalfSize})`,
        transform: "rotateY(180deg) rotate(-30deg)"
      },
      {
        left: `calc(50vw - ${imageHalfSize} + 0vh)`,
        bottom: `calc(58vh - ${imageHalfSize})`,
        transform: "rotate(-40deg)"
      },
    ],
  },
]

const Home = () => {

  const router = useRouter()

  const $image = useRef<HTMLImageElement>(null)
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
        setPlant({
          ...plant,
          currentPhase: fase,
        })
      }
    })()
  }, [renderPage])

  const handleStartButton: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    console.log('currentTarget', { currentTarget })
    if ($audio.current) {
      // $audio.current.play()
      console.log("audio is playing")
      currentTarget.parentElement?.classList.add("!hidden")
    }
  }

  const handleLogOut: MouseEventHandler<HTMLButtonElement> = () => {
    eraseCookie("login")
    router.push("/sign-in")
  }

  const { image, ants } = fases[plant.currentPhase]

  return (
    (user && plant) ?
      <>
        <main className="Home">

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

          <img className="plant" ref={$image} src={`${base_url}/${image}`} alt="" />

          {
            $image.current &&
            ants.map((styles) =>
              <img
                className="bachaco"
                // width={40}
                // height={40}
                // style={{
                //   left: `${($image.current as HTMLImageElement).width * left}%`,
                //   bottom: `${($image.current as HTMLImageElement).height * bottom}%`,
                // }}
                style={styles}
                onResize={() => {
                  console.log("Hola")
                }}
                // src={`${base_url}/bachaco.webp`}
                src={`https://images.vexels.com/media/users/3/312193/isolated/preview/27837f45221dd465567ad49ac507bc51-hormiga-trabajadora.png`}
                onClick={() => alert("Hello")}
              />
            )
          }

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