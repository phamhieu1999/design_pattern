/**
 * Giảm giá khi người dùng đặt trước một sản phẩm của VINFAST 
 * @param {*} originalPrice
 * @returns
 */
function preOrderPrice(originalPrice) {
    return originalPrice * 0.2;
}
/**
 * Tiếp tục thêm tính năng khuyễn mãi thông thường, ví dụ Nếu giá gốc < 200 thì giảm 10%, còn > thì giảm tối đa 30
 * @param {*} originalPrice
 * @returns
 */
function promotionPrice(originalPrice) {
    return originalPrice <= 200 ?  originalPrice * 0.1 : originalPrice - 30;
}
/**
 * Đến ngày blackFriday promotion
 * @param {*} originalPrice
 * @returns
 */
function blackFridayPrice(originalPrice) {
    return originalPrice <= 200 ?  originalPrice * 0.2 : originalPrice - 50;
}
/**
 * Giá mặc định
 * @param {*} originalPrice
 * @returns
 */
function defaultPrice(originalPrice) {
    return originalPrice;
}

const getPriceStrategies = {
    preOrder: preOrderPrice,
    promotion: promotionPrice,
    blackFriday: blackFridayPrice,
    default: defaultPrice,
}

// Kết hợp trạng thái với chiến lược chiết khấu, hàm giá có thể được tối ưu hóa như sau:
function getPrice(originalPrice, typePromotion) {
    return getPriceStrategies[typePromotion](originalPrice);
}

console.log('-->>>',  getPrice(200,  'blackFriday'))