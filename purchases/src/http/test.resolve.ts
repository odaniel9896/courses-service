import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common/decorators';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Resolver('test')
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'hello world';
  }
}
