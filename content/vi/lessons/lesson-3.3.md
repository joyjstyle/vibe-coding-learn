# Bài 3.3: Chuẩn bị PRD, kiến trúc, quy tắc và kế hoạch công việc

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Soạn bản nháp bốn tài liệu hướng dẫn, mỗi tài liệu có một mục đích riêng.
- Mô tả kiến trúc dựa trên bằng chứng từ dự án khởi đầu (starter project).
- Biến một yêu cầu thành một tác vụ có phạm vi rõ ràng kèm các bước kiểm tra tương ứng.
- Kết nối các nguồn đã duyệt, yêu cầu, cách triển khai và kế hoạch công việc.
- Ghi lại thông tin còn thiếu mà không bịa ra quyết định.

**Điều kiện tiên quyết:** Hoàn thành Bài 3.1 và 3.2. Chuẩn bị sẵn bản mô tả website và cấu trúc website đã được duyệt từ Học phần 2, cùng kết quả kiểm tra dự án khởi đầu từ Bài 1.3.

**Tài liệu cần chuẩn bị:** Sổ đăng ký tham chiếu, bản đồ tài liệu, IA đã duyệt, các tài liệu tham chiếu về thiết kế và nội dung, dự án khởi đầu và mọi tài liệu hướng dẫn hiện có. Các khung tài liệu trống và mẫu tác vụ/phụ thuộc đã được kèm trong bài học này.

**Kết quả của bạn:** Bốn bản nháp tài liệu hướng dẫn, một chuỗi truy vết hoàn chỉnh từ yêu cầu đến xác minh và một bản ghi phụ thuộc. Mức độ sẵn sàng để triển khai sẽ được duyệt trong Bài 3.4.

## 1. Hiểu bốn tài liệu

Trước khi mở Claude, hãy xác định mỗi tài liệu trả lời câu hỏi nào.

| Tài liệu | Câu hỏi chính | Những gì thuộc về đây |
|---|---|---|
| Yêu cầu sản phẩm, hay PRD | Website phải đạt được điều gì? | Đối tượng, phạm vi, các trang, hành trình, hành vi và tiêu chí chấp nhận |
| Kiến trúc | Dự án hỗ trợ các yêu cầu đó như thế nào? | Framework, route, component, style, nội dung và tích hợp đã được kiểm tra |
| Quy tắc làm việc | Các thay đổi nên được thực hiện như thế nào? | Quy ước dự án, ranh giới, xác minh và báo cáo |
| Kế hoạch công việc | Việc gì nên làm tiếp theo? | Kết quả có phạm vi rõ ràng, phụ thuộc, tiêu chí chấp nhận, bước kiểm tra và tiến độ |

Hãy dùng tên tệp thực tế của dự án. Trong bài học này, `PRD.md`, `Architecture.md`, `Rules.md` và `Task.md` chỉ là ví dụ.

**Mỗi quyết định nên có một nơi lưu chính, rồi liên kết tới nó từ các tài liệu khác.** Sao chép toàn bộ đặc tả điều hướng vào cả bốn tệp sẽ tạo ra bốn nơi có thể trở nên không nhất quán.

### Các thuật ngữ bạn sẽ dùng

| Thuật ngữ | Ý nghĩa | Ví dụ |
|---|---|---|
| Yêu cầu chức năng | Điều website phải làm được | Mở một bảng điều hướng |
| Yêu cầu phi chức năng | Một chất lượng hoặc ràng buộc đối với website | Vẫn sử dụng được ở các độ rộng duyệt đã thống nhất |
| Phụ thuộc | Điều phải sẵn sàng trước | Một đích đến đã được xác nhận cho một liên kết |
| Tiêu chí chấp nhận | Điều kiện mà tác vụ hoàn thành phải đáp ứng | Điều khiển đóng được đặc tả sẽ đóng bảng |
| Xác minh | Cách bạn kiểm tra điều kiện đó | Mở bảng, kích hoạt điều khiển đóng và quan sát kết quả |
| Truy vết | Mối liên kết từ một yêu cầu tới các nguồn, tác vụ và bước kiểm tra của nó | REQ-NAV-01 → nguồn → TASK-NAV-01 → các bước kiểm tra đã ghi |

Ảnh chụp màn hình có thể giúp xác minh giao diện. Tự nó không thể chứng minh một điều khiển tương tác hoạt động đúng.

## 2. Chuẩn bị các nguồn trước khi soạn thảo

