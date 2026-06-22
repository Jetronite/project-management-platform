export interface PaginationParams {
  page?: number;
  limit?: number;
}

export function getPaginationSettings(params: PaginationParams, defaultLimit = 20, maxLimit = 100) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(maxLimit, Math.max(1, params.limit || defaultLimit));
  const skip = (page - 1) * limit;

  return { take: limit, skip, page };
}

export function buildPaginatedResponse<T>(data: T[], total: number, page: number, limit: number) {
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}