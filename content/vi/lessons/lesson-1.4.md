# Bài 1.4: Chạy website mẫu và lưu một mốc Git

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Chạy dự án khởi đầu được cung cấp bằng các lệnh đã có trong tài liệu.
- Mở địa chỉ cục bộ mà dự án báo ra.
- Giải thích các khái niệm thay đổi đang làm, staging và commit trong Git.
- Duyệt và lưu một mốc Git có phạm vi rõ ràng trong chế độ xem Source Control của VS Code.
- Push mốc lưu lên GitHub từ VS Code, khi việc push được cho phép.
- Báo cáo các lỗi cài đặt mà không làm ảnh hưởng đến các công việc không liên quan.

**Điều kiện tiên quyết:** Hoàn thành Bài 1.1 đến 1.3.

**Tài liệu cần chuẩn bị:** Không gian làm việc VS Code từ Bài 1.2 với dự án khởi đầu đang mở, hướng dẫn cài đặt đã được phê duyệt, môi trường chạy cần thiết như Node.js, một trình duyệt, kho Git của dự án và, nếu được phép push, quyền truy cập GitHub mà người hướng dẫn đã sắp xếp.

## 1. Xác nhận trạng thái ban đầu

**Git** là công cụ ghi lại lịch sử các tệp của một dự án. Một **kho mã** (repository) là một thư mục dự án có lịch sử đang được Git ghi lại.

Mở chế độ xem Source Control trong VS Code. Nếu danh sách thay đổi trống, Git không thấy tệp nào bị thay đổi hoặc tệp mới.

Sau đó kiểm tra điều tương tự trong terminal tích hợp. Xác nhận bạn đang ở đâu:

```bash
pwd
```

Rồi yêu cầu Git đưa ra bản tóm tắt ngắn về các thay đổi:

```bash
git status --short
```

Không có đầu ra nghĩa là Git không thấy tệp nào bị thay đổi hoặc tệp mới. Nếu có một danh sách, nghĩa là có gì đó đã thay đổi. Hãy tìm hiểu các thay đổi đó thuộc về việc gì trước khi tiếp tục.

Nếu Git báo đây không phải là một kho mã, hãy ghi lại điều đó như một phát hiện về cài đặt. Không tạo kho mã mới đè lên một dự án mà bạn không chắc chắn. Làm vậy sẽ bắt đầu một lịch sử mới và che mất lịch sử thật.

Một kết quả sạch sẽ không liệt kê các tệp mà Git được chỉ định bỏ qua. Nó cũng không chứng minh rằng mọi yêu cầu của dự án đã đầy đủ.

## 2. Làm theo hướng dẫn cài đặt đã có

Sử dụng môi trường chạy, trình quản lý gói và lệnh cài đặt mà bạn đã xác định ở Bài 1.3.

**Cài đặt dependencies** là tải về các gói được liệt kê trong `package.json`. Nếu chúng đã được cài, hãy tìm hiểu xem có cần cài lại không trước khi lặp lại.

Nếu thiếu hướng dẫn cài đặt, hãy hỏi về đúng quyết định cụ thể mà bạn cần. Không bao giờ thay đổi phiên bản framework hoặc chuyển sang một trình quản lý gói khác như một lối tắt.

Ghi lại mọi lệnh bạn thực sự chạy và kết quả của chúng.

## 3. Khởi động và kiểm tra website

Chạy lệnh phát triển đã có trong tài liệu của dự án trong terminal tích hợp của VS Code. **Lệnh phát triển** (development command) khởi động một máy chủ cục bộ hiển thị website trên máy tính của bạn và thường tự tải lại khi các tệp thay đổi.

Terminal sẽ in ra một địa chỉ cục bộ, thường bắt đầu bằng `http://localhost:`. Mở đúng địa chỉ đó trong trình duyệt. Đừng đoán con số ở cuối, gọi là **cổng** (port), và đừng cho rằng máy chủ đã khởi động chỉ vì chưa có lỗi nào xuất hiện.

Kiểm tra rằng:

1. Trang khởi đầu mong đợi tải được.
2. Đó là dự án khởi đầu được cung cấp, không phải một dự án khác.
3. Terminal không báo lỗi khởi động nào.
4. Mọi hình ảnh và tài nguyên cần thiết khác đều hiển thị.

Để lệnh phát triển tiếp tục chạy trong lúc bạn dùng trang cục bộ. Nếu cần chạy lệnh khác trong lúc đó, hãy mở terminal thứ hai bằng **Terminal > New Terminal**, để máy chủ vẫn chạy trong terminal thứ nhất. Đóng terminal đó sẽ làm website dừng. Để dừng máy chủ, hãy dùng cách đã có trong tài liệu ở terminal đang chạy nó. Với nhiều lệnh phát triển, đó là nhấn đồng thời **Control và C**.

## 4. Hiểu về mốc Git

