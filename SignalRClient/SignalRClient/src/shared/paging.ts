export class Paging {
    pageSize() {
        return [10, 20, 50, 100, 500, 1000];
    }

    getPagination(totalRow: number, currentPage: number, pageSize: number) {
        let totalPages = Math.ceil(totalRow / pageSize);
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalRow - 1);
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        var objPager = {
            totalItems: totalRow,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };

        return objPager;
    }
}