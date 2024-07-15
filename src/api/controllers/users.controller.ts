import supabase from "@/supabase";
import { CreateUser, UpdateUser, UserEmail, UserId } from "../schemas/User";
import createHttpError from "http-errors";

class UsersController {
  getAll = async () => {
    const { data: Users, error } = await supabase
      .from('Users')
      .select('*')
    return Users;
  }

  findOne = async (userId: UserId, field: "userId" | "email") => {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq(field, userId)

    if (data?.length) {
      return data
    } else {
      console.log('error', error)
      throw createHttpError.NotFound("User not found!")
    }
  }

  create = async (userInfo: CreateUser) => {

    const { data, error } = await supabase.from('Users')
      .insert([userInfo])
      .select()

    if (error) {
      console.log('error', error)
      throw createHttpError.BadRequest(error.message)
    }

    return data;
  }

  update = async (userInfo: UpdateUser) => {
    const { userId, ...rest } = userInfo
    if (userId) {

      const foundUser = await this.findOne(userId, "userId")
      console.log('foundUser', foundUser)

      if (foundUser) {
        const { data, error } = await supabase.from("Users")
          .update(rest)
          .eq("userId", userId)
          .select()

        console.log('data', data)

        if (error) {
          console.log('error', error)
          throw createHttpError.BadRequest(error.message)
        }

        return data;
      } else {
        throw createHttpError.NotFound("User Not Found!")
      }
    }

  }

  delete = async (userId: UserId) => {
    const { data, error } = await supabase.from("Users")
      .delete()
      .eq("userId", userId)

    if (error) {
      console.log('error', error)
      throw createHttpError.BadRequest(error.message)
    }

    return data;
  }
}

export default UsersController;