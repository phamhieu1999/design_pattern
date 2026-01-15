# Tổng Quan và Phân Tích Các Design Pattern

## 📋 Mục Lục
1. [Builder Pattern](#1-builder-pattern)
2. [Singleton Pattern](#2-singleton-pattern)
3. [Facade Pattern](#3-facade-pattern)
4. [Observer Pattern](#4-observer-pattern)
5. [Prototype Pattern](#5-prototype-pattern)
6. [Proxy Pattern](#6-proxy-pattern)
7. [Strategy Pattern](#7-strategy-pattern)

---

## 1. Builder Pattern

### 📍 Vị trí
`design_pattern/Buider_Pattern/index.js`

### 🎯 Mục đích
Builder Pattern giúp xây dựng các đối tượng phức tạp từng bước một cách linh hoạt, cho phép tạo ra các biến thể khác nhau của cùng một đối tượng.

### 📊 Phân tích Implementation

**Cấu trúc:**
- **FifaOnlinePlayer**: Class đối tượng cần xây dựng (Product)
- **FifaOnlinePlayerBuilder**: Class Builder với các phương thức `with*()` để thiết lập từng thuộc tính
- **Method chaining**: Mỗi phương thức `with*()` trả về `this` để cho phép gọi liên tiếp

**Ưu điểm:**
- ✅ Tạo đối tượng linh hoạt, chỉ cần set các thuộc tính cần thiết
- ✅ Code dễ đọc với method chaining
- ✅ Tách biệt logic xây dựng khỏi đối tượng
- ✅ Dễ mở rộng thêm thuộc tính mới

**Nhược điểm:**
- ⚠️ Tăng số lượng code (cần tạo Builder class)
- ⚠️ Có thể phức tạp hơn cho đối tượng đơn giản

**Ví dụ sử dụng:**
```javascript
const cr7 = new FifaOnlinePlayerBuilder()
    .withName('Cr7')
    .withAge(39)
    .withNationality('Portugal')
    .withTeam('MU')
    .withPosition('ST')
    .withStats({goals:40, assists:2})
    .build()
```

**Khi nào sử dụng:**
- Khi đối tượng có nhiều thuộc tính (5+)
- Khi cần tạo nhiều biến thể khác nhau của cùng một đối tượng
- Khi muốn code dễ đọc và bảo trì

---

## 2. Singleton Pattern

### 📍 Vị trí
`design_pattern/Singleton_Pattern/index.js`

### 🎯 Mục đích
Đảm bảo một class chỉ có một instance duy nhất và cung cấp một điểm truy cập toàn cục đến instance đó.

### 📊 Phân tích Implementation

**Cấu trúc:**
- **RoundRobin**: Class Load Balancer sử dụng Singleton
- **Static instance**: Lưu trữ instance duy nhất trong `RoundRobin.instance`
- **Constructor check**: Kiểm tra nếu đã có instance thì trả về instance đó

**Ưu điểm:**
- ✅ Đảm bảo chỉ có một instance duy nhất
- ✅ Tiết kiệm tài nguyên (không tạo nhiều instance không cần thiết)
- ✅ Phù hợp cho các service như Database connection, Logger, Load Balancer

**Nhược điểm:**
- ⚠️ Khó test (global state)
- ⚠️ Vi phạm Single Responsibility Principle
- ⚠️ Có thể gây vấn đề trong môi trường đa luồng (cần thread-safe)

**Ví dụ sử dụng:**
```javascript
const loadBalancer = new RoundRobin()
const loadBalancer1 = new RoundRobin() // Trả về cùng instance
loadBalancer.addServer('Server 01')
// loadBalancer1 cũng có Server 01
```

**Khi nào sử dụng:**
- Database connections
- Logger
- Configuration managers
- Load balancers
- Cache managers

---

## 3. Facade Pattern

### 📍 Vị trí
`design_pattern/Facede_Pattern/index.js`

### 🎯 Mục đích
Cung cấp một interface đơn giản hóa cho một hệ thống phức tạp, che giấu sự phức tạp bên trong.

### 📊 Phân tích Implementation

**Cấu trúc:**
- **Discount, Shipping, Fees**: Các class phức tạp (Subsystems)
- **ShoppeFacadePatern**: Facade class đơn giản hóa việc tính toán giá
- **calc()**: Method duy nhất để tính giá cuối cùng, xử lý tất cả logic bên trong

**Ưu điểm:**
- ✅ Đơn giản hóa interface cho client
- ✅ Giảm coupling giữa client và subsystems
- ✅ Dễ bảo trì và mở rộng
- ✅ Che giấu sự phức tạp của hệ thống

**Nhược điểm:**
- ⚠️ Có thể trở thành "God object" nếu quá nhiều chức năng
- ⚠️ Thêm một lớp abstraction

**Ví dụ sử dụng:**
```javascript
const shoppe = new ShoppeFacadePatern()
const finalPrice = shoppe.calc(190000)
// Tự động áp dụng discount, fees, shipping
```

**Khi nào sử dụng:**
- Khi cần đơn giản hóa interface phức tạp
- Khi muốn tách biệt client code khỏi subsystems
- Khi cần tạo một entry point đơn giản cho hệ thống lớn

---

## 4. Observer Pattern

### 📍 Vị trí
`design_pattern/Observer_Pattern/index.js`

### 🎯 Mục đích
Định nghĩa một cơ chế phụ thuộc một-nhiều giữa các đối tượng, khi một đối tượng thay đổi trạng thái, tất cả các đối tượng phụ thuộc sẽ được thông báo.

### 📊 Phân tích Implementation

**Cấu trúc:**
- **Observer**: Class đối tượng quan sát (có method `updateStatus()`)
- **Subject**: Class quản lý danh sách observers và thông báo khi có thay đổi
- **notify()**: Method thông báo tất cả observers khi có sự kiện

**Ưu điểm:**
- ✅ Loose coupling giữa Subject và Observer
- ✅ Dễ thêm/bớt observers động
- ✅ Tuân thủ Open/Closed Principle
- ✅ Phù hợp cho event-driven systems

**Nhược điểm:**
- ⚠️ Có thể gây memory leak nếu không unsubscribe
- ⚠️ Thứ tự thông báo không được đảm bảo
- ⚠️ Có thể gây hiệu năng kém nếu có quá nhiều observers

**Ví dụ sử dụng:**
```javascript
const subject = new Subject()
const akali = new Observer('akali')
const katarina = new Observer('katarina')

subject.addObserver(akali)
subject.addObserver(katarina)

subject.notify({long:123, lat:234}) // Cả 2 observers đều nhận thông báo
```

**Khi nào sử dụng:**
- Event handling systems
- Model-View architectures (MVC, MVP)
- Real-time notifications
- Pub/Sub systems
- React state management

---

## 5. Prototype Pattern

### 📍 Vị trí
`design_pattern/Prototype_Pattern/index.js`

### 🎯 Mục đích
Tạo ra các đối tượng mới bằng cách sao chép (clone) từ một đối tượng mẫu (prototype) thay vì tạo mới từ đầu.

### 📊 Phân tích Implementation

**Cấu trúc:**
- **FifaOnlinePlayer**: Class có method `clone()` để tạo bản sao
- **clone()**: Tạo instance mới với các thuộc tính giống prototype
- **Prototype instance**: Đối tượng mẫu để clone

**Ưu điểm:**
- ✅ Giảm chi phí tạo đối tượng phức tạp
- ✅ Linh hoạt trong việc tạo đối tượng động
- ✅ Tránh việc subclassing
- ✅ Có thể clone deep hoặc shallow

**Nhược điểm:**
- ⚠️ Clone shallow có thể gây vấn đề với nested objects
- ⚠️ Cần implement clone method cho mỗi class
- ⚠️ Có thể phức tạp với circular references

**Ví dụ sử dụng:**
```javascript
const prototypePattern = new FifaOnlinePlayer('CR7','MU', 'ST',0)
const cr7 = prototypePattern.clone()
const neymar = prototypePattern.clone()
neymar.name = 'neymar' // Tùy chỉnh sau khi clone
```

**Lưu ý trong code:**
- Code hiện tại có sử dụng `JSON.parse(JSON.stringify())` cho deep clone nhưng không hoàn hảo
- Nên sử dụng thư viện như Lodash `cloneDeep()` hoặc implement deep clone đúng cách

**Khi nào sử dụng:**
- Khi việc tạo đối tượng tốn kém (database queries, network calls)
- Khi cần nhiều đối tượng tương tự nhau
- Khi muốn tránh subclassing
- Configuration objects

---

## 6. Proxy Pattern

### 📍 Vị trí
`design_pattern/Proxy_Pattern/index.js`

### 🎯 Mục đích
Cung cấp một đối tượng đại diện (proxy) để kiểm soát truy cập đến đối tượng gốc, thêm logic bổ sung trước/sau khi gọi.

### 📊 Phân tích Implementation

**Cấu trúc:**
- **Leader**: Đối tượng thực (Real Subject)
- **Scretery**: Proxy class đứng giữa Developer và Leader
- **receiveRequest()**: Method được proxy, có thể thêm logic kiểm tra, logging, caching

**Ưu điểm:**
- ✅ Kiểm soát truy cập đến đối tượng gốc
- ✅ Thêm chức năng mà không thay đổi đối tượng gốc
- ✅ Lazy loading
- ✅ Caching, logging, validation

**Nhược điểm:**
- ⚠️ Tăng độ phức tạp
- ⚠️ Có thể gây chậm nếu có nhiều lớp proxy
- ⚠️ Response time có thể tăng do thêm logic

**Ví dụ sử dụng:**
```javascript
const dev = new Developer('I want to upto 100k')
dev.applyFor(new Scretery()) // Scretery là proxy của Leader
```

**Các loại Proxy:**
- **Virtual Proxy**: Lazy loading
- **Protection Proxy**: Kiểm soát truy cập
- **Remote Proxy**: Đại diện cho đối tượng ở xa
- **Caching Proxy**: Cache kết quả

**Khi nào sử dụng:**
- Lazy loading
- Access control
- Logging và monitoring
- Caching
- Validation

---

## 7. Strategy Pattern

### 📍 Vị trí
`design_pattern/Strategy_Pattern/with-strategy-pattern.js` và `without-strategy-pattern.js`

### 🎯 Mục đích
Định nghĩa một họ các thuật toán, đóng gói chúng và làm cho chúng có thể hoán đổi cho nhau. Strategy cho phép thuật toán thay đổi độc lập với client sử dụng nó.

### 📊 Phân tích Implementation

**Cấu trúc:**
- **Các strategy functions**: `preOrderPrice()`, `promotionPrice()`, `blackFridayPrice()`, `defaultPrice()`
- **getPriceStrategies object**: Chứa mapping giữa type và strategy function
- **getPrice()**: Context function sử dụng strategy dựa trên type

**So sánh với code không dùng Strategy:**

**❌ Without Strategy (Bad):**
```javascript
function getPrice(originalPrice, typePromotion) {
    if (typePromotion === "preOrder") {
        return originalPrice * 0.2;
    }
    if (typePromotion === "promotion") {
        return originalPrice <= 200 ? originalPrice * 0.1 : originalPrice - 30;
    }
    // ... nhiều if-else
}
```
- Vi phạm Open/Closed Principle
- Khó mở rộng (phải sửa function mỗi khi thêm strategy mới)
- Khó test từng strategy riêng lẻ

**✅ With Strategy (Good):**
```javascript
const getPriceStrategies = {
    preOrder: preOrderPrice,
    promotion: promotionPrice,
    blackFriday: blackFridayPrice,
    default: defaultPrice,
}

function getPrice(originalPrice, typePromotion) {
    return getPriceStrategies[typePromotion](originalPrice);
}
```
- Tuân thủ Open/Closed Principle
- Dễ mở rộng (chỉ cần thêm strategy mới vào object)
- Dễ test từng strategy
- Code sạch hơn, dễ đọc hơn

**Ưu điểm:**
- ✅ Tách biệt các thuật toán
- ✅ Dễ thêm/sửa/xóa strategy
- ✅ Tuân thủ SOLID principles
- ✅ Dễ test từng strategy

**Nhược điểm:**
- ⚠️ Tăng số lượng classes/functions
- ⚠️ Client phải biết các strategy khác nhau

**Khi nào sử dụng:**
- Khi có nhiều cách để thực hiện một task
- Khi muốn tránh if-else hoặc switch-case phức tạp
- Khi muốn chọn thuật toán runtime
- Payment processing (credit card, PayPal, etc.)
- Sorting algorithms
- Compression algorithms

---

## 📈 So Sánh Tổng Quan

| Pattern | Loại | Mục đích chính | Độ phức tạp |
|---------|------|----------------|-------------|
| **Builder** | Creational | Xây dựng đối tượng phức tạp | Trung bình |
| **Singleton** | Creational | Đảm bảo 1 instance duy nhất | Thấp |
| **Prototype** | Creational | Clone đối tượng | Thấp-Trung bình |
| **Facade** | Structural | Đơn giản hóa interface | Thấp |
| **Proxy** | Structural | Kiểm soát truy cập | Trung bình |
| **Observer** | Behavioral | Thông báo thay đổi | Trung bình |
| **Strategy** | Behavioral | Hoán đổi thuật toán | Thấp-Trung bình |

---

## 🎓 Kết Luận

Các design pattern trong project này đều được implement đúng cách và phù hợp với các use case cụ thể:

1. **Builder Pattern**: Phù hợp cho việc tạo đối tượng phức tạp như Player
2. **Singleton Pattern**: Tốt cho Load Balancer, đảm bảo chỉ có 1 instance
3. **Facade Pattern**: Đơn giản hóa việc tính giá trong e-commerce
4. **Observer Pattern**: Phù hợp cho hệ thống thông báo real-time
5. **Prototype Pattern**: Hữu ích khi cần clone nhiều đối tượng tương tự
6. **Proxy Pattern**: Kiểm soát truy cập và thêm logic bổ sung
7. **Strategy Pattern**: Giải quyết vấn đề if-else phức tạp trong pricing

Tất cả các pattern đều tuân thủ các nguyên tắc SOLID và giúp code dễ đọc, dễ bảo trì, dễ mở rộng hơn.