Hãy dùng sổ đăng ký tham chiếu và bản đồ tài liệu của bạn để xác nhận:

1. Tên tệp và vị trí thực tế của các tài liệu.
2. Những tài liệu nào đã tồn tại.
3. Các phiên bản tham chiếu đã duyệt cho phạm vi được chọn.
4. Những gì việc kiểm tra dự án khởi đầu đã xác lập.
5. Những quyết định liên quan nào vẫn chưa được giải quyết.

Đừng ghi đè các tài liệu hiện có chỉ để khớp với tên tệp ví dụ.

Hãy dùng một bảng nguồn nhỏ:

| Nguồn | Vị trí và phiên bản thực tế | Những gì nó xác lập | Khoảng trống về phê duyệt hoặc khả năng truy cập |
|---|---|---|---|
| Bản mô tả kinh doanh | [Điền vào] | Mục đích, đối tượng và phạm vi | [Điền vào] |
| IA và hành trình | [Điền vào] | Các trang, nhãn và đích đến | [Điền vào] |
| Tài liệu tham chiếu thiết kế và tương tác | [Điền vào] | Bố cục, trạng thái responsive và hành vi | [Điền vào] |
| Nội dung chữ và tài nguyên đã duyệt | [Điền vào] | Câu chữ và các tệp được chọn | [Điền vào] |
| Kiểm tra dự án khởi đầu | [Điền vào] | Phần triển khai và các lệnh hiện có | [Điền vào] |

Nếu thiếu một nguồn bắt buộc, hãy ghi lại phạm vi bị ảnh hưởng. Tiếp tục soạn những phần độc lập mà bằng chứng sẵn có hỗ trợ.

## 3. Soạn bản nháp PRD

PRD mô tả website dự kiến và các kết quả bắt buộc của nó. Hãy để các quyết định triển khai ở cấp độ mã trong tài liệu kiến trúc.

Bắt đầu với khung sau, điều chỉnh cho phù hợp với dự án hiện có:

```markdown
# Product requirements

Status: Draft for review

## Purpose and audience
[Business purpose and supported visitor needs.]

## Scope
[Included pages, journeys and features.]

## Out of scope
[Explicit exclusions.]

## Requirements
[Requirement ID, intended behaviour, supporting source and acceptance.]

## Quality requirements
[Applicable accessibility, responsive, browser and performance requirements.]

## Content, assets and dependencies
[Required materials; link to unresolved items in the dependency record.]

## Acceptance
[How the agreed scope will be reviewed and who records the decision.]
```

Hãy dùng các yêu cầu cụ thể, có thể kiểm tra được. Thay “điều hướng phải tốt” bằng hành vi được xác lập trong đặc tả tương tác đã duyệt.

Đừng bịa ra các chỉ tiêu hiệu năng bằng con số, cam kết về khả năng tiếp cận hay phạm vi trình duyệt hỗ trợ. Hãy ghi lại yêu cầu đang áp dụng hoặc quyết định cần đưa ra.

### Ví dụ minh họa: một yêu cầu điều hướng

**Mọi thứ trong ví dụ minh họa này chỉ mang tính minh họa.** Giả sử một đặc tả tương tác được cung cấp yêu cầu bảng điều hướng trên di động mở ra từ một nút, đóng lại bằng nút đóng hoặc phím Escape, và hiển thị các liên kết điều hướng đã duyệt. Điều này không xác lập những yêu cầu đó cho dự án khởi đầu của bạn.

Một mục trong PRD có thể như sau:

```markdown
### REQ-NAV-01 Mobile navigation

Outcome: Visitors can open the mobile navigation, follow its approved
links and close the panel using the specified controls.

Sources: [Actual navigation specification and version];
[actual mobile interaction reference and version].

Required behaviour:
- The trigger opens the panel.
- The close button and Escape close the panel.
- Labels, order and destinations match the navigation specification.
- Keyboard and focus behaviour follow the interaction specification.

Acceptance: Required behaviour and presentation are verified at the
agreed layouts. See TASK-NAV-01 for checks and evidence.
```

Trong dự án của bạn, hãy thay ví dụ này bằng một yêu cầu thực tế có nguồn hỗ trợ. Đừng thêm Escape hay một hành vi khác chỉ vì ví dụ có nó.

## 4. Mô tả kiến trúc từ bằng chứng

Tài liệu kiến trúc nên phân biệt phần triển khai **quan sát được** với các thay đổi **được đề xuất**.

