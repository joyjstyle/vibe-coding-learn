# Bài 4.4: Đối chiếu bản dựng với thiết kế đã duyệt

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- So sánh những gì bạn đã xây dựng với các tài liệu tham chiếu đã duyệt của nó.
- Xác định những điểm khác biệt cụ thể về giao diện, nội dung và hành vi.
- Viết hướng dẫn sửa lỗi mà Claude có thể thực hiện được.
- Kiểm tra các chỉnh sửa mà không mở rộng tác vụ.
- Nộp bằng chứng hỗ trợ cho phần duyệt của bạn, và lưu một mốc lưu Git khi công việc được chấp nhận.

**Điều kiện tiên quyết:** Hoàn thành Bài 4.3 và có phần triển khai của bài đó đang chạy trên máy cục bộ.

**Tài liệu cần chuẩn bị:** Component đã triển khai, thiết kế đã duyệt, hướng dẫn phong cách, nội dung và tiêu chí chấp nhận.

## 1. So sánh với yêu cầu, không phải với sở thích của bạn

Một website có thể trông rất chỉn chu mà vẫn khác với thiết kế đã duyệt. Việc duyệt thiết kế đặt ra một câu hỏi cụ thể:

> Phần việc đã triển khai có khớp với các yêu cầu đã thống nhất không, và bằng chứng nào hỗ trợ kết luận đó?

Hãy duyệt tác vụ được chọn trước. Sau đó bao gồm mọi thứ mà một thay đổi dùng chung có thể đã ảnh hưởng tới.

Ví dụ, nếu một style thẻ dùng chung đã thay đổi, hãy kiểm tra mọi thể hiện thẻ bắt buộc. Bạn không cần duyệt các tính năng không liên quan trừ khi thay đổi có động chạm tới chúng.

## 2. Thiết lập điều kiện xem có thể so sánh được

Một phép so sánh chỉ công bằng nếu bạn xem bản dựng trong cùng điều kiện với tài liệu tham chiếu.

Trước khi so sánh:

1. Xác nhận bạn đang dùng phiên bản nào của thiết kế đã duyệt.
2. Mở trang hoặc component tương ứng.
3. Dùng kích thước viewport được đặc tả cho việc duyệt.
4. Đặt mức thu phóng của trình duyệt ở 100%.
5. Chờ cho đến khi phông chữ và hình ảnh tải xong.
6. Đặt component ở cùng trạng thái với tài liệu tham chiếu, chẳng hạn menu đang mở hoặc đóng.

**Viewport** là vùng của cửa sổ trình duyệt hiển thị trang. Kích thước của nó được đo bằng pixel CSS và không giống với độ phân giải màn hình máy tính. Công cụ dành cho nhà phát triển của trình duyệt cho phép bạn đặt kích thước viewport chính xác.

Nếu thiết kế không đặc tả độ rộng duyệt, hãy ghi lại độ rộng bạn đã dùng và kiểm tra các yêu cầu responsive của dự án.

Hãy so sánh những thứ tương đương. Một menu di động đang đóng nên được so sánh với tài liệu tham chiếu ở trạng thái đóng, không phải trạng thái mở.

## 3. Duyệt theo một thứ tự nhất quán

Bắt đầu với những khác biệt lớn về cấu trúc, sau đó chuyển sang các chi tiết nhỏ hơn.

| Lĩnh vực duyệt | Điều cần kiểm tra |
|---|---|
| **Cấu trúc** | Thứ tự các phần, cách nhóm, các cột và căn chỉnh |
| **Bố cục** | Độ rộng nội dung, khoảng cách, tỉ lệ và tràn nội dung |
| **Kiểu chữ** | Phông chữ, độ đậm, cỡ chữ, chiều cao dòng và thứ bậc văn bản |
| **Màu sắc và bề mặt** | Chữ, nền, viền, đổ bóng và bo góc |
| **Nội dung** | Câu chữ chính xác, nhãn, liên kết và thông tin còn thiếu |
| **Hình ảnh và tài nguyên** | Đúng tệp, tỉ lệ, cách cắt và điểm nhấn |
| **Trạng thái tương tác** | Các trạng thái hover, focus, mở rộng, đang tải và phản hồi, khi có liên quan |
| **Hành vi responsive** | Cách xếp chồng, xuống dòng, điều hướng và khả năng sử dụng ở các độ rộng đã thống nhất |