Git theo dõi các thay đổi qua ba giai đoạn:

| Thuật ngữ | Ý nghĩa |
|---|---|
| **Thay đổi đang làm** (working changes) | Các chỉnh sửa hiện có trong tệp, chưa được ghi lại |
| **Thay đổi đã staging** (staged changes) | Các thay đổi được chọn để đưa vào commit tiếp theo |
| **Commit** | Một ảnh chụp được ghi lại của các thay đổi đã chọn, kèm thông điệp và mã định danh |
| **Push** | Gửi các commit lên một **kho remote**, một bản sao được lưu trên máy chủ như GitHub |

Một **mốc lưu** (checkpoint) là một commit ghi lại một trạng thái đã biết và đã được chấp nhận, để bạn có thể so sánh hoặc quay lại sau này.

Một commit trên máy tính của bạn không phải là một lượt deploy, và cũng không phải bản sao lưu của mọi tệp. Các tệp Git bỏ qua, và các tệp mới chưa được staging, sẽ không được đưa vào.

## 5. Duyệt trước khi commit

Luôn xem những gì sẽ được commit trước khi commit.

### Trong chế độ xem Source Control

Danh sách **Changes** hiển thị mọi tệp khác với commit gần nhất. Một chữ cái cạnh mỗi tệp cho biết lý do nó được liệt kê: **M** là đã sửa đổi (modified), **U** là chưa được theo dõi (untracked, mới với Git) và **D** là đã xóa (deleted).

- Chọn một tệp đã sửa đổi để mở diff: phiên bản commit gần nhất ở một bên và phiên bản của bạn ở bên kia.
- Chọn một tệp chưa được theo dõi để mở nó. Tệp này không có phiên bản trước để so sánh, nên hãy đọc toàn bộ tệp.

### Trong terminal

Các bước kiểm tra tương tự dưới dạng lệnh. Xem các thay đổi trong những tệp Git đã theo dõi:

```bash
git diff
```

Lệnh này hiển thị các thay đổi **chưa staging**. Nó không hiển thị nội dung của các tệp mới, chưa được theo dõi. Hãy mở riêng những tệp đó.

Xem các thay đổi bạn đã staging:

```bash
git diff --staged
```

Bạn cũng có thể thấy lệnh này được viết là `git diff --cached`. Cả hai đều làm cùng một việc.

Chỉ đưa vào phần bài thực hành đã thống nhất. Không bao giờ staging mật khẩu hoặc thông tin xác thực khác, đầu ra được tạo tự động, hay thay đổi của người khác.

## 6. Lưu mốc đã thống nhất

Nếu có các thay đổi sẵn sàng để lưu, và việc lưu mốc được cho phép:

1. Trong chế độ xem Source Control, di chuột lên từng tệp đã duyệt và chọn **+** (Stage Changes). Các tệp đã staging sẽ chuyển sang danh sách **Staged Changes**.
2. Kiểm tra danh sách Staged Changes chỉ chứa các tệp dự định. Chọn một tệp đã staging để xem chính xác những gì sẽ được commit.
3. Gõ một thông điệp rõ ràng vào ô thông điệp, chẳng hạn “Record verified starter setup”.
4. Chọn **Commit**.

Tránh dùng **Stage All Changes** trừ khi bạn vừa duyệt mọi tệp trong danh sách. Nếu VS Code đề nghị staging tất cả thay đổi và commit chúng vì chưa có gì được staging, hãy từ chối và tự staging các tệp bạn đã duyệt.

Để làm tương tự trong terminal, hãy staging từng tệp theo đường dẫn thực tế của nó. Thay đường dẫn ví dụ:

```bash
git add -- "actual/path/to/reviewed-file"
```

Dấu `--` cho Git biết phần theo sau là đường dẫn tệp, giúp tránh nhầm lẫn với các tên tệp bất thường.

Lặp lại cho từng tệp dự định. Sau đó kiểm tra kết quả bằng `git diff --staged` và `git status --short`.

Nếu nội dung đã staging là đúng, hãy commit nó với một thông điệp rõ ràng:

```bash
git commit -m "Record verified starter setup"
```

Nếu không có thay đổi dự định nào, đừng tạo chỉnh sửa giả hoặc một commit rỗng chỉ để hoàn thành bài tập. Thay vào đó, hãy ghi lại commit gần nhất hiện có, mà bạn có thể xem bằng `git log --oneline -1`.

Sau khi commit, chế độ xem Source Control không liệt kê thay đổi nào, và `git log --oneline -1` hiển thị commit mới của bạn cùng mã định danh của nó.

## 7. Push mốc lưu lên GitHub, nếu được phép

Một commit nằm lại trên máy tính của bạn. **Push** gửi nó lên kho remote trên GitHub.

Chỉ push nếu người hướng dẫn đã cho phép push trong bài tập này, và chỉ lên branch mà họ chỉ định. Kiểm tra branch hiển thị ở góc dưới bên trái của VS Code trước khi push.

