import React from "react";

export default function Pagination({
  totalPages = 1,
  params = {},
  onChangeParams,
  totalItems,
}) {
  const currentPage = Number(params.page) || 1;
  const maxButtons = 5;
  const visiblePages = [];
  const left = Math.max(1, currentPage - 2);
  const right = Math.min(totalPages, currentPage + 2);

  for (let page = left; page <= right; page += 1) {
    visiblePages.push(page);
  }

  if (left > 2) {
    visiblePages.unshift("start-ellipsis");
  }

  if (left > 1) {
    visiblePages.unshift(1);
  }

  if (right < totalPages - 1) {
    visiblePages.push("end-ellipsis");
  }

  if (right < totalPages) {
    visiblePages.push(totalPages);
  }

  const handleClick = (newPage) => {
    if (!newPage || newPage === currentPage || newPage < 1 || newPage > totalPages) return;

    if (typeof onChangeParams === "function") {
      onChangeParams((curParams) => ({
        ...curParams,
        page: newPage,
      }));
    }
  };

  return (
    <div className="w-full rounded-3xl border border-slate-700 bg-slate-950 p-4 shadow-xl shadow-slate-950/30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-sm text-slate-400">Phân trang người dùng</p>
          <p className="text-base font-semibold text-slate-100">
            Trang {currentPage} / {totalPages}
            {totalItems ? ` · Tổng ${totalItems} mục` : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleClick(1)}
            disabled={currentPage === 1}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            «
          </button>
          <button
            type="button"
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ‹
          </button>

          {visiblePages.map((item) => {
            if (item === "start-ellipsis" || item === "end-ellipsis") {
              return (
                <span key={item} className="px-3 py-2 text-sm text-slate-400">
                  …
                </span>
              );
            }

            const active = item === currentPage;
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleClick(item)}
                disabled={active}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-sky-500 text-white shadow-lg"
                    : "bg-slate-900 text-slate-200 hover:bg-slate-800"
                } ${active ? "cursor-default" : "hover:text-white"}`}
                aria-current={active ? "page" : undefined}
              >
                {item}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => handleClick(totalPages)}
            disabled={currentPage === totalPages}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
