"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Paging = /** @class */ (function () {
    function Paging() {
    }
    Paging.prototype.pageSize = function () {
        return [10, 20, 50, 100, 500, 1000];
    };
    Paging.prototype.getPagination = function (totalRow, currentPage, pageSize) {
        var totalPages = Math.ceil(totalRow / pageSize);
        if (currentPage < 1) {
            currentPage = 1;
        }
        else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        var startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        }
        else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalRow - 1);
        var pages = Array.from(Array((endPage + 1) - startPage).keys()).map(function (i) { return startPage + i; });
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
    };
    return Paging;
}());
exports.Paging = Paging;
