import bcrypt from "bcryptjs";
import {
  RegisterUserBody,
  UserPublicEntity,
  UserQuery,
} from "@courtdesk/shared";
import { AppError } from "@/utils/errors/AppError";
import { UpdateUserParams } from "./user.types";

import * as userRepository from "./user.repository";

export const getUsers = async (
  query: UserQuery,
): Promise<UserPublicEntity[]> => {
  return userRepository.find(query);
};

export const getUserById = async (
  userId: string,
): Promise<UserPublicEntity> => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

export const registerUser = async (
  payload: RegisterUserBody,
): Promise<UserPublicEntity> => {
  const { firstName, lastName, email, password } = payload;

  const emailExists = await userRepository.findByEmail(email);

  if (emailExists) {
    throw new AppError(409, "A user with this email already exists");
  }

  const nameExists = await userRepository.findByName(firstName, lastName);

  if (nameExists) {
    throw new AppError(
      409,
      `A user named ${firstName} ${lastName} already exits`,
    );
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { confirmPassword, ...rest } = payload;

  return userRepository.register({ ...rest, passwordHash });
};

export const updateUser = async (
  params: UpdateUserParams,
): Promise<UserPublicEntity> => {
  const { userId, payload } = params;

  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return userRepository.update(user, payload);
};

export const deleteUser = async (userId: string): Promise<UserPublicEntity> => {
  const user = await userRepository.remove(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};
