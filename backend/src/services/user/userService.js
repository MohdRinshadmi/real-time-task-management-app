import User from '../../models/userModel.js';

export const getUsersService = async () => {
  return await User.findAll();
};

export const getUserByIdService = async (id) => {
  return await User.findByPk(id);
};

export const createUserService = async (userData) => {
  return await User.create(userData);
};

export const updateUserService = async (id, updateData) => {
  return await User.update(updateData, { where: { userId: id } });
};

export const deleteUserService = async (id) => {
  return await User.destroy({ where: { userId: id } });
};
