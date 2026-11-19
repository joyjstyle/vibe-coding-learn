# Bài 1.1: Cách website hoạt động và quy trình vibe coding

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Giải thích vai trò của trình duyệt, mã nguồn của website và các dịch vụ bên ngoài.
- Phân biệt môi trường phát triển cục bộ, bản triển khai thử nghiệm và website đang chạy thật.
- Mô tả cách hướng dẫn Claude thực hiện một nhiệm vụ có giới hạn rõ ràng.
- Giải thích vì sao sản phẩm Claude tạo ra vẫn cần một người kiểm tra.

**Điều kiện tiên quyết:** Không có.

**Tài liệu cần chuẩn bị:** Một trình duyệt web, hướng dẫn của khóa học và bản mô tả dự án thực hành Saffron Wellness Clinic của người hướng dẫn.

## 1. Hiểu một website được tạo nên từ những gì

Một website kết hợp nhiều loại công việc khác nhau. Gọi tên riêng từng loại sẽ giúp ích cho bạn, vì mỗi loại được kiểm tra theo một cách khác nhau.

| Thành phần | Vai trò | Ví dụ |
|---|---|---|
| **Nội dung** | Truyền đạt thông tin | Tiêu đề trang hoặc phần mô tả một liệu trình |
| **Trình bày** | Quyết định giao diện trông như thế nào | Kiểu chữ, khoảng cách và màu sắc |
| **Hành vi** | Phản hồi khi người truy cập thực hiện một thao tác | Mở menu trên điện thoại |
| **Tích hợp** | Kết nối website với một hệ thống khác | Gửi một yêu cầu đã được phê duyệt đến một dịch vụ tiếp nhận |

Ba yếu tố phối hợp với nhau để tạo ra những gì người truy cập nhìn thấy:

- **Trình duyệt**, chẳng hạn Chrome, Safari hoặc Edge, hiển thị website.
- **Các tệp dự án** mô tả nội dung cần hiển thị và cách website hoạt động.
- **Máy chủ** (server), một máy tính phản hồi các yêu cầu qua internet, có thể chuẩn bị nội dung hoặc xử lý thông tin được gửi lên. Dự án có cần máy chủ hay không phụ thuộc vào **kiến trúc** của nó, tức kế hoạch tổng thể về cách xây dựng dự án.

Một số website dùng dịch vụ bên ngoài, như dịch vụ email hoặc đặt lịch. Nhiều website thì không. Một biểu mẫu liên hệ xuất hiện trên trang không chứng minh rằng có một dịch vụ nào đó đang tiếp nhận tin nhắn từ biểu mẫu ấy.

## 2. Phân biệt các môi trường làm việc

**Môi trường** (environment) là nơi website chạy. Mỗi môi trường có một mục đích khác nhau.

| Môi trường | Mục đích | Điều nó không chứng minh được |
|---|---|---|
| **Phát triển cục bộ** | Chạy dự án trên máy tính của chính bạn trong lúc làm việc | Rằng người khác có thể xem được |
| **Môi trường thử nghiệm hoặc staging** | Duyệt một bản sao của website được lưu trữ trực tuyến trước khi phát hành | Rằng website đã được chấp nhận để công khai |
| **Production** | Phục vụ website đang chạy thật cho người dùng thực | Rằng mọi tính năng đều đã được kiểm tra |

Khi bạn chạy website trên máy cục bộ, nó thường có địa chỉ dạng `http://localhost:` kèm theo một con số. Địa chỉ này chỉ hoạt động khi một chương trình trên chính máy tính của bạn đang chạy. Gửi địa chỉ đó cho đồng nghiệp không giúp họ xem được bài làm của bạn.

Không thay đổi một website đang chạy thật trong bài học nhập môn này.

## 3. Hiểu vai trò của bạn khi làm việc với Claude

Claude có thể đọc tệp, đề xuất cách tiếp cận và thực hiện thay đổi, khi môi trường và nhiệm vụ cho phép.

**Bạn vẫn chịu trách nhiệm kiểm tra rằng kết quả đáp ứng các yêu cầu đã được phê duyệt.**

Trách nhiệm của bạn bao gồm:

1. Cung cấp cho Claude các tài liệu tham chiếu đã được phê duyệt có liên quan.
2. Nêu rõ kết quả bạn cần và phạm vi giới hạn của nhiệm vụ.
3. Xem xét các giả định và thay đổi mà Claude đề xuất.
4. Kiểm tra sản phẩm hoàn chỉnh và bằng chứng cho nó.
5. Báo cáo chính xác mọi vấn đề chưa được giải quyết.

“Claude nói là đã xong” tự nó không phải là bằng chứng. Claude có thể hiểu sai yêu cầu, bỏ sót một yêu cầu hoặc báo cáo một bước kiểm tra mà thực ra nó không thể thực hiện. Việc duyệt của bạn sẽ phát hiện những điều này.

## 4. Tuân theo một chu trình làm việc có kiểm soát

