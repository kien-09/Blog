export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (cần +1 vì getMonth trả về giá trị từ 0 đến 11)
    const year = date.getFullYear(); // Lấy năm

    return `${day}/${month}/${year}`;
}