import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class UserService {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async getUsers(pageNumber: number, pageSize: number) {
        return await this.prisma.user.findMany({
        skip: pageNumber * pageSize,
        take: pageSize,
        });
    }

    async getUserById(id: string) {
        return await this.prisma.user.findUnique({
        where: { id },
        include: { address: true },
        });
    }

    async createUser(name: string, email: string) {

        const check = await this.checkUserExists(email)
        if(check) throw new Error('User Already exist')
        return await this.prisma.user.create({
        data: { name, email },
        });
    }

    async getUsersCount() {
        return await this.prisma.user.count();
    }


    async checkUserExists(identifier: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { id: identifier },
                    { email: identifier }
                ]
            }
        });

        if (!user) {
            return false
        }

        return true;
    }
}