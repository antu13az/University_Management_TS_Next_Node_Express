import { RequestHandler } from 'express'
import { userService } from './user.service'
import { z } from 'zod'

const createUsers: RequestHandler = async (req, res, next) => {
  const createUserZodSchema = z.object({
    body: z.object({
      role: z.string({
        required_error: 'role is required',
      }),
      password: z.string().optional(),
    }),
  })

  await createUserZodSchema.parseAsync(req)

  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'Successfully created user',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUsers,
}
