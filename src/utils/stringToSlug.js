const slugify = (val) => {
    function slugify(val) {
        if (!val) return ''
        return String(val)
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd')
            .normalize('NFKD') // tách các ký tự có dấu thành ký tự cơ bản và dấu tách biệt
            .replace(/[\u0300-\u036f]/g, '') // loại bỏ tất cả các dấu, nằm trong khối \u03xx UNICODE.
            .trim() // cắt bỏ khoảng trắng đầu và cuối
            .toLowerCase() // chuyển đổi thành chữ thường
            .replace(/[^a-z0-9 -]/g, '') // loại bỏ các ký tự không phải là chữ cái hoặc số
            .replace(/\s+/g, '-') // thay thế các khoảng trắng bằng dấu gạch ngang
            .replace(/-+/g, '-') // loại bỏ các dấu gạch ngang liên tiếp
    }

    export default slugify
