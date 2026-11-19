# Bài 9.4: Rà soát thay đổi Git, triển khai lên staging và xác minh kết quả

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Xác nhận công việc đã sẵn sàng và được cho phép để deploy lên staging.
- Rà soát, đưa vào vùng chờ (stage) và commit chỉ những thay đổi dự định.
- Tuân theo phương thức deploy đã được ghi trong tài liệu của dự án mà không tùy tiện ứng biến.
- Xác minh website staging so với kết quả ở máy cục bộ.
- Ghi lại việc deploy và phần xác minh tách biệt với việc chấp nhận.

**Điều kiện tiên quyết:** Hoàn thành Bài 9.1 đến 9.3, với các phát hiện đã được ghi lại và duyệt.

**Tài liệu cần chuẩn bị:** Hướng dẫn dự án, quy trình phân nhánh (branching) và deploy đã được ghi trong tài liệu, văn bản cho phép deploy, tên các biến môi trường từ Bài 9.1, hồ sơ QA, các bài kiểm thử Playwright và sổ theo dõi trang từ Bài 9.3.

## 1. Hiểu về staging

**Môi trường staging** là một bản sao của website được lưu trữ trực tuyến để kiểm thử trước khi phát hành. Nó cần hoạt động giống website production, tức phiên bản công khai đang chạy, đồng thời được bảo vệ khỏi việc sử dụng công khai.

| Môi trường | Mục đích | Ai sử dụng |
|---|---|---|
| Cục bộ (local) | Xây dựng và kiểm thử trên máy tính của bạn | Bạn |
| Staging | Kiểm thử website đã deploy trong môi trường được lưu trữ | Nhóm dự án và người duyệt |
| Production | Website công khai | Khách truy cập |

Staging làm lộ ra những vấn đề mà kiểm thử cục bộ không phát hiện được, chẳng hạn:

- Cấu hình bị thiếu trên host.
- Các route bị lỗi khi tải lại trang.
- Tên tệp chỉ khác nhau ở chữ in hoa.
- Tài sản tải được ở máy cục bộ nhưng không tải được từ đường dẫn trên host.

**Bài học này chỉ deploy lên staging. Deploy lên production là một quyết định riêng và không thuộc bài học này.**

## 2. Xác nhận quyền cho phép và phương thức đã được ghi lại

Deploy làm thay đổi một thứ nằm ngoài máy tính của bạn. Trước khi deploy, hãy xác nhận:

| Câu hỏi | Tìm câu trả lời ở đâu |
|---|---|
| Việc deploy lên staging cho phạm vi này đã được cho phép chưa? | Quyết định của người hướng dẫn hoặc quy tắc dự án |
| Dịch vụ lưu trữ và dự án nào được sử dụng? | Tài liệu kiến trúc hoặc tài liệu deploy |
| Việc deploy được kích hoạt như thế nào? | Tài liệu deploy |
| Branch nào deploy lên staging? | Quy tắc phân nhánh |
| Ai cung cấp cấu hình môi trường trên host? | Đặc tả tích hợp hoặc người hướng dẫn |
| Staging được bảo vệ khỏi truy cập công khai và lập chỉ mục như thế nào? | Tài liệu deploy |
| Làm thế nào để đảo ngược một lần deploy? | Tài liệu deploy |

Các phương thức deploy rất đa dạng. Các cách phổ biến gồm:

- **Hosting kết nối với Git**, trong đó việc push một branch sẽ tự động build một bản deploy preview hoặc staging.
- **Một lệnh deploy** chạy từ terminal bằng công cụ dòng lệnh của host.
- **Một quy trình thủ công** thực hiện qua website của host.

Thông tin về hosting của dự án thực hành chưa được cung cấp cùng chương trình học này. Hãy dùng phương thức mà dự án của bạn thực sự ghi lại.

Nếu phương thức chưa được ghi lại, hãy dừng lại và hỏi. Đừng tự chọn dịch vụ lưu trữ, tạo tài khoản hay kết nối kho lưu trữ.

## 3. Kiểm tra mức sẵn sàng trước khi deploy

Hãy deploy những công việc đã được duyệt, không phải công việc đang dang dở.