Thứ tự này quan trọng vì một vấn đề lớn có thể gây ra nhiều vấn đề nhỏ. Ví dụ, một vùng nội dung quá rộng có thể làm văn bản xuống dòng khác đi, trông như thể có nhiều vấn đề về kiểu chữ và khoảng cách. Hãy sửa nguyên nhân gốc trước khi chỉnh từng triệu chứng.

## 4. Phân biệt lỗi với sở thích

Một **lỗi** (defect) là một điểm khác biệt so với một yêu cầu đang áp dụng. Một **sở thích** (preference) là một thay đổi bạn muốn nhưng chưa được duyệt.

| Quan sát | Phân loại | Cách phản hồi |
|---|---|---|
| Các góc thẻ vuông, nhưng hướng dẫn phong cách đặc tả 16px | Lỗi | Sửa phần triển khai |
| Câu chữ tiêu đề khác với nội dung chữ đã duyệt | Lỗi | Khôi phục câu chữ đã duyệt |
| Bạn thích một màu nền tối hơn | Sở thích | Ghi lại riêng nếu đáng để đề xuất |
| Không có tài liệu tham chiếu di động đã duyệt hay quy ước áp dụng nào | Khoảng trống đặc tả | Hỏi về quyết định còn thiếu |
| Một liên kết dẫn tới sai trang | Lỗi chức năng | Sửa nó và kiểm tra lại |

Một **khoảng trống đặc tả** (specification gap) nghĩa là các yêu cầu không nói rõ điều gì nên xảy ra.

Đừng thiết kế lại component trong khi duyệt thiết kế. Làm vậy sẽ thay thế một thiết kế đã thống nhất bằng thiết kế của riêng bạn.

Những khác biệt nhỏ khi hiển thị có thể xảy ra giữa các trình duyệt và máy tính. Trước khi coi mọi khác biệt nhỏ là lỗi, hãy kiểm tra xem phần triển khai có dùng đúng các giá trị hay không.

## 5. Viết các phát hiện có thể hành động được

Một **phát hiện** (finding) hữu ích xác định vị trí, kết quả mong đợi, kết quả thực tế và bằng chứng.

### Ví dụ về một phát hiện

| Trường | Ví dụ |
|---|---|
| **ID** | UI-01 |
| **Vị trí** | Danh sách liệu trình, các thẻ liệu trình dùng chung |
| **Điều kiện duyệt** | Viewport di động đã thống nhất, thu phóng trình duyệt ở 100% |
| **Mong đợi** | Các thẻ dùng bán kính bo góc 16px đã duyệt |
| **Thực tế** | Các thẻ có góc vuông |
| **Tài liệu tham chiếu** | Hướng dẫn phong cách đã duyệt, đặc tả thẻ |
| **Bằng chứng** | Ảnh chụp màn hình cho thấy các thẻ bị ảnh hưởng |
| **Chỉnh sửa cần thực hiện** | Áp dụng bán kính đã duyệt thông qua style dùng chung hiện có |

Tránh những phát hiện như:

> Các thẻ trông không ổn.

Không ai có thể hành động dựa trên câu đó. Hãy giải thích điểm gì khác biệt và nguồn nào xác lập kết quả mong đợi.

### Ưu tiên theo mức độ tác động

| Mức ưu tiên | Ví dụ |
|---|---|
| **Chặn việc sử dụng** | Không mở được menu, hoặc không thể tiếp cận nội dung |
| **Sai khác lớn** | Sai bố cục, thiếu nội dung hoặc liên kết tới sai trang |
| **Sai khác nhỏ** | Một khác biệt về khoảng cách hoặc viền với tác động hạn chế |

Mức ưu tiên quyết định thứ tự sửa lỗi. Nó không loại bỏ nhu cầu phải đáp ứng tiêu chí chấp nhận.

