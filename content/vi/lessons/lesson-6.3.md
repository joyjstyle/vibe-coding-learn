# Bài 6.3: Kết nối các trang và kiểm tra hành trình của khách truy cập

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Kết nối các trang đã triển khai theo đúng mô tả của kiến trúc thông tin (IA) đã được duyệt.
- Kiểm tra nhãn điều hướng, đích đến và chỉ báo trang hiện tại.
- Thử nghiệm trọn vẹn các hành trình người dùng đi qua nhiều trang.
- Tìm liên kết hỏng, những trang mà khách truy cập không thể đến được và các đích đến chưa hoàn thiện.
- Sửa các vấn đề điều hướng và kiểm tra các hành trình mà chúng ảnh hưởng.

**Điều kiện tiên quyết:** Hoàn thành Bài 6.2 và có các trang nội bộ liên quan đang chạy trên máy (local).

**Tài liệu cần chuẩn bị:** IA đã được duyệt, đặc tả điều hướng, các luồng khách truy cập, các route đã triển khai, đích đến của lời kêu gọi hành động (CTA) và hồ sơ phụ thuộc còn tồn đọng.

## 1. Rà soát các kết nối giữa các trang

Các bài học trước đã kiểm tra từng trang riêng lẻ và các liên kết trực tiếp của chúng. Bài học này kiểm tra cách các trang hoạt động cùng nhau.

Một trang có thể tải đúng nhưng vẫn khó tìm. Một liên kết có thể mở một trang có thật nhưng vẫn dẫn đến thông tin sai.

Hãy rà soát ở hai cấp độ:

| Cấp độ rà soát | Câu hỏi |
|---|---|
| **Liên kết riêng lẻ** | Liên kết hoặc điều khiển này có đến được đích dự định không? |
| **Hành trình người dùng** | Khách truy cập có thể hoàn thành chuỗi bước đã được duyệt không? |

Một **luồng khách truy cập** (visitor flow) là kế hoạch đã được duyệt cho các chuỗi bước này, được chuẩn bị trong giai đoạn lập kế hoạch ở Học phần 2.

**Các route hoạt động là cần thiết, nhưng chúng không chứng minh rằng phần điều hướng của website đã hoàn chỉnh.**

## 2. Lập danh mục điều hướng

Một **danh mục điều hướng** (navigation inventory) liệt kê mọi liên kết trong phạm vi, kèm đích đến mong đợi và đích đến thực tế. Bắt đầu từ IA và đặc tả điều hướng đã được duyệt.

| Vị trí | Nhãn | Đích đến mong đợi | Kết quả hiện tại | Trạng thái |
|---|---|---|---|---|
| Header | Treatments | Route danh sách liệu trình đã được duyệt | Cần kiểm tra | Chưa kiểm tra |
| Thẻ trên trang chủ | Tên liệu trình đã được duyệt | Route chi tiết tương ứng | Cần kiểm tra | Chưa kiểm tra |
| Trang liệu trình | Find an outlet | Đích đến địa điểm đã được duyệt | Cần kiểm tra | Chưa kiểm tra |
| Footer | Contact | Route liên hệ đã được duyệt | Cần kiểm tra | Chưa kiểm tra |

Các hàng này chỉ mang tính minh họa. Hãy dùng nhãn và đích đến thực tế của dự án.

Hãy bao gồm, nếu có:

- Header và điều hướng mobile.
- Liên kết ở footer.
- Thẻ và liên kết trong văn bản.
- Lời kêu gọi hành động.
- Breadcrumb, nếu được quy định.
- Liên kết nội dung liên quan.
- **Liên kết neo** (anchor link), tức là liên kết nhảy đến một phần trên cùng trang.
- Liên kết đến các website và dịch vụ bên ngoài.

Đừng thêm liên kết chỉ vì chúng xuất hiện trong ví dụ này.

## 3. Xác nhận đích đến mong đợi

Hãy quyết định mỗi liên kết cần làm gì trước khi thử nó.