Ghi lại đủ chi tiết để định hướng công việc mà không cần mô tả mọi tệp trong repository.

```markdown
# Architecture

Status: Draft for review

## Observed starter
[Framework and version evidence; relevant source locations.]

## Routes and shared layout
[Existing routing convention, header, footer and page organisation.]

## Components and styling
[Reuse approach, styling method and approved shared values.]

## Content and assets
[Actual storage and loading approach.]

## Integrations and configuration
[Confirmed services, boundaries and required setting names, without secrets.]

## Development and verification commands
[Actual commands and where they are documented.]

## Proposed changes and unresolved decisions
[Clearly separated from what already exists.]
```

Với thông tin phiên bản, hãy phân biệt giữa khoảng phiên bản phụ thuộc được khai báo và phiên bản chính xác đã được phân giải. Ghi lại bằng chứng mà bạn thực sự đã kiểm tra.

### Tiếp tục ví dụ điều hướng

Giả sử việc kiểm tra xác nhận rằng có một header dùng chung nhưng thiếu bảng điều hướng di động bắt buộc. Chỉ ghi điều đó là quan sát nếu nó đúng trong dự án đã kiểm tra.

```markdown
### Navigation implementation

Requirement: REQ-NAV-01.

Observed:
- A shared header is rendered by the site layout.
- Its current implementation does not include the required mobile panel.
- Existing shared control styles are available.

Evidence: [Actual header, layout and style paths inspected].

Proposed:
- Extend the existing header for the specified mobile behaviour.
- Reuse the established styling and routing approach.
- Preserve the approved desktop navigation.

Unresolved: [List actual gaps, or state that none were identified.]
```

Đừng bịa ra đường dẫn component hay chọn một thư viện điều hướng mới chỉ để hoàn thành phần này.

## 5. Viết quy tắc làm việc

Quy tắc làm việc mô tả cách thực hiện thay đổi trong quy trình đã thống nhất của dự án.

```markdown
# Working rules

Status: Draft for review

## References and scope
[How to select applicable approved sources and the current task.]

## Existing work
[How to inspect and preserve relevant working changes.]

## Implementation conventions
[Actual TypeScript, TSX, component and styling conventions.]

## Content and assets
[Use approved materials; identify editorial or asset decisions.]

## Uncertainty and scope changes
[What can follow conventions and what needs clarification.]

## Verification and reporting
[Applicable checks; evidence and limitations to report.]

## Repository and external actions
[Existing authority for commits, pushes, deployments and other side effects.]
```

Hãy mô tả những quyết định cần được duyệt mà không đòi hỏi phê duyệt lặp đi lặp lại cho các lựa chọn thông thường, có thể hoàn tác và đã nằm trong phạm vi tác vụ.

### Tiếp tục ví dụ điều hướng

```markdown
### Navigation changes

- Follow the sources linked by REQ-NAV-01.
- Preserve approved labels, order and destinations.
- Reuse the existing header, routing and styling conventions.
- Check affected desktop and mobile behaviour after shared changes.
- Record missing decisions; do not substitute invented destinations.
```

Các quy tắc này tham chiếu tới yêu cầu thay vì sao chép lại toàn bộ đặc tả của nó.

## 6. Xây dựng kế hoạch công việc

Một tác vụ nên tạo ra một kết quả có ý nghĩa và có thể kiểm tra riêng.

Tránh coi toàn bộ website là một tác vụ triển khai duy nhất. Cũng tránh đặt ra các giới hạn như “chỉ thay đổi một tệp” trước khi bạn hiểu những thay đổi hỗ trợ cần thiết.

### Mẫu tác vụ có thể chỉnh sửa

Dùng mẫu này trong `Task.md`, hoặc theo mẫu tương đương sẵn có của dự án:

```markdown
## [Task ID]: [Title]

Status: Not started

Requirement and sources: [IDs, exact locations and versions.]
Outcome: [What should be true afterwards.]
Current state: [Relevant inspected behaviour and evidence.]
Scope: [Included work.]
Boundaries: [What must be preserved or handled separately.]
Dependencies: [Prerequisites and their actual status.]

### Acceptance and verification

| ID | Acceptance criterion | Verification method | Result/evidence |
|---|---|---|---|
| AC-01 | [Condition] | [Matching check and conditions] | Not checked |

### Reporting
[Changed files, check results, affected usages and remaining issues.]
```