## 6. Yêu cầu Claude so sánh có trọng tâm

Nếu Claude có thể dùng công cụ kiểm tra trình duyệt và xem được các tài liệu tham chiếu, hãy dùng prompt sau:

```text
Review the implemented component against the approved references.

Scope:
[Identify the task, page and component.]

Review conditions:
[Provide the required viewport dimensions and states.]

Check:
- Structure and layout.
- Typography and shared style values.
- Exact content and assets.
- Links and specified interaction states.
- Responsive behaviour.
- Related usages affected by shared changes.

For each finding, report:
1. Location and reproduction conditions.
2. Expected result and supporting reference.
3. Actual result.
4. Evidence.
5. Suggested correction and affected scope.

Separate defects, specification gaps and optional preferences.

Do not change files or redesign the component.
State which references and browser states you actually inspected.
If browser access is unavailable, explain what remains unverified.
```

Hãy tự mình duyệt các phát hiện của Claude. Claude không được khẳng định đã thấy một trạng thái trình duyệt hay tài liệu tham chiếu mà nó không thể truy cập.

## 7. Sửa lỗi theo các nhóm hợp lý

Gom nhóm các phát hiện có chung một nguyên nhân:

- Sai khoảng đệm và căn chỉnh của thẻ có thể xuất phát từ một vấn đề style duy nhất.
- Sai đích đến của liên kết là một vấn đề riêng về nội dung hoặc định tuyến.
- Thiếu menu di động cần một chỉnh sửa hành vi riêng.

### Prompt sửa lỗi

```text
Correct findings UI-01 and UI-02 from the reviewed findings list.

Use the approved references already identified.
Preserve approved copy, assets and unrelated behaviour.

Before editing, confirm the relevant current code and Git changes.
Use the existing shared styling approach.
Do not add dependencies or perform unrelated refactoring.

After correction:
- Review the affected usages.
- Repeat the checks that originally failed.
- Run applicable project checks.
- Report results and remaining limitations.

Do not commit, push or deploy.

Findings:
[Paste the verified findings.]
```

Đừng đưa thẳng một danh sách đề xuất của AI chưa được kiểm tra vào triển khai. Hãy xác minh từng phát hiện trước.

## 8. Kiểm tra lại chỉnh sửa và các tác động của nó

Sau mỗi chỉnh sửa:

1. Lặp lại bước kiểm tra ban đầu trong cùng điều kiện.
2. Xác nhận rằng kết quả mong đợi giờ đã xuất hiện.
3. Kiểm tra những nơi sử dụng liên quan bị ảnh hưởng bởi thay đổi.
4. Chạy các bước kiểm tra áp dụng của dự án.
5. Cập nhật trạng thái của phát hiện.

Dùng các trạng thái sau:

- **Đang mở:** chưa được sửa.
- **Đã sửa, chờ xác minh:** đã có thay đổi nhưng chưa được kiểm tra.
- **Đã xác minh:** vấn đề ban đầu đã được kiểm tra lại và đã được giải quyết.
- **Chờ quyết định:** việc sửa phụ thuộc vào một quyết định mà người khác phải đưa ra.

Chỉ một thay đổi mã thì chưa đủ để đánh dấu **Đã xác minh**. Chỉ một lần kiểm tra lại thành công mới đủ.

### Ví dụ

Nếu khoảng cách của thẻ đã được thay đổi trong một style dùng chung, hãy kiểm tra:

- Thẻ nơi phát hiện ra vấn đề.
- Các thể hiện thẻ bắt buộc khác.
- Các thẻ có nội dung đã duyệt dài và ngắn.
- Các bố cục máy tính và di động liên quan.

## 9. Lưu một mốc lưu Git sau khi được chấp nhận

Khi người hướng dẫn chấp nhận phần việc đã duyệt của bạn, hãy lưu nó thành một mốc lưu Git, như bạn đã học ở Bài 1.4. Một **mốc lưu** (checkpoint) là một commit ghi lại một trạng thái đã được chấp nhận của dự án, để bạn có thể so sánh với nó hoặc quay lại nó sau này.