| Loại đích đến | Hành vi mong đợi |
|---|---|
| Trang nội bộ | Mở route đã được xác nhận |
| Một phần của trang | Cuộn đến đúng phần mà không che mất tiêu đề của nó |
| Website bên ngoài | Mở địa chỉ đã được duyệt |
| Liên kết email | Mở ứng dụng email của khách truy cập với địa chỉ đã được cấu hình |
| Liên kết điện thoại | Đưa số điện thoại đã được xác nhận vào ứng dụng gọi điện |
| Dịch vụ đặt lịch hoặc nhắn tin | Mở dịch vụ hoặc cuộc trò chuyện đã được duyệt |

Hãy tuân theo quy tắc của dự án về việc mỗi liên kết mở trong cùng tab hay tab mới. Đừng mặc định cho mọi liên kết bên ngoài mở trong tab mới. Các tab mới bất ngờ có thể làm khách truy cập mất phương hướng, đặc biệt là những người dùng trình đọc màn hình.

Với liên kết email và điện thoại, kiểm tra rằng địa chỉ hoặc số điện thoại được cấu hình đúng khác với việc gửi email hoặc gọi điện. Hãy ghi lại chính xác những gì bạn đã kiểm tra.

## 4. Kiểm tra điều hướng dùng chung

Rà soát header, menu mobile và footer trên mỗi trang đã triển khai. Kiểm tra rằng:

- Nhãn và thứ tự của chúng khớp với đặc tả đã được duyệt.
- Đích đến nhất quán ở mọi nơi chúng cần nhất quán.
- Logo liên kết đến đích đến đã thống nhất.
- Phiên bản điều hướng phù hợp xuất hiện ở mỗi bố cục.
- Chỉ báo trang hiện tại tuân theo thiết kế đã được duyệt.
- Tiêu điểm bàn phím (keyboard focus) vẫn hiển thị rõ.
- Menu mobile đóng lại hoặc cập nhật sau khi chọn, như đặc tả.

### Chỉ báo trang hiện tại

Nhiều thiết kế làm nổi bật mục điều hướng của trang mà khách truy cập đang xem. Ở những nơi thiết kế làm điều này, hãy kiểm tra hành vi trên cả trang danh sách lẫn trang chi tiết. Ví dụ, một trang chi tiết liệu trình có thể làm nổi bật mục cha “Treatments”, nếu đó là quy tắc đã được duyệt.

Chỉ làm nổi bật về mặt hình ảnh thôi là chưa đủ, vì người dùng trình đọc màn hình không thể nhìn thấy nó. Thuộc tính HTML `aria-current` cho công nghệ hỗ trợ biết liên kết nào đại diện cho trang hiện tại, ví dụ `aria-current="page"`. Hãy tuân theo các quy ước về khả năng tiếp cận hiện có của dự án cho việc này.

Đừng chỉ dựa vào màu sắc để thể hiện một trạng thái bắt buộc. Một số khách truy cập không phân biệt được một số màu nhất định.

## 5. Tìm các trang thiếu điểm vào

So sánh các route đã triển khai với các liên kết vào đã được duyệt. Một trang có thể tải được khi bạn gõ địa chỉ của nó nhưng không có liên kết nào dẫn đến nó ở nơi IA yêu cầu.

Với mỗi trang, hãy kiểm tra:

1. Khách truy cập được dự định sẽ tìm thấy nó ở đâu.
2. Điểm vào đó có tồn tại không.
3. Nhãn của nó có làm rõ đích đến không.
4. Liên kết có mở đúng trang không.

Không phải trang nào cũng thuộc về điều hướng chính. Một số trang được dự định để đến qua trang danh sách, liên kết trong ngữ cảnh hoặc địa chỉ trực tiếp. Hãy đánh giá từng trang so với cấu trúc đã được duyệt, thay vì thêm mọi route vào header.

## 6. Viết các bước kiểm tra hành trình người dùng

Dùng các luồng khách truy cập đã được duyệt để viết một bộ nhỏ các bước kiểm tra có ý nghĩa.

### Ví dụ về hành trình

Chỉ khi dự án hỗ trợ:

> Trang chủ → danh sách liệu trình → chi tiết liệu trình → trang địa điểm.