Một tác vụ đã được duyệt vẫn ở trạng thái **Not started** (Chưa bắt đầu) cho đến khi việc triển khai bắt đầu. Phê duyệt và tiến độ là hai bản ghi khác nhau.

### Tiếp tục ví dụ điều hướng

```markdown
## TASK-NAV-01: Implement the specified mobile navigation

Status: Not started

Requirement and sources: REQ-NAV-01 and its linked references.
Outcome: Visitors can use the specified mobile navigation.
Current state: Shared header exists; required panel is absent.
Evidence: [Actual inspected paths.]

Scope: Panel layout, controls, approved links and specified
keyboard/focus behaviour within the existing header.

Boundaries: Preserve desktop navigation, approved wording and
unrelated page behaviour. Follow existing project conventions.

Dependencies: Confirm availability of labels, destinations,
interaction states and review widths before the affected work.

### Acceptance and verification

| ID | Acceptance criterion | Verification method | Result/evidence |
|---|---|---|---|
| AC-01 | Trigger opens the panel | Activate the trigger at the specified mobile layout | Not checked |
| AC-02 | Specified controls close the panel | Open it, then test the close button and Escape separately | Not checked |
| AC-03 | Links match the specification | Compare labels/order and follow each confirmed destination | Not checked |
| AC-04 | Keyboard/focus behaviour matches the reference | Perform its specified keyboard sequence and inspect focus | Not checked |
| AC-05 | Presentation follows the approved reference | Compare required states at agreed review widths | Not checked |
| AC-06 | Desktop navigation remains usable | Repeat affected desktop navigation checks | Not checked |

### Reporting
Record changed files, criterion results, applicable project checks,
affected usages and outstanding limitations.
```

Đây là một ví dụ lập kế hoạch, không phải là tuyên bố rằng bất kỳ bước kiểm tra nào đã đạt.

Kế hoạch công việc tổng thể nên sắp xếp các tác vụ theo phụ thuộc thực tế. Đừng giả định rằng thứ tự xây dựng phải khớp với thứ tự hiển thị trên trang.

## 7. Truy vết yêu cầu xuyên suốt bộ tài liệu

Hãy kiểm tra rằng người khác có thể theo dõi cùng một yêu cầu mà không phải đoán.

| Mắt xích | Mục trong ví dụ minh họa | Điều cần xác nhận trong dự án của bạn |
|---|---|---|
| Nguồn đã duyệt | Tài liệu tham chiếu điều hướng và tương tác | Các phiên bản thực tế truy cập được và đang áp dụng |
| PRD | REQ-NAV-01 | Kết quả bắt buộc được các nguồn đó hỗ trợ |
| Kiến trúc | Triển khai điều hướng | Trạng thái hiện có có bằng chứng từ tệp; phần đề xuất được đánh dấu rõ |
| Quy tắc | Thay đổi điều hướng | Các quy ước liên quan và ranh giới cần giữ nguyên đều rõ ràng |
| Kế hoạch công việc | TASK-NAV-01 | Kết quả và điều kiện tiên quyết khớp với yêu cầu |
| Xác minh | AC-01–AC-06 | Mỗi tiêu chí có một bước kiểm tra phù hợp và một ô ghi bằng chứng |

Truy vết giúp làm lộ ra những quyết định còn thiếu. Nó không chứng minh việc triển khai đã hoàn tất.

Hãy đảm bảo hướng dẫn đầu vào của dự án hoặc prompt của tác vụ có tham chiếu tới các tài liệu này. Đừng giả định Claude sẽ kiểm tra mọi tệp Markdown chỉ vì chúng tồn tại.

## 8. Ghi lại phụ thuộc và các quyết định chưa giải quyết

Hãy dùng sổ đăng ký nội dung và phụ thuộc hiện có nếu được cung cấp. Nếu không, hãy dùng bảng sau:

| ID | Hạng mục hoặc quyết định còn thiếu | Yêu cầu/tác vụ bị ảnh hưởng | Phần việc có thể tiếp tục | Hành động tiếp theo hoặc người chịu trách nhiệm, nếu biết | Trạng thái |
|---|---|---|---|---|---|
| [ID] | [Khoảng trống cụ thể] | [ID thực tế] | [Phạm vi độc lập] | [Hành động cần làm] | [Trạng thái thực tế] |

