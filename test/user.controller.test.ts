import 'reflect-metadata';
import { UserController } from '../src/modules/users/controllers/user.controller';
import { UserService } from '../src/modules/users/services/user.service';

jest.mock('../src/modules/users/services/user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    address: null
  };

  const mockUsers = [
    mockUser,
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      address: null
    }
  ];

  beforeEach(() => {
    userService = {
      getUsers: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      getUsersCount: jest.fn()
    } as any;

    userController = new UserController(userService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      jest.spyOn(userService, 'getUsers').mockResolvedValue(mockUsers);

      const result = await userController.getUsers(0, 10);

      expect(result).toEqual(mockUsers);
      expect(userService.getUsers).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('getUserById', () => {
    it('should return user data by id', async () => {
      jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);

      const result = await userController.getUserById('1');

      expect(result).toEqual(mockUser);
      expect(userService.getUserById).toHaveBeenCalledWith('1');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser);

      const result = await userController.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(userService.createUser).toHaveBeenCalledWith(
        createUserDto.name,
        createUserDto.email
      );
    });

    it('should throw error if user already exists', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      jest.spyOn(userService, 'createUser').mockRejectedValue(new Error('User Already exist'));

      await expect(userController.createUser(createUserDto)).rejects.toThrow('User Already exist');
    });
  });

  describe('getUsersCount', () => {
    it('should return total number of users', async () => {
      const count = 2;
      jest.spyOn(userService, 'getUsersCount').mockResolvedValue(count);

      const result = await userController.getUsersCount();

      expect(result).toEqual(count);
      expect(userService.getUsersCount).toHaveBeenCalled();
    });
  });
});