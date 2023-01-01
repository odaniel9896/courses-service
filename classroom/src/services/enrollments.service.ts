import { PrismaService } from 'src/database/prisma/prisma.service';

export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}
}