Ví dụ, một đích đến điều hướng chưa được xác nhận sẽ chặn việc xác minh liên kết đó. Nó có thể không chặn việc soạn các tài liệu khác hoặc triển khai một phần giao diện đã được đặc tả độc lập.

Đừng bịa ra người phụ trách, thời hạn, URL, giá, người nhận hay dịch vụ để lấp một ô trống. Hãy dùng “Chưa xác nhận” khi phù hợp.

Giữ một tài liệu ở trạng thái bản nháp cho đến khi quyết định duyệt liên quan được ghi lại.

## 9. Hướng dẫn từng bước: soạn trước một lát cắt liên kết

Trước khi yêu cầu Claude viết bốn tài liệu hoàn chỉnh:

1. **Chọn một yêu cầu thực tế.** Chọn một phần hành vi nhỏ đã được duyệt và có tài liệu tham chiếu truy cập được.
2. **Viết mục PRD cho nó.** Nêu kết quả, nguồn và hành vi bắt buộc.
3. **Viết ghi chú kiến trúc cho nó.** Mô tả những gì đang có, dẫn các đường dẫn đã kiểm tra và tách riêng phần đề xuất.
4. **Thêm các quy tắc làm việc liên quan.** Tái sử dụng các quy ước hiện có thay vì tự đặt ra một quy trình mới.
5. **Viết một tác vụ.** Bao gồm phạm vi, điều kiện tiên quyết, tiêu chí và các bước kiểm tra tương ứng.
6. **Hoàn thành chuỗi truy vết.** Kiểm tra rằng ID, nguồn và kết quả thống nhất giữa các tài liệu.
7. **Ghi lại các khoảng trống.** Xác định mỗi khoảng trống ảnh hưởng tới phần nào.

Hãy duyệt lát cắt nhỏ này trước khi mở rộng phần còn lại của bộ tài liệu. Sửa một yêu cầu bị hiểu sai dễ hơn nhiều so với sửa bốn tài liệu được xây dựng xoay quanh nó.

## 10. Nhờ Claude hỗ trợ soạn bộ tài liệu

Dùng prompt dưới đây sau khi thay thế các trường tham chiếu của nó.

```text
Help prepare the PRD, architecture, working rules and task plan
for the supplied practice website.

Goal:
Produce connected draft instructions grounded in the approved
references and the actual starter. This is documentation work.

Before editing:
- Confirm the project location, relevant existing documents and Git state.
- Identify applicable source versions and existing work to preserve.
- Inspect only the files needed for the selected requirement and its
  necessary dependencies.
- Report any source or document-location conflict before overwriting work.

First draft one connected slice:
1. One supported PRD requirement with an ID.
2. An architecture note with observed evidence and a separate proposal.
3. Relevant working rules.
4. One bounded task with dependencies and criterion-to-check mapping.
5. A requirement-to-verification trace and actual unresolved gaps.

Keep the documents Draft for review. Stop after this slice and report it
for my review before expanding the remaining documentation.

Use established project conventions for routine choices.
Do not invent business facts, commands, routes, services or approvals.
Do not implement the website, install packages, commit, push or deploy.

Report sources inspected, document edits made, assumptions or gaps,
and the checks performed on the documentation.

Actual document locations:
[Insert paths or explicitly authorised new locations.]

Approved references and versions:
[Insert exact sources.]

Selected requirement and drafting scope:
[Insert the supported requirement and permitted document edits.]
```

Sau khi lát cắt đã được duyệt, hãy cho phép mở rộng sang phần phạm vi đã thống nhất còn lại. Kiểm tra từng mục mới với nguồn của nó thay vì duyệt những câu chữ nghe có vẻ hợp lý chỉ dựa trên vẻ bề ngoài.

## 11. Bài tập thực hành

**Nhiệm vụ: Chuẩn bị bốn bản nháp tài liệu hướng dẫn cho Saffron Wellness Clinic.**

1. Xác nhận tên tệp thực tế, nội dung hiện có và các phiên bản tham chiếu.
2. Hoàn thành một lát cắt liên kết theo phần hướng dẫn từng bước.
3. Duyệt và sửa lát cắt đó dựa trên các nguồn của nó.
4. Mở rộng PRD để bao quát phạm vi website đã thống nhất.
5. Hoàn thiện tài liệu kiến trúc từ bằng chứng của dự án khởi đầu, giữ các đề xuất tách riêng.
6. Hoàn thiện các quy tắc làm việc liên quan.
7. Sắp xếp các tác vụ có phạm vi rõ ràng theo phụ thuộc của chúng.
8. Hoàn thành một chuỗi truy vết cuối cùng bằng ID và tài liệu tham chiếu thực tế.
9. Ghi lại các quyết định còn tồn đọng và kiểm tra các bản nháp xem có mâu thuẫn không.

