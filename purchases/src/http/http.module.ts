import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import path from 'node:path';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductsService } from 'src/services/products.service';
import { PurchasesResolve } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomersService } from 'src/services/cusrtomers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      cors: true,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    PurchasesResolve,
    PurchasesService,
    CustomersService,
    CustomersResolver,
  ],
})
export class HttpModule {}