Nếu không có mốc lưu thường xuyên, công việc của nhiều ngày sẽ dồn lại thành các thay đổi chưa commit. Điều đó khiến bạn khó thấy điều gì đã thay đổi, khó hoàn tác một sai lầm và khó duyệt lại công việc về sau.

Hãy tuân theo các quy tắc Git của dự án. Nếu chúng cho phép bạn commit, hãy chạy các lệnh sau tại dấu nhắc lệnh của terminal trong thư mục dự án:

1. Xem lại tất cả thay đổi:

```bash
git status
```

2. Chỉ stage những tệp thuộc phần việc đã được chấp nhận, từng đường dẫn một:

```bash
git add path/to/accepted-file.tsx
```

3. Kiểm tra chính xác những gì đã được stage:

```bash
git diff --staged
```

4. Commit với một thông điệp rõ ràng theo quy ước của dự án:

```bash
git commit -m "[Message describing the accepted work]"
```

5. Ghi mã định danh của commit vào quyết định duyệt. `git log --oneline -1` sẽ hiển thị nó.

Chỉ commit phần việc đã được chấp nhận. Không đưa vào các thay đổi không liên quan, tệp môi trường hay tệp tạm thời. Push lên một repository dùng chung là một bước riêng, tuân theo quy tắc của dự án.

Claude không nên commit thay bạn trừ khi bạn yêu cầu và quy tắc của dự án cho phép.

## 10. Bài tập thực hành

**Nhiệm vụ: Duyệt và hoàn thiện component đã xây dựng ở Bài 4.3.**

1. Xác nhận các tài liệu tham chiếu và điều kiện duyệt.
2. So sánh phần triển khai theo thứ tự duyệt ở Phần 3.
3. Ghi lại các phát hiện thực sự kèm bằng chứng.
4. Tách lỗi khỏi sở thích và khoảng trống đặc tả.
5. Yêu cầu Claude sửa các lỗi đã được xác minh.
6. Kiểm tra lại các chỉnh sửa và những nơi sử dụng liên quan.
7. Nộp bản ghi duyệt.
8. Sau khi người hướng dẫn chấp nhận công việc, hãy lưu một mốc lưu Git.

Đừng bịa ra lỗi cho đủ chỉ tiêu. Nếu một bước kiểm tra đạt, hãy ghi lại bằng chứng hỗ trợ điều đó.

## 11. Sản phẩm cần nộp

Nộp:

- Các tài liệu tham chiếu và kích thước viewport đã dùng.
- Danh sách kiểm tra duyệt đã hoàn thành.
- Bảng các phát hiện với trạng thái hiện tại.
- Bằng chứng trước và sau cho các vấn đề đã sửa.
- Mỗi tiêu chí chấp nhận được đánh dấu **Đạt**, **Không đạt** hoặc **Chưa kiểm tra**.
- Các câu hỏi hoặc hạn chế còn lại.
- Mã định danh commit của mốc lưu, sau khi công việc được chấp nhận.

## 12. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Phạm vi đã triển khai đã được so sánh với các tài liệu tham chiếu đã duyệt.
- Các phát hiện cụ thể và có bằng chứng hỗ trợ.
- Lỗi được tách khỏi sở thích và khoảng trống đặc tả.
- Các chỉnh sửa nằm trong phạm vi đã thống nhất.
- Các vấn đề đã sửa và những nơi sử dụng bị ảnh hưởng đã được kiểm tra lại.
- Các hạn chế còn lại được báo cáo chính xác.
- Phần việc đã được chấp nhận được lưu thành mốc lưu Git, nếu quy tắc dự án cho phép.

## 13. Kiểm tra kiến thức

1. Vì sao viewport và trạng thái tương tác nên khớp với tài liệu tham chiếu?
2. Một lỗi khác với một sở thích như thế nào?
3. Thông tin nào khiến một phát hiện có thể hành động được?
4. Vì sao nên kiểm tra những nơi dùng chung sau một chỉnh sửa?
5. Vì sao phần việc đã được chấp nhận nên được lưu thành một mốc lưu Git?
