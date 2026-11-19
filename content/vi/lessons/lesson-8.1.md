# Bài 8.1: Lập kế hoạch và thực hiện rà soát QA website

### Mục tiêu bài học

Kết thúc bài học này, bạn sẽ có thể:

- Lập kế hoạch một đợt rà soát đảm bảo chất lượng trên toàn bộ website đã triển khai.
- Chọn các bước kiểm tra dựa trên yêu cầu, các component dùng chung và hành trình người dùng.
- Phân biệt các phát hiện về chức năng, hình ảnh, nội dung và khả năng tiếp cận.
- Ghi lại các lỗi mà người khác có thể tái hiện, với mức ưu tiên phù hợp.
- Chuẩn bị các nhiệm vụ sửa lỗi có giới hạn rõ ràng mà không thiết kế lại website.

**Điều kiện tiên quyết:** Hoàn thành Học phần 7 và đã ghi nhận quyết định duyệt của học phần đó.

**Tài liệu cần chuẩn bị:** Các yêu cầu đã được phê duyệt, IA (kiến trúc thông tin), thiết kế, nội dung, website đã triển khai, hồ sơ chấp nhận và các phát hiện còn tồn đọng.

## 1. Chuyển từ từng bài nộp riêng lẻ sang toàn bộ website

Các học phần trước đã rà soát từng trang và từng tính năng một. **Đảm bảo chất lượng (QA)** là một đợt rà soát có kế hoạch nhằm kiểm tra xem toàn bộ website có đáp ứng yêu cầu hay không. Một đợt rà soát QA trên toàn website kiểm tra xem tất cả các phần có hoạt động cùng nhau trong phạm vi đã thống nhất hay không.

Nó có thể phát hiện những vấn đề như:

- Các trang khác nhau dùng style chung một cách không nhất quán.
- Thanh điều hướng hoạt động khác nhau trên các loại trang khác nhau.
- Một bản sửa dùng chung gây ra vấn đề ở chỗ khác.
- Nội dung tạm thời bị bỏ quên trên một trang ít khi được truy cập.
- Một hành trình người dùng bị hỏng giữa các trang, dù mỗi trang tự nó đều hoạt động.

**QA cung cấp bằng chứng về phiên bản mà bạn đã rà soát. Nó không thể chứng minh website không có lỗi nào.**

Đợt rà soát này không phải là sự phê duyệt để deploy, và cũng không phải cơ hội để thay đổi thiết kế đã được phê duyệt.

## 2. Ghi lại những gì bạn đang rà soát

Hãy ghi lại điểm xuất phát trước khi kiểm thử.

| Mục | Cần ghi gì |
|---|---|
| Phạm vi | Các trang, tính năng và hành trình được bao gồm |
| Phần triển khai | Branch, commit và mọi thay đổi chưa commit có liên quan |
| Môi trường | Máy tính của bạn hoặc môi trường kiểm thử đã được phê duyệt |
| Tài liệu tham chiếu | Các phiên bản đã được phê duyệt có áp dụng |
| Trình duyệt | Các trình duyệt bắt buộc và phiên bản của chúng |
| Khung nhìn | Các kích thước rà soát bắt buộc |
| Dữ liệu kiểm thử | Thông tin tổng hợp (synthetic) đã được phê duyệt |
| Giới hạn đã biết | Cấu hình, tài nguyên còn thiếu hoặc các bước kiểm tra không thể thực hiện |

Mọi kết quả đều phải truy ngược được về phiên bản mà bạn đã rà soát.

Nếu mã thay đổi trong quá trình QA, hãy ghi lại thay đổi đó và xác định những kết quả trước đó nào cần được lặp lại.

## 3. Xây dựng kế hoạch QA từ các yêu cầu

Hãy bắt đầu từ các sổ đăng ký bạn đã có: sổ đăng ký hoàn thành trang từ Bài 6.4, sổ đăng ký tính năng từ Bài 7.4 và bảng kê điều hướng từ Bài 6.3.

Đừng bắt đầu từ một danh sách kiểm tra chung chung tìm thấy ở nơi khác rồi mặc định rằng nó bao quát dự án này.

Hãy tổ chức đợt rà soát thành các nhóm:

| Nhóm | Ví dụ về bước kiểm tra |
|---|---|
| **Cấu trúc và nội dung** | Các trang bắt buộc, thứ tự phần, câu chữ và tài nguyên đã được phê duyệt |
| **Trình bày hình ảnh** | Kiểu chữ, màu sắc, khoảng cách và các component dùng chung |
| **Điều hướng** | Đích đến, chỉ báo trang hiện tại và các điểm vào |
| **Hành vi responsive** | Các độ rộng bắt buộc, bố cục ở giữa các độ rộng đó và việc ngắt dòng văn bản |
| **Tương tác** | Nút điều khiển, kiểm tra dữ liệu, thông báo và khôi phục |
| **Khả năng tiếp cận** | Sử dụng bàn phím, nhãn, tiêu điểm và kiểm tra nội dung |
| **Hành vi kỹ thuật** | Các route mở trực tiếp được, các tệp không tải được và lỗi trong console |
| **Hành trình người dùng** | Các chuỗi thao tác đã được phê duyệt qua các trang và tính năng |

Một số yêu cầu cần đến chuyên gia, như một đợt rà soát đầy đủ về khả năng tiếp cận, bảo mật hoặc pháp lý. Hãy xác định riêng những yêu cầu này. Một đợt rà soát QA chung không bao giờ được mô tả như một cuộc kiểm định chuyên sâu hoàn chỉnh.

## 4. Quyết định những gì cần kiểm tra trên mọi trang

Một số bước kiểm tra phải được làm trên mọi trang. Những bước khác chỉ cần kiểm tra ở nơi một đoạn mã dùng chung được triển khai.

| Loại kiểm tra | Cách bao quát |
|---|---|
| Tiêu đề trang, heading và nội dung chữ đã được phê duyệt | Kiểm tra mọi trang được nộp |
| Hình ảnh và đích đến riêng của từng trang | Kiểm tra mọi trang có chúng |
| Hành vi của component dùng chung | Kiểm tra mã của nó và một tập đại diện các chỗ nó được dùng |
| Một trang có bố cục riêng độc nhất | Kiểm tra trực tiếp trang đó |
| Một thay đổi về style dùng chung | Kiểm tra lại những chỗ nó ảnh hưởng |
| Một hành trình quan trọng đã được phê duyệt | Kiểm thử toàn bộ chuỗi thao tác |

**Lấy mẫu** (sampling) nghĩa là kiểm tra một tập chọn lọc mang tính đại diện thay vì mọi trường hợp. Cách này chỉ phù hợp khi tập chọn lọc thực sự hỗ trợ yêu cầu bạn đang đánh giá.

Ví dụ, kiểm tra header dùng chung một lần có thể hỗ trợ kết luận về mọi trang dùng nó. Nó không chứng minh rằng các liên kết liệu trình trên mọi trang đều đúng, vì những liên kết đó khác nhau ở mỗi trang.

Hãy ghi lại những gì bạn đã bao quát, cùng các giới hạn của nó, trong một **ma trận bao quát** (coverage matrix): một bảng cho thấy bước kiểm tra nào đã được áp dụng cho trang và tính năng nào.

## 5. Viết các trường hợp kiểm thử mà người khác có thể làm theo

Một **trường hợp kiểm thử** (test case) mô tả một bước kiểm tra đủ chính xác để một người rà soát khác có thể lặp lại.

| Mục | Mục đích |
|---|---|
| Mã kiểm thử | Định danh bước kiểm tra |
| Yêu cầu | Hành vi mong đợi, và nguồn gốc của nó |
| Điều kiện trước | Những gì phải đúng trước khi bắt đầu |
| Các bước | Các hành động cần thực hiện |
| Kết quả mong đợi | Điều gì sẽ xảy ra |
| Điều kiện | Trình duyệt, khung nhìn và phương thức nhập liệu |
| Kết quả | Đạt, Không đạt, Chưa kiểm tra hoặc Không áp dụng |
| Bằng chứng | Những gì hỗ trợ kết quả được ghi lại |

### Ví dụ trường hợp kiểm thử

**Mã:** QA-NAV-01  
**Yêu cầu:** Thẻ liệu trình đã được phê duyệt mở ra trang chi tiết tương ứng.

**Điều kiện trước:** Trang danh sách liệu trình có sẵn.

**Các bước:**

1. Mở danh sách liệu trình.
2. Tìm liệu trình đã được phê duyệt được chọn.
3. Kích hoạt liên kết của nó.
4. Kiểm tra địa chỉ và heading chính của trang được mở ra.

**Kết quả mong đợi:** Đúng trang chi tiết liệu trình được mở ra và hiển thị heading tương ứng đã được phê duyệt.

Hãy thay ví dụ này bằng các yêu cầu thực tế của dự án.

## 6. Chuẩn bị các điều kiện kiểm thử an toàn, có thể lặp lại

Hãy dùng môi trường và thông tin kiểm thử đã thống nhất. Trước khi kiểm thử:

