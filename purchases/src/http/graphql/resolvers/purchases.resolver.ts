import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.service';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/cusrtomers.service';

@Resolver(() => Purchase)
export class PurchasesResolve {
  constructor(
    private productsService: ProductsService,
    private purchasesService: PurchasesService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.purchasesService.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