Đừng triển khai website trong bài tập này. Phần duyệt mức độ sẵn sàng sẽ diễn ra ở Bài 3.4.

Nếu bản mô tả, thiết kế hoặc dự án khởi đầu không có sẵn, hãy nộp phần bản nháp có cơ sở hỗ trợ và các khoảng trống cụ thể. Đừng dùng ví dụ minh họa thay cho bằng chứng thực tế của dự án.

## 12. Sản phẩm cần nộp

Nộp:

- Bốn bản nháp tài liệu ở các vị trí đã thống nhất.
- Sổ đăng ký tham chiếu với các phiên bản đang áp dụng và tình trạng của nguồn.
- Một chuỗi truy vết hoàn chỉnh từ yêu cầu đến xác minh.
- Bản ghi nội dung/phụ thuộc, hoặc một xác nhận rõ ràng rằng không phát hiện khoảng trống nào.
- Một bản tóm tắt ngắn về các tài liệu hiện có đã thay đổi, tài liệu mới đã tạo và các giới hạn còn lại.

Hãy giữ các phát hiện và bằng chứng trong các sổ đăng ký hiện có khi có thể. Tránh tạo các bảng theo dõi trùng lặp cho cùng một vấn đề.

## 13. Tiêu chí hoàn thành

Kiểm tra từng mục trước khi nộp cho phần duyệt mức độ sẵn sàng ở Bài 3.4.

- [ ] Cả bốn tài liệu đều có ở vị trí đã thống nhất và có trách nhiệm riêng biệt.
- [ ] Các phần bắt buộc đã được điền, hoặc thông tin còn thiếu được ghi lại rõ ràng.
- [ ] Các yêu cầu liên kết tới tài liệu tham chiếu đã duyệt đang áp dụng.
- [ ] Các nhận định về kiến trúc dẫn bằng chứng đã kiểm tra và phân biệt trạng thái quan sát được với các đề xuất.
- [ ] Các lệnh được lấy từ tài liệu hoặc script thực tế của dự án.
- [ ] Quy tắc làm việc phản ánh quy ước của dự án và các ranh giới thẩm quyền có ý nghĩa.
- [ ] Các tác vụ có kết quả trong phạm vi rõ ràng, liên kết tới yêu cầu, điều kiện tiên quyết và trạng thái tiến độ thực tế.
- [ ] Tiêu chí chấp nhận của mỗi tác vụ đều có phương pháp xác minh tương ứng.
- [ ] Chuỗi truy vết được chọn có thể theo dõi từ nguồn tới yêu cầu, tác vụ và bước kiểm tra.
- [ ] Các tài liệu thống nhất về phạm vi, đích đến và các quyết định tích hợp, hoặc các mâu thuẫn đã được ghi lại.
- [ ] Các quyết định chưa xác nhận được đánh dấu theo các tác vụ bị ảnh hưởng.
- [ ] Các tài liệu vẫn là bản nháp; không có phần triển khai, kết quả kiểm thử hay phê duyệt nào bị bịa ra.

Một mục chưa hoàn thành nên được báo cáo kèm phạm vi bị ảnh hưởng. Đó không phải lý do để ngụy trang một quyết định còn thiếu thành một yêu cầu đã hoàn chỉnh.

## 14. Kiểm tra kiến thức

1. Một PRD ghi “Dùng một thư viện điều hướng mới.” Tài liệu nào nên đánh giá lựa chọn triển khai đó, và cần bằng chứng gì?
2. Dự án khởi đầu có một header dùng chung, nhưng thiếu bảng điều hướng di động bắt buộc. Tài liệu kiến trúc nên phân biệt quan sát với đề xuất như thế nào?
3. Một tác vụ ghi “Menu di động hoạt động.” Hãy viết lại nó thành một tiêu chí chấp nhận và một bước kiểm tra tương ứng.
4. Một đích đến của liên kết chưa được xác nhận. Điều gì nên được ghi lại, và phần soạn thảo độc lập nào vẫn có thể tiếp tục?
5. Người hướng dẫn duyệt kế hoạch công việc. Điều gì về việc triển khai và xác minh vẫn chưa được chứng minh?
