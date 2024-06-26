import { db, eq, like, Link, User } from "astro:db";

export const getUserByEmail = async (email:string) => {
  try {
    const res = await db.select().from(User).where(
      like(User.email, email)
    )
  
    if (res.length === 0) {
      return {
        success: true,
        data: null
      }
    }

    return {
      success: true,
      data: res[0]
    }
  } catch (e) {
    const error = e as Error
    return {
      success: false,
      error: error.message
    }
  }
}

export const getLinkUrl = async (code: string) => {
  try {
    const res = await db.select().from(Link).where(
      like(Link.code, code)
    )

    if (res.length === 0) {
      return {
        success: true,
        data: null
      }
    }

    return {
      success: true,
      data: res[0].url
    }
  } catch (e) {
    const error = e as Error
    return {
      success: false,
      error: error.message
    }
  } 
}

export const getUrlsFromUser = async (userId: number) => {
  try {
    const res = await db.select({
      url: Link.url,
      code: Link.code
    }).from(Link).where(
      eq(Link.userId, userId)
    )

    return {
      success: true,
      data: res
    }
  } catch (e) {
    const error = e as Error
    return {
      success: false,
      error: error.message
    }
  }
}