| Hạng mục sẵn sàng | Bằng chứng |
|---|---|
| Phạm vi | Các trang và tính năng có trong lần deploy này |
| Trạng thái duyệt | Các quyết định liên quan của người hướng dẫn từ các học phần trước |
| Các phát hiện còn mở | Các vấn đề tồn đọng, có ghi lại những vấn đề được chấp nhận đưa vào lần deploy |
| Các bước kiểm tra của dự án | Type check, lint và bản build production đều đạt |
| Kiểm thử tự động | Các bài kiểm thử Playwright đạt ở máy cục bộ |
| Rà soát an toàn | Các phát hiện của Bài 9.1 đã được giải quyết hoặc chấp nhận |
| Cấu hình | Đã xác định tên các biến môi trường bắt buộc |

Một lần deploy lên staging có thể bao gồm các vấn đề đã biết nếu người hướng dẫn chấp nhận. Hãy ghi lại những vấn đề nào được đưa vào để người duyệt không báo cáo chúng như vấn đề mới.

## 4. Rà soát các thay đổi trong Git

Bài 4.3 đã giới thiệu cách rà soát thay đổi bằng Git, và Bài 4.4 đã giới thiệu cách lưu công việc được chấp nhận thành một mốc lưu. Trước khi commit để deploy, hãy rà soát mọi thứ sẽ được đưa vào.

Dùng chế độ xem Source Control của VS Code, với các lệnh terminal tương đương. Chạy các lệnh trong terminal tích hợp, từ thư mục dự án.

### Xem những gì đã thay đổi

Trong chế độ xem Source Control, danh sách **Changes** và **Staged Changes** hiển thị mọi tệp đã sửa đổi, đã stage và chưa được theo dõi. Chọn một tệp để xem diff của nó. Trong terminal:

```bash
git status
```

Lệnh này liệt kê các tệp đã sửa đổi, đã stage và chưa được theo dõi.

### Rà soát các thay đổi chưa stage

```bash
git diff
```

### Rà soát các commit gần đây

Source Control Graph trong chế độ xem Source Control hiển thị lịch sử commit và những commit nào chưa được push. Trong terminal:

```bash
git log --oneline -10
```

Lệnh này hiển thị mười commit gần nhất trên branch hiện tại.

### Cần chú ý điều gì

| Mối lo ngại | Ví dụ |
|---|---|
| Thông tin xác thực | Một tệp môi trường hoặc một khóa trong mã |
| Dữ liệu cá nhân | Thông tin yêu cầu tư vấn thật trong các tệp kiểm thử |
| Phần gỡ lỗi còn sót | Các câu lệnh `console.log`, mã bị chú thích (comment) bỏ |
| Tệp tạm thời | Ảnh chụp màn hình, báo cáo kiểm thử hoặc ghi chú cục bộ |
| Thay đổi không liên quan | Các chỉnh sửa nằm ngoài phạm vi deploy |
| Đầu ra được tạo tự động | Các thư mục build mà dự án không theo dõi |

Kiểm tra để đảm bảo `.gitignore` bao gồm đầu ra build và báo cáo kiểm thử ở những nơi dự án yêu cầu, như thư mục báo cáo của Playwright.

Nếu bạn phát hiện thứ gì đó không nên được commit, đừng commit nó. Hãy điều tra và sửa trước.

## 5. Stage và commit một cách có chủ đích

**Stage** trong Git nghĩa là chọn những thay đổi nào sẽ đi vào commit tiếp theo. Đây là cách dùng từ khác với môi trường staging.

Stage các tệp cụ thể thay vì tất cả. Trong chế độ xem Source Control, chọn **+** (Stage Changes) bên cạnh mỗi tệp đã rà soát. Trong terminal:

```bash
git add path/to/changed-file.tsx
```

Sau đó rà soát chính xác những gì đã được stage, bằng cách chọn từng tệp trong danh sách Staged Changes hoặc dùng:

```bash
git diff --staged
```

`git diff --staged` và `git diff --cached` là cùng một lệnh, như Bài 4.3 đã giải thích.

Tránh dùng **Stage All Changes**, `git add .` và `git add -A` trừ khi bạn vừa xác nhận rằng mọi thay đổi được liệt kê đều thuộc về commit này.

Commit với một thông điệp rõ ràng tuân theo quy ước của dự án, bằng cách gõ nó vào ô thông điệp và chọn **Commit**, hoặc trong terminal:

```bash
git commit -m "[Message following the project convention]"
```