- Xác nhận những hành động nào liên quan đến dịch vụ bên ngoài được cho phép.
- Xác định mọi thông báo hoặc bản ghi mà một bài kiểm thử sẽ tạo ra.
- Dùng thông tin tổng hợp.
- Thiết lập trạng thái ban đầu cho các tính năng ghi nhớ lựa chọn.
- Kiểm tra xem các bản ghi từ những lần kiểm thử trước có thể ảnh hưởng đến kết quả không.

Không bao giờ nhập thông tin thật của khách hàng hoặc bệnh nhân.

Nếu một bài kiểm thử cần một dịch vụ chưa có sẵn, hãy đánh dấu nó là **Chưa kiểm tra** và ghi lại phụ thuộc đó.

Không bao giờ kiểm thử một bản mô phỏng thay vào đó rồi báo cáo luồng có kết nối là đạt.

## 7. Thực hiện các bước kiểm tra theo một thứ tự hữu ích

Hãy bắt đầu với những vấn đề sẽ làm dừng phần còn lại của đợt rà soát. Một thứ tự thực tế là:

1. Xác nhận website khởi động và các route bắt buộc mở được.
2. Kiểm tra thanh điều hướng dùng chung và cấu trúc chính của trang.
3. Kiểm thử các hành trình quan trọng đã được phê duyệt.
4. Kiểm tra nội dung và đích đến riêng của từng trang.
5. Rà soát hành vi responsive và bàn phím.
6. Kiểm tra các trạng thái thất bại và khôi phục liên quan.
7. Chạy mọi bước kiểm tra còn tồn đọng của dự án.

Nếu một lỗi phát hiện sớm chặn các bước kiểm tra sau, hãy ghi lại những bước kiểm tra nào bị chặn. Ví dụ, một route không mở được sẽ chặn việc rà soát nội dung của nó, nhưng các route khác vẫn có thể được kiểm tra.

Đừng tiếp tục kiểm thử lại một lỗi đã biết trừ khi có điều gì đó đã thay đổi hoặc có bằng chứng mới.

## 8. Ghi lại phát hiện tách riêng khỏi kết quả kiểm thử

Một **bài kiểm thử không đạt** ghi lại điều gì đã xảy ra trong một bước kiểm tra. Một **phát hiện** mô tả vấn đề gốc rễ cần được điều tra hoặc sửa. Một phát hiện có thể giải thích nhiều bài kiểm thử không đạt.

| Mục của phát hiện | Cần ghi gì |
|---|---|
| Mã | Một mã tham chiếu duy nhất |
| Vị trí | Trang, component hoặc hành trình bị ảnh hưởng |
| Tái hiện | Điều kiện ban đầu và các bước |
| Mong đợi | Yêu cầu và nguồn gốc của nó |
| Thực tế | Những gì đã quan sát được |
| Bằng chứng | Ảnh chụp màn hình hoặc đầu ra, đã loại bỏ dữ liệu nhạy cảm |
| Tác động | Vấn đề ảnh hưởng thế nào đến khách truy cập hoặc các yêu cầu |
| Trạng thái | Tình trạng giải quyết hiện tại |

Hãy liên kết tất cả các mã kiểm thử liên quan với một phát hiện, thay vì ghi cùng một lỗi nhiều lần.

Hãy giữ riêng các nguyên nhân bị nghi ngờ với các nguyên nhân đã được xác nhận.

## 9. Gán mức ưu tiên theo tác động

Hãy dùng thang ưu tiên riêng của dự án nếu có. Nếu không, hãy đề xuất một thang đơn giản:

| Mức ưu tiên | Ảnh hưởng điển hình |
|---|---|
| Chặn sử dụng | Một trang bắt buộc hoặc một hành động quan trọng không thể sử dụng được |
| Nghiêm trọng | Thông tin hoặc hành vi quan trọng khác biệt đáng kể so với yêu cầu |
| Nhỏ | Một sai lệch nhỏ với ảnh hưởng thực tế hạn chế |

Mức ưu tiên quyết định thứ tự sửa lỗi. Nó không thay đổi việc một yêu cầu có được đáp ứng hay không.

Cũng hãy phân loại từng mục:

- **Lỗi:** phần triển khai khác với một yêu cầu.
- **Thiếu sót trong đặc tả:** hành vi mong đợi chưa rõ ràng.
- **Phụ thuộc:** một tài liệu hoặc dịch vụ bắt buộc chưa có sẵn.
- **Gợi ý:** một thay đổi được đề xuất nằm ngoài mốc chuẩn đã được phê duyệt.

Đừng bao giờ biến một sở thích cá nhân thành một lỗi.

## 10. Nhờ Claude hỗ trợ đợt rà soát QA

