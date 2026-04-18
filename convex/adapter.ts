import { MutationAdapter, QueryAdapter } from 'payload-convex-adapter/convex'
import { createConvexSafeAdapterService } from 'payload-convex-adapter/safe-service'
import { payloadConvexConfig } from '../payload-convex-config'

const service = createConvexSafeAdapterService({
  ...payloadConvexConfig,
  payload: {} as any,
})

const queryAdapter = QueryAdapter({})
const mutationAdapter = MutationAdapter({})

export const {
  getById,
  collectionQuery,
  collectionCountQuery,
  collectionWhereQuery,
  collectionWhereOrderQuery,
  collectionWhereLimitQuery,
  collectionWherePaginateQuery,
  collectionWhereOrderLimitQuery,
  collectionWhereOrderPaginateQuery,
  collectionOrderQuery,
  collectionOrderLimitQuery,
  collectionOrderPaginateQuery,
  collectionLimitQuery,
} = {
  getById: queryAdapter.getById.convex({ service: service as any }),
  collectionQuery: queryAdapter.collectionQuery.convex({ service: service as any }),
  collectionCountQuery: queryAdapter.collectionCountQuery.convex({ service: service as any }),
  collectionWhereQuery: queryAdapter.collectionWhereQuery.convex({ service: service as any }),
  collectionWhereOrderQuery: queryAdapter.collectionWhereOrderQuery.convex({ service: service as any }),
  collectionWhereLimitQuery: queryAdapter.collectionWhereLimitQuery.convex({ service: service as any }),
  collectionWherePaginateQuery: queryAdapter.collectionWherePaginateQuery.convex({ service: service as any }),
  collectionWhereOrderLimitQuery: queryAdapter.collectionWhereOrderLimitQuery.convex({ service: service as any }),
  collectionWhereOrderPaginateQuery: queryAdapter.collectionWhereOrderPaginateQuery.convex({ service: service as any }),
  collectionOrderQuery: queryAdapter.collectionOrderQuery.convex({ service: service as any }),
  collectionOrderLimitQuery: queryAdapter.collectionOrderLimitQuery.convex({ service: service as any }),
  collectionOrderPaginateQuery: queryAdapter.collectionOrderPaginateQuery.convex({ service: service as any }),
  collectionLimitQuery: queryAdapter.collectionLimitQuery.convex({ service: service as any }),
}

export const {
  insert,
  getByIdMutation,
  patch,
  replace,
  deleteOp,
  upsert,
  updateManyWhere,
  deleteManyWhere,
  increment,
  transactional,
} = {
  insert: mutationAdapter.insert.convex({ service: service as any }),
  getByIdMutation: mutationAdapter.getByIdMutation.convex({ service: service as any }),
  patch: mutationAdapter.patch.convex({ service: service as any }),
  replace: mutationAdapter.replace.convex({ service: service as any }),
  deleteOp: mutationAdapter.deleteOp.convex({ service: service as any }),
  upsert: mutationAdapter.upsert.convex({ service: service as any }),
  updateManyWhere: mutationAdapter.updateManyWhere.convex({ service: service as any }),
  deleteManyWhere: mutationAdapter.deleteManyWhere.convex({ service: service as any }),
  increment: mutationAdapter.increment.convex({ service: service as any }),
  transactional: mutationAdapter.transactional.convex({ service: service as any }),
}