Một thông điệp hữu ích mô tả điều gì đã thay đổi và vì sao, chẳng hạn nó xử lý phát hiện hoặc nhiệm vụ nào.

### Tuân theo quy tắc phân nhánh

Chỉ push lên branch mà dự án ghi lại cho mục đích này. Trước tiên hãy kiểm tra branch hiển thị ở góc dưới bên trái của VS Code.

Trong chế độ xem Source Control, chọn **More Actions (...) > Push**. Dùng Push thay vì **Sync Changes**: Sync còn kéo (pull) các thay đổi từ GitHub, nên nó làm nhiều hơn những gì bạn dự định ở đây. Trong terminal:

```bash
git push origin [branch-name]
```

Sau khi push, hãy xác nhận trên GitHub rằng commit xuất hiện trên branch đã được ghi lại.

Đừng push trực tiếp lên branch main, force push hay xóa branch trừ khi quy tắc dự án cho phép.

Nếu một lần push bị từ chối, hãy đọc thông báo và nhờ hỗ trợ. Đừng dùng các tùy chọn ghi đè việc từ chối đó.

## 6. Cấu hình môi trường staging

Website staging cần có cấu hình riêng.

| Hạng mục | Cách xử lý mong đợi |
|---|---|
| Biến môi trường | Được người có thẩm quyền đặt trên host, dùng giá trị staging hoặc giá trị kiểm thử |
| Thông tin xác thực | Thông tin xác thực kiểm thử, không phải thông tin production, trừ khi người hướng dẫn quyết định khác |
| Đích nhận biểu mẫu | Các đích kiểm thử đã phê duyệt từ Bài 7.1 |
| Bảo vệ truy cập | Mật khẩu hoặc hình thức bảo vệ khác như đã ghi trong tài liệu |
| Lập chỉ mục | `noindex` hoặc bảo vệ, như đã kiểm tra ở Bài 9.3 |
| Phân tích và theo dõi | Tắt trừ khi được phê duyệt cho staging |

Bạn có thể cần cung cấp danh sách tên các biến bắt buộc từ Bài 9.1. Tuyệt đối không gửi giá trị qua chat, email hay prompt. Hãy tuân theo phương thức chia sẻ bí mật của dự án.

## 7. Deploy và ghi lại lần deploy

Tuân theo chính xác phương thức đã được ghi lại.

Sau khi deploy, hãy ghi lại:

| Trường | Cần ghi gì |
|---|---|
| Ngày và giờ | Thời điểm lần deploy hoàn tất |
| Commit | Mã định danh của commit đã deploy |
| Branch | Branch đã deploy |
| Phương thức | Lần deploy được kích hoạt như thế nào |
| Địa chỉ staging | Nơi có thể duyệt website |
| Kết quả build | Bản build trên host có thành công hay không, kèm mọi cảnh báo |
| Người thực hiện | Ai đã deploy |

Nếu bản build trên host thất bại, hãy đọc build log của nó. Các nguyên nhân thường gặp gồm thiếu biến môi trường, phiên bản Node.js khác nhau hoặc tên tệp không khớp chữ hoa/thường. Hãy ghi lại lỗi và điều tra nó như một phát hiện. Đừng deploy lại liên tục khi chưa có thay đổi nào.

## 8. Xác minh website staging

Một bản build thành công không chứng minh website hoạt động. Hãy xác minh nó.

### Xác nhận phiên bản đã deploy

Kiểm tra để đảm bảo staging đang chạy đúng commit đã ghi lại. Nhiều host hiển thị commit cho từng lần deploy. Nếu host của bạn không hiển thị, hãy hỏi cách xác nhận.

### Smoke test website

**Smoke test** là một bước kiểm tra nhanh xem các phần chính có hoạt động hay không trước khi kiểm thử chi tiết.

| Kiểm tra | Kết quả mong đợi |
|---|---|
| Trang chủ tải qua HTTPS | Không có cảnh báo bảo mật của trình duyệt |
| Mỗi route đã phê duyệt tải trực tiếp được | Đúng trang, không phải trang lỗi |
| Tải lại một trang nội bộ | Trang tải lại chính xác |
| Liên kết ở header và footer | Dẫn đến đúng các đích đã phê duyệt |
| Hình ảnh, font và style | Tải chính xác |
| Console của trình duyệt | Không có lỗi trên các trang đã chọn |
| Bảng Network | Không có request thất bại |