1. Trong chế độ xem Source Control, chọn **More Actions (...) > Push**.
2. Nếu VS Code hiển thị **Publish Branch** thay vào đó, nghĩa là branch chưa tồn tại trên GitHub. Chỉ publish nếu người hướng dẫn đã chỉ định branch này.
3. Mở kho mã trên GitHub trong trình duyệt và xác nhận commit của bạn xuất hiện ở đó.

Lệnh tương đương trong terminal là `git push`.

Không bao giờ force push. Nếu push thất bại, đừng tiếp tục nhấn Push hoặc Sync. Ghi lại thông báo và hỏi người hướng dẫn.

Nếu không được phép push, hãy để commit trên máy tính của bạn và ghi lại rằng nó chưa được push.

Không deploy trong bài học này.

Git gắn nhãn mỗi commit bằng một tên và địa chỉ email. Nếu Git báo những thông tin này chưa được thiết lập, hãy làm theo hướng dẫn cài đặt của tổ chức. Không bao giờ tự đặt ra một cái tên hoặc dùng thông tin của người khác.

Các bài học sau sẽ lưu một mốc mỗi khi một phần công việc được chấp nhận, bắt đầu từ Bài 4.4.

## 8. Nhờ Claude hỗ trợ cài đặt

```text
Help run the supplied starter using its documented setup.
First confirm the project location, Git state, runtime requirements,
package manager and existing scripts.

Perform only the authorised setup and local run steps.
Do not change application code merely to hide setup errors.
Report the actual local URL, observed result and any blocker.

Before a local checkpoint, show the intended files and explain them.
Preserve existing unrelated work. Do not push or deploy.
```

Đọc mọi lệnh Claude đề xuất trước khi cho phép nó chạy. Ở đây Claude không commit hay push: bạn tự làm việc đó trong chế độ xem Source Control, sau khi duyệt các thay đổi.

## 9. Bài tập thực hành

**Nhiệm vụ: Chạy dự án khởi đầu và ghi lại một mốc lưu.**

1. Xác nhận thư mục dự án và trạng thái Git.
2. Hoàn tất mọi bước cài đặt cần thiết đã có trong tài liệu.
3. Chạy website và kiểm tra nó trong trình duyệt.
4. Ghi lại bằng chứng cho thấy website đã khởi động đúng.
5. Duyệt mọi thay đổi dự định trong chế độ xem Source Control.
6. Staging và commit mốc lưu đã được cho phép, hoặc ghi lại commit gần nhất hiện có nếu không có gì thay đổi.
7. Nếu được phép push, hãy push lên branch đã chỉ định và xác nhận commit trên GitHub. Nếu không, ghi lại rằng nó vẫn chỉ ở máy cục bộ.
8. Ghi lại mọi vấn đề còn tồn đọng.

## 10. Sản phẩm cần nộp

Nộp:

- Các lệnh bạn đã chạy.
- Kết quả khởi động.
- Bằng chứng về trang cục bộ, chẳng hạn một ảnh chụp màn hình.
- Các tệp bạn đã duyệt, kèm ảnh chụp màn hình danh sách Staged Changes trước khi commit.
- Mã định danh của commit mốc lưu, nếu có tạo commit.
- Commit đã được push hay chưa và, nếu đã push, tên branch cùng bằng chứng rằng commit xuất hiện trên GitHub.

Không đưa vào mật khẩu, token hay các bí mật khác.

## 11. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Dự án khởi đầu chạy đúng như tài liệu mô tả.
- Công việc hiện có được giữ nguyên.
- Mốc lưu mới, hoặc phiên bản ban đầu không thay đổi, được ghi lại chính xác.
- Không có gì được push khi chưa được phép, và mọi lượt push đều lên đúng branch đã chỉ định.

## 12. Kiểm tra kiến thức

1. Vì sao bạn nên dùng đúng địa chỉ mà lệnh phát triển in ra?
2. Staging trong Git nghĩa là gì?
3. Chế độ xem Source Control đánh dấu một tệp mới, chưa được theo dõi như thế nào, và vì sao bạn phải đọc toàn bộ tệp trước khi staging nó?
4. Một commit trên máy tính của bạn khác một lượt push như thế nào?
5. Bạn nên làm gì khi không có gì phù hợp để commit?

## 13. Tài liệu tham khảo chính thức

- [Git status](https://git-scm.com/docs/git-status)
- [Git add](https://git-scm.com/docs/git-add)
- [Git commit](https://git-scm.com/docs/git-commit)

Được tác giả tải lên kiểm tra ngày 13 tháng 11 năm 2026 về vai trò của các lệnh Git được dùng trong bài.

- [Source control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview) và [Working with repositories and remotes](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes), được kiểm tra ngày 15 tháng 11 năm 2026 về staging, commit và push trong VS Code.
