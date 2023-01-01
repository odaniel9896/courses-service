import { PrismaService } from 'src/database/prisma/prisma.service';

export class CoursesService {
  constructor(private prisma: PrismaService) {}
}