Tải lại các trang nội bộ là rất quan trọng. Một số cấu hình hosting chỉ phục vụ đúng trang chủ, nên các route nội bộ hoạt động khi được truy cập qua liên kết nhưng bị lỗi khi tải lại hoặc truy cập trực tiếp.

### Kiểm tra hành vi phụ thuộc vào môi trường

| Kiểm tra | Kết quả mong đợi |
|---|---|
| Các tính năng dùng biến môi trường | Hoạt động với cấu hình staging |
| Biểu mẫu | Gửi đến đúng đích kiểm thử đã phê duyệt, chỉ trong phạm vi các sắp xếp kiểm thử được cho phép |
| Cơ chế kiểm soát lập chỉ mục | Staging được bảo vệ hoặc được đánh dấu `noindex`, như Bài 9.3 đã xác lập |
| Bảo vệ truy cập | Khách truy cập không có quyền không xem được website, nếu có yêu cầu |

### Chạy kiểm thử tự động trên staging

Nếu cấu hình Playwright đọc địa chỉ từ một biến môi trường, như trong Bài 8.4, bạn có thể chạy các bài kiểm thử trên staging. Trong terminal macOS hoặc Linux:

```bash
BASE_URL=[staging address] npx playwright test
```

Cú pháp đặt biến môi trường khác nhau trong các terminal Windows. Hãy kiểm tra hướng dẫn của dự án cho terminal của bạn.

Nếu staging được bảo vệ bằng mật khẩu, các bài kiểm thử có thể cần cấu hình truy cập được cho phép. Hãy hỏi trước khi thêm bất kỳ thông tin xác thực nào vào phần thiết lập kiểm thử.

Chỉ chạy những bài kiểm thử an toàn cho môi trường staging. Đừng chạy các bài kiểm thử gửi biểu mẫu đến các đích thật.

### So sánh với kết quả cục bộ

Chạy Lighthouse trên các trang chính, như trong Bài 8.3, 9.2 và 9.3. Hosting có thể thay đổi hiệu năng, nên kết quả có thể khác với các phép đo cục bộ. Hãy ghi lại cả hai.

## 9. Ghi lại các khác biệt giữa cục bộ và staging

Bất kỳ hành vi nào khác nhau giữa cục bộ và staging đều là một phát hiện.

| Phát hiện | Nguyên nhân có thể cần điều tra |
|---|---|
| Trang nội bộ trả về không tìm thấy khi tải lại | Cấu hình định tuyến của host |
| Ảnh chỉ bị thiếu trên staging | Chữ hoa/thường trong tên tệp hoặc đường dẫn |
| Biểu mẫu chỉ lỗi trên staging | Thiếu biến môi trường trên host |
| Staging xuất hiện trong kết quả tìm kiếm | Thiếu bảo vệ hoặc `noindex` |
| Bố cục khác | Tệp cũ được lưu trong bộ nhớ đệm hoặc khác biệt khi build |

Thêm các phát hiện này vào hồ sơ QA và tuân theo quy trình sửa lỗi từ Bài 8.2. Kiểm thử lại trên staging sau khi các bản sửa được deploy lại.

## 10. Biết cách đảo ngược một lần deploy

Trước khi sự cố xảy ra, hãy biết cách đã được ghi lại để khôi phục bản deploy staging hoạt động trước đó. Nhiều host cho phép làm việc này từ bảng điều khiển (dashboard) của họ.

Nếu staging bị hỏng nghiêm trọng:

1. Ghi lại bằng chứng.
2. Thông báo cho người hướng dẫn.
3. Tuân theo phương thức đảo ngược đã được ghi lại nếu bạn được phép dùng nó.

Đừng tùy tiện sửa trực tiếp trên host hoặc đảo ngược commit trong Git khi chưa có chỉ đạo.

## 11. Nhờ Claude hỗ trợ việc deploy

### Prompt rà soát trước khi deploy

```text
Review readiness for a staging deployment.

Before reviewing:
- Read the project instructions, branching rules and
  deployment documentation.
- Confirm the current branch, Git status and recent commits.

Check:
- Which changes would be included, file by file.
- Any credentials, personal data, debugging output,
  temporary files or generated output in the changes.
- Whether .gitignore covers environment files, build
  output and test reports.
- Whether the type check, lint, production build and
  Playwright tests pass.
- Which environment variable names the staging host needs.
- Whether the documented deployment method, branch and
  reversal method are clear.

Report findings and any missing documentation.
Never print secret values.

Review only. Do not stage, commit, push or deploy.

Deployment scope:
[Insert the scope and authorisation reference.]
```

