import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.service';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Purchase)
export class PurchasesResolve {
  constructor(
    private productsService: ProductsService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }
}