Với mỗi hành trình, hãy ghi lại:

| Trường | Nội dung cần có |
|---|---|
| ID hành trình | Một mã tham chiếu duy nhất |
| Mục tiêu của khách truy cập | Điều người đó đang cố gắng đạt được |
| Điểm bắt đầu | Trang nơi bước kiểm tra bắt đầu |
| Các bước | Các liên kết hoặc điều khiển được chọn |
| Kết quả mong đợi | Trang hoặc trạng thái đúng sau mỗi bước |
| Điều kiện kiểm thử | Trình duyệt, viewport và phương thức nhập, chẳng hạn chuột hoặc bàn phím |
| Kết quả | Đạt, Không đạt hoặc Chưa kiểm tra |
| Bằng chứng | Ảnh chụp màn hình, quan sát hoặc kết quả kiểm thử |

Hãy thử các điểm bắt đầu khác khi được yêu cầu. Khách truy cập thường đến thẳng một trang nội bộ từ công cụ tìm kiếm, thay vì bắt đầu ở trang chủ.

Đừng thêm các bước không có trong hành trình đã được duyệt.

## 7. Thử nghiệm các hành trình trong trình duyệt

Với mỗi hành trình:

1. Mở trang bắt đầu đã được ghi lại.
2. Đi theo các liên kết đã được chỉ định.
3. Xác nhận đích đến sau mỗi bước.
4. Kiểm tra rằng nội dung khớp với chủ đề đã chọn.
5. Xác nhận rằng hành động bắt buộc tiếp theo có sẵn.
6. Ghi lại kết quả.

Lặp lại các hành trình liên quan bằng menu mobile và chỉ bằng bàn phím.

### Kiểm tra lịch sử trình duyệt khi liên quan

Dùng các nút Back và Forward của trình duyệt để xác nhận rằng việc điều hướng vẫn hợp lý.

Một số tính năng ghi nhớ những gì khách truy cập đã chọn, chẳng hạn bộ lọc hoặc tab. Nếu bản triển khai đã được duyệt có những tính năng như vậy, hãy kiểm tra hành vi đã được ghi trong tài liệu của chúng khi khách truy cập quay lại. Đừng thêm hành vi mới thuộc loại này mà nhiệm vụ không yêu cầu.

### Tôn trọng giới hạn đối với các hành động bên ngoài

Việc mở một đích đến không cho phép bạn gửi thông tin ở đó.

Đừng gửi tin nhắn, gọi điện, tạo lịch hẹn hoặc gửi biểu mẫu trừ khi nhiệm vụ bao gồm sự cho phép và sắp xếp kiểm thử để làm vậy. Hãy ghi lại mọi bước kiểm tra mà bạn phải dừng giữa chừng.

## 8. Nhờ Claude rà soát điều hướng

```text
Review the implemented page connections and selected
visitor journeys against the approved references.

Inspect:
- Relevant project instructions.
- Approved IA, navigation specification and visitor flows.
- Implemented routes and navigation components.
- CTA destinations and outstanding dependencies.

Check:
- Labels, order and destinations.
- Header, mobile menu and footer consistency.
- Current-page states where specified.
- Required entry points to internal pages.
- Contextual links and in-page anchors.
- The selected journeys at the required layouts.
- Relevant keyboard and browser history behaviour.

For each finding, report:
1. Location and reproduction steps.
2. Expected result and supporting reference.
3. Actual result.
4. Evidence.
5. Affected links, components or journeys.

Distinguish confirmed defects from missing decisions.
State which browser checks were actually performed.

Review only. Do not edit files, commit, push or deploy.
Do not submit forms, send messages or make bookings.

Scope and references:
[Insert routes, journey IDs and exact references.]
```

Hãy tự mình kiểm tra các phát hiện trước khi yêu cầu sửa.

## 9. Sửa vấn đề mà không tái cấu trúc website

Các chỉnh sửa điển hình bao gồm:

- Khôi phục một nhãn liên kết đã được duyệt.
- Sửa một route.
- Sửa đích của một liên kết neo.
- Thêm một liên kết vào đã được duyệt còn thiếu.
- Sửa chỉ báo trang hiện tại.
- Sửa hành vi của menu mobile.

Đừng sắp xếp lại IA chỉ vì bạn cảm thấy một hành trình bất tiện. Nếu bản thân luồng đã được duyệt có vẻ là một vấn đề, hãy ghi lại mối lo ngại đó riêng để được rà soát.

### Prompt sửa lỗi

```text
Correct the verified navigation findings listed below.

- Follow the approved IA and navigation specification.
- Preserve approved labels unless the finding restores them.
- Reuse the existing routing and navigation approach.
- Update shared navigation sources where appropriate.
- Preserve unrelated page content and behaviour.
- Do not substitute unfinished destinations with unrelated pages.

After editing:
- Repeat each failed link or journey check.
- Check other usages affected by shared changes.
- Verify relevant desktop and mobile navigation.
- Run applicable documented project checks.
- Report results and remaining dependencies.

Do not commit, push, deploy or trigger external transactions.

Verified findings:
[Insert findings and supporting references.]
```

Sửa một đích đến dùng chung có thể sửa được nhiều liên kết cùng lúc. Hãy kiểm tra lại từng điểm vào bị ảnh hưởng thay vì cho rằng tất cả đều đã được cập nhật đúng.

## 10. Bài tập thực hành

**Nhiệm vụ: Kiểm tra các kết nối giữa trang chủ và các trang nội bộ đã triển khai.**

1. Lập danh mục điều hướng.
2. So sánh các route với các điểm vào bắt buộc.
3. Chọn các hành trình người dùng đã được duyệt áp dụng được.
4. Thử nghiệm từng liên kết riêng lẻ và các hành trình trọn vẹn.
5. Ghi lại các lỗi và giới hạn của các bước kiểm tra.
6. Nhờ Claude sửa các vấn đề đã xác minh.
7. Kiểm tra lại các bước kiểm tra thất bại và phần điều hướng dùng chung bị ảnh hưởng.
8. Cập nhật hồ sơ phát hiện và hồ sơ phụ thuộc.

Nếu một hành trình kết thúc ở một trang chưa hoàn thiện, hãy ghi lại chính xác nó đã đi được bao xa và còn thiếu gì. Đừng đánh dấu cả hành trình là đạt.

## 11. Sản phẩm cần nộp

Nộp:

- Danh mục điều hướng.
- Đặc tả các hành trình đã chọn.
- Các trình duyệt và phương thức nhập đã dùng.
- Kết quả kiểm tra liên kết và hành trình.
- Bằng chứng cho các phát hiện và chỉnh sửa.
- Bản tóm tắt các tệp đã thay đổi.
- Kết quả kiểm tra hồi quy và kiểm tra của dự án.
- Các đích đến, quyết định và giới hạn xác minh còn tồn đọng.

## 12. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các kết nối đã triển khai khớp với IA và yêu cầu điều hướng đã được duyệt.
- Các trang có đủ điểm vào bắt buộc.
- Các hành trình người dùng đã chọn đã được thử nghiệm.
- Điều hướng dùng chung hoạt động nhất quán trên các bố cục liên quan.
- Các lỗi đã xác minh đã được sửa và kiểm tra lại.
- Các hành trình chưa hoàn chỉnh và giới hạn đối với hành động bên ngoài vẫn được thể hiện rõ.
- Kết quả đã sẵn sàng để người hướng dẫn duyệt.

## 13. Kiểm tra kiến thức

1. Thử nghiệm một hành trình trọn vẹn khác với kiểm tra một liên kết như thế nào?
2. Vì sao một trang mở được trực tiếp vẫn cần các điểm vào đã được duyệt của nó?
3. Có phải mọi trang nội bộ đều phải xuất hiện trong điều hướng chính không?
4. Bạn nên làm gì nếu luồng khách truy cập đã được duyệt có vẻ cần được tái cấu trúc?
5. Bạn nên báo cáo thế nào về một hành trình dừng lại ở một trang chưa hoàn thiện?