**Vibe coding** là cách xây dựng phần mềm bằng việc mô tả điều bạn muốn bằng ngôn ngữ thông thường và để một công cụ AI như Claude viết mã. Cách này nhanh, nhưng tốc độ mà thiếu kiểm tra sẽ tạo ra sản phẩm không ai tin tưởng được. Một chu trình có kiểm soát giúp mọi bước đều minh bạch:

1. **Hiểu:** xác định yêu cầu và kết quả mong đợi.
2. **Khảo sát:** tìm hiểu những gì đã có sẵn.
3. **Lập kế hoạch:** chọn những thay đổi tương xứng với nhiệm vụ, cùng các bước kiểm tra phù hợp với chúng.
4. **Thực hiện:** tiến hành các thay đổi đã được cho phép.
5. **Xác minh:** so sánh kết quả với yêu cầu.
6. **Ghi lại:** tóm tắt các thay đổi, bằng chứng và mọi việc còn lại.

Những chỉnh sửa nhỏ có thể không cần một kế hoạch viết riêng. Chu trình này tồn tại để giúp các quyết định được minh bạch. Nó không có nghĩa là phải xin phê duyệt trước mỗi chỉnh sửa thông thường.

Các học phần sau sẽ luyện tập chi tiết từng bước: khảo sát và lập kế hoạch ở Học phần 4, thực hiện và kiểm tra từ Học phần 5 trở đi.

## 5. Tách biệt yêu cầu với đề xuất

Một **thiết kế đã được phê duyệt** xác định những gì cần xây dựng. Một ý tưởng mới, dù của bạn hay của Claude, chỉ là một **đề xuất** cho đến khi người có thẩm quyền quyết định chấp nhận nó.

Ví dụ, sắp xếp lại thanh điều hướng vì trông đẹp hơn sẽ thay đổi cách người truy cập di chuyển trong website. Đó là một quyết định thiết kế mới, chứ không đơn thuần là xây dựng theo thiết kế hiện có.

Khi thiếu một yêu cầu, hãy nêu rõ quyết định cần được đưa ra. Đừng lấp chỗ trống bằng cách tự tạo ra một sự phê duyệt.

## 6. Chuẩn bị yêu cầu khảo sát đầu tiên của bạn

**Prompt** là yêu cầu bạn gõ cho Claude. Bạn sẽ dùng prompt dưới đây sau khi đã cài đặt công cụ và dự án khởi đầu ở Bài 1.2 đến 1.4:

```text
Explain the supplied Saffron Wellness Clinic practice project to a beginner.

Read only its introductory instructions and relevant project overview.
Describe the intended website, known tools and working environments.
Distinguish supplied facts from missing information.
Explain the next permitted learning task.

Inspect only. Do not edit files, install software, start services,
commit, push or deploy.
```

Hãy để ý cách prompt nêu rõ cần đọc gì, cần báo cáo gì và không được làm gì. Các bài học sau sẽ phát triển dựa trên khuôn mẫu này.

Đây là ví dụ để dùng về sau. Nó không có nghĩa là dự án khởi đầu đã được cung cấp hoặc đã được khảo sát trong bài học này.

## 7. Bài tập thực hành

**Nhiệm vụ: Giải thích quy trình làm website bằng lời của chính bạn.**

1. Mô tả nội dung, trình bày, hành vi và tích hợp, mỗi loại kèm một ví dụ.
2. Giải thích sự khác nhau giữa môi trường cục bộ và một website đang chạy thật.
3. Viết chu trình làm việc sáu bước cho một thay đổi nhỏ, giả định trên website.
4. Xác định những quyết định nào trong thay đổi đó cần có tài liệu tham chiếu đã được phê duyệt.
5. Nêu cách bạn biết thay đổi đã thành công.

Không cần viết mã.

## 8. Sản phẩm cần nộp

Nộp:

- Phần giải thích của bạn về bốn thành phần của một website.
- Phần giải thích của bạn về các môi trường.
- Chu trình làm việc của bạn cho một thay đổi nhỏ.
- Một ví dụ về một nhận định vẫn cần được kiểm tra trước khi bạn có thể dựa vào nó.

## 9. Tiêu chí hoàn thành

Bài học hoàn thành khi bạn có thể:

- Giải thích các thành phần của một website.
- Phân biệt các môi trường.
- Mô tả trách nhiệm của bạn trong việc kiểm tra sản phẩm của Claude.

## 10. Kiểm tra kiến thức

1. Trình bày khác với nội dung như thế nào?
2. Một biểu mẫu liên hệ hiển thị trên trang có chứng minh được rằng tin nhắn sẽ được nhận không?
3. Vì sao một trang chạy trên máy tính của bạn không tự động trở thành một website công khai?
4. Điều gì khiến một đề xuất khác với một yêu cầu đã được phê duyệt?
5. Vì sao cần kiểm tra báo cáo hoàn thành của Claude?
