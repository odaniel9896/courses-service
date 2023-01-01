import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import path from 'node:path';
import { ProductsResolver } from './graphql/resolvers/products.resolve';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsService } from 'src/services/products.service';
import { PurchasesResolve } from './graphql/resolvers/purchases.resolve';
import { PurchasesService } from 'src/services/purchases.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    PurchasesResolve,
    PurchasesService,
  ],
})
export class HttpModule {}
