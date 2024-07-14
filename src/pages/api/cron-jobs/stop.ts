// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";

type BodyProps = {
  taskName: string
}

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  try {

    const { taskName }: BodyProps = request.body
    const tasks = cron.getTasks();

    const array = Array.from(tasks.entries()).map(([key, value]) => {
      return {
        key, value
      }
    })

    const task = array.find(({ key }) => key === taskName)
    
    if(task){
    
      task.value.stop()
      
      response.status(203).json({ message: `Task named "${taskName}" was deleted!` });
      
    }else{
      response.status(400).json({ message: "Task not found" });
    }

  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "There has been an error in the server" });
  }
}

export default handler;