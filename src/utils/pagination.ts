const getRealPage = (page: number, totalPages: number) => {
  return page === 0 ? 1 : page > totalPages ? totalPages : page;
};

const getTotalPages = (totalData: number, limit: number) => {
  return Math.ceil(totalData / limit);
};

const getOffset = (page: number, limit: number) => {
  return (page - 1) * limit;
};

export const getPagination = (total: number, limit: number, page: number) => {
  const totalPages = getTotalPages(total, limit);
  const realPage = getRealPage(page, totalPages);
  const offset = getOffset(realPage, limit);

  return { realPage, totalPages, offset };
};