```text
Review the implemented website within the defined QA scope.

Before testing:
- Read the relevant project instructions.
- Confirm the implementation and Git working state.
- Inspect approved requirements and existing review records.
- Identify available browser tools and test arrangements.

Prepare and execute applicable checks for:
- Required pages and content.
- Shared visual consistency.
- Navigation and selected visitor journeys.
- Responsive behaviour.
- Approved interactive features.
- Relevant keyboard and accessibility requirements.
- Direct route loading and relevant runtime errors.

Use existing valid evidence where applicable.
State coverage, sampling and verification limits.
Use synthetic information.

Return:
1. Test coverage and conditions.
2. Checks actually performed and results.
3. Findings with reproduction steps and evidence.
4. Dependencies and unperformed checks.
5. Recommended correction order.

Review only. Do not edit files, install dependencies,
commit, push or deploy.

Perform external actions only within existing authorisation.
Do not claim a complete specialist audit.

Scope and references:
[Insert the QA scope, implementation and exact references.]
```

Hãy tự mình kiểm tra bằng chứng và cách phân loại của Claude trước khi yêu cầu bất kỳ bản sửa nào.

## 11. Biến các phát hiện đã xác minh thành nhiệm vụ sửa lỗi

Hãy gom nhóm các phát hiện có chung một nguyên nhân đã được xác nhận. Với mỗi nhiệm vụ sửa lỗi, hãy xác định:

- Kết quả cần đạt.
- Các phát hiện mà nó bao gồm.
- Các phần của website bị ảnh hưởng.
- Các tài liệu tham chiếu đã được phê duyệt.
- Các ranh giới.
- Những bước kiểm tra nào cần lặp lại sau đó.
- Những bước kiểm tra hồi quy nào có liên quan.

Đừng bao giờ yêu cầu Claude "sửa mọi thứ" từ một danh sách phát hiện chưa được rà soát. Một bản sửa rộng có thể thay đổi nhiều đến mức phần lớn bằng chứng bạn vừa thu thập không còn áp dụng được nữa. Hãy ưu tiên các bản sửa tương xứng với các bước kiểm tra rõ ràng.

Bài 8.2 đề cập đến việc thực hiện và kiểm tra các bản sửa.

## 12. Bài tập thực hành

**Nhiệm vụ: Thực hiện một đợt rà soát QA trên toàn bộ website đã triển khai.**

1. Xác định phạm vi và ghi lại phiên bản triển khai.
2. Tạo ma trận bao quát.
3. Viết các trường hợp kiểm thử cho các yêu cầu đã chọn.
4. Xác nhận cách sắp xếp kiểm thử.
5. Thực hiện các bước kiểm tra.
6. Ghi lại các phát hiện và phụ thuộc.
7. Tự mình kiểm tra kết quả rà soát của Claude.
8. Chuẩn bị các nhiệm vụ sửa lỗi có thứ tự ưu tiên.

Bài học này tạo ra hồ sơ QA và một kế hoạch sửa lỗi. Đừng đánh dấu bất kỳ phát hiện nào là đã giải quyết cho đến khi bản sửa của nó đã được kiểm tra.

## 13. Sản phẩm cần nộp

Nộp:

- Phạm vi QA và trạng thái triển khai.
- Ma trận bao quát và các trường hợp kiểm thử.
- Điều kiện về trình duyệt, khung nhìn và kiểm thử.
- Kết quả và bằng chứng đi kèm.
- Các phát hiện đã gộp cùng mức ưu tiên.
- Các bước kiểm tra chưa thực hiện, và các phụ thuộc.
- Các nhiệm vụ sửa lỗi được đề xuất.

## 14. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Phạm vi bao quát của QA tuân theo các yêu cầu đã được phê duyệt.
- Kết quả cho thấy chính xác những gì đã được kiểm tra.
- Các phát hiện có thể tái hiện được và được hỗ trợ bởi bằng chứng.
- Mức ưu tiên phản ánh tác động thực tế.
- Lỗi được tách riêng khỏi thiếu sót, phụ thuộc và gợi ý.
- Công việc còn tồn đọng được sắp xếp thành các nhiệm vụ sửa lỗi có giới hạn rõ ràng.
- Hồ sơ QA sẵn sàng để người hướng dẫn duyệt.

## 15. Kiểm tra kiến thức

1. Vì sao một đợt rà soát toàn website vẫn đáng làm sau khi từng trang riêng lẻ đã được chấp nhận?
2. Những bước kiểm tra nào cần được làm trên mọi trang?
3. Một bài kiểm thử không đạt khác với một phát hiện như thế nào?
4. Vì sao cần ghi lại các giới hạn của việc lấy mẫu?
5. Vì sao nên chuẩn bị các nhiệm vụ sửa lỗi trước khi yêu cầu Claude sửa các phát hiện?
