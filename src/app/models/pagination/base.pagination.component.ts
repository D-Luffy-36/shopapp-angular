
export abstract class BasePaginationComponent<T> {
    listData?: T; //  (generic)
    currentPage: number = 1;
    keyWord: string = "";
    totalPages: number = 0;
    itemsPerPage: number = 10;
    visiblePages: number[] = [];

    constructor() { }

    /**
   * Tạo mảng các trang hiển thị dựa trên trang hiện tại và tổng số trang.
   * @param currentPage Trang hiện tại
   * @param totalPages Tổng số trang
   * @param maxVisiblePages Số lượng trang hiển thị tối đa
   */

    /**
    * List<T> data to pagination
    */
    protected generateVisiblePageArray(currentPage: number, totalPages: number, maxVisiblePages: number = 5): number[] {
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(currentPage - halfVisiblePages, 1);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
    }

    /**
    * Hàm xử lý khi chuyển trang
    */
    onPageChange(event: Event, page: number): void {
        event.preventDefault();
        this.currentPage = page;
        this.loadData(this.keyWord, this.currentPage - 1, this.itemsPerPage);
    }

    /**
    * Sinh ra các trang hiển thị
    */
    protected generateVisiblePages(): void {
        if (this.totalPages > 0) {
            this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
        } else {
            this.visiblePages = [];
        }
    }



    /**
    * abstract method để load dữ liệu (cần được implement trong component con)
    */
    abstract loadData(keyWord: string, page: number, limit: number): void;

}