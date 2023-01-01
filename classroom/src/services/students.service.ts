import { PrismaService } from 'src/database/prisma/prisma.service';

export class StudentsService {
  constructor(private prisma: PrismaService) {}
}