### Prompt xác minh staging

```text
Verify the staging website against the deployment scope.

Staging address and deployed commit:
[Insert address and commit.]

Check:
- The deployed commit matches the recorded commit.
- Each approved route loads directly and after refresh.
- Navigation, images, fonts and styles load correctly.
- Browser console errors and failed network requests.
- Indexing controls and access protection on staging.
- Behaviour that depends on environment configuration.

Compare results with the local evidence in the QA record.
Report every difference as a finding with evidence.

Do not submit forms, send messages or trigger external
actions outside the authorised test arrangements.
Do not edit files, commit, push or deploy.
State which checks you actually performed.
```

## 12. Tách biệt việc deploy với việc chấp nhận

| Hồ sơ | Cho thấy điều gì |
|---|---|
| Hồ sơ deploy | Những gì đã được deploy, khi nào và như thế nào |
| Xác minh staging | Những gì đã được kiểm tra trên staging và kết quả |
| Quyết định của người hướng dẫn | Công việc trên staging có được chấp nhận hay không |
| Cho phép production | Việc phát hành công khai có được phê duyệt hay không |

Một lần deploy staging thành công không có nghĩa là công việc đã được chấp nhận. Việc chấp nhận không cho phép deploy lên production. Hãy giữ mỗi quyết định tách biệt trong hồ sơ của bạn.

## 13. Bài tập thực hành

**Nhiệm vụ: Deploy công việc đã được duyệt lên staging và xác minh nó.**

1. Xác nhận quyền cho phép và phương thức deploy đã được ghi lại.
2. Hoàn thành bước kiểm tra mức sẵn sàng.
3. Rà soát mọi thay đổi bằng Git.
4. Chỉ stage và commit những thay đổi dự định.
5. Push lên branch đã được ghi lại.
6. Xác nhận cấu hình staging với người có thẩm quyền.
7. Deploy bằng phương thức đã được ghi lại và ghi chép lần deploy.
8. Xác minh phiên bản đã deploy và smoke test website.
9. Kiểm tra hành vi phụ thuộc vào môi trường và các cơ chế kiểm soát lập chỉ mục.
10. Chạy các bài kiểm thử tự động an toàn trên staging.
11. Ghi lại các khác biệt thành phát hiện.

Nếu việc deploy chưa được cho phép hoặc phương thức chưa được ghi lại, hãy hoàn thành các bước 2 đến 4, chuẩn bị yêu cầu deploy và dừng lại.

## 14. Sản phẩm cần nộp

Nộp:

- Tham chiếu văn bản cho phép deploy.
- Kết quả kiểm tra mức sẵn sàng.
- Tóm tắt các thay đổi Git đã rà soát và thông điệp commit.
- Hồ sơ deploy.
- Kết quả xác minh staging.
- Kết quả kiểm thử tự động trên staging.
- So sánh Lighthouse giữa cục bộ và staging.
- Các phát hiện mới về khác biệt giữa cục bộ và staging.
- Xác nhận rằng không có bí mật nào được chia sẻ ngoài phương thức đã được ghi lại.

## 15. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Việc deploy đã được cho phép và tuân theo phương thức đã được ghi lại.
- Chỉ những thay đổi dự định, đã được rà soát, được commit.
- Hồ sơ deploy xác định được commit đã deploy.
- Staging đã được xác minh, không chỉ được build.
- Các cơ chế kiểm soát lập chỉ mục và truy cập trên staging đã được xác nhận.
- Các khác biệt so với hành vi cục bộ được ghi lại thành phát hiện.
- Việc deploy, việc chấp nhận và việc cho phép production vẫn được tách biệt.

## 16. Kiểm tra kiến thức

1. Vì sao bạn nên tránh dùng Stage All Changes hoặc `git add .` khi chưa rà soát các thay đổi?
2. Vì sao tải lại một trang nội bộ là một bước kiểm tra quan trọng trên staging?
3. Vì sao staging nên dùng cấu hình và đích nhận kiểm thử?
4. Bạn nên làm gì nếu bản build trên host thất bại?
5. Một lần deploy staging thành công có nghĩa là công việc đã được chấp nhận không?
