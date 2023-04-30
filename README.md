# DEMO : https://next-hana.vercel.app/

# Cao Quốc Bình - DH51903224

# WEBSITE THƯƠNG MẠI ĐIỆN TỬ:

## PHẦN I: KHẢO SÁT HIỆN TRẠNG HỆ THỐNG:

### 1. Tổng quan về Hanastore:
  Hanastore là một cửa hàng lớn cung cấp sản phẩm chính hãng( mỹ phẩm, trang sức, túi xách, quần áo và thực phẩm chức năng,...) với chất lượng cao, đa dạng mẫu mã và giá cả hợp lý. 
  
  Cơ cấu cửa hàng bao gồm: Quản lý kiêm kế toán, bộ phận bán hàng và bộ phận nhập kho.
  
  Khách hàng của shop được chia làm 2 loại:
  
    -Khách hàng thường xuyên( khách hàng tiềm năng): những cửa hàng, đại lý... đặt hàng định kì.
    
    -Khách hàng không thường xuyên: Khách mua lẻ, có thể mua trực tiếp tại shop
    
  Nhu cầu mở rộng thị trường cũng như quảng bá sản phẩm và nâng cao chất lượng, tăng doanh thu là vấn đề đáng quan tâm của shop. Vì vậy quản lí của shop có mong muốn xây dựng 1 website giới thiệu sản phẩm và bán hàng trực tuyến, cũng như hỗ trợ khách hàng các thông tin cần thiết.
  
### 2. Tổng quan công nghệ:
 
 **Với phương châm <sub>“Trải nghiệm tốt của khách hàng chính là khởi đầu cho sự gắn bó cùng HanaStore”</sub> , shop không ngừng nỗ lực nhằm mang lại sản phẩm cũng như sự phục vụ tốt nhất cho khách hàng.**
 
 **Front-End:**
 
 - NextJS: Next.js là một framework mã nguồn mở của React, được sử dụng để phát triển các ứng dụng web SSR (Server Side Rendering) và SSG (Static Site Generation). Nó cung cấp một số tính năng hữu ích để giúp xây dựng các ứng dụng web phức tạp một cách dễ dàng và nhanh chóng. Vai trò của Next.js trong thiết kế website thương mại điện tử là rất quan trọng. Với các tính năng như SSR và SSG, Next.js cho phép trang web được tạo ra nhanh hơn và tải nhanh hơn. Điều này rất quan trọng đối với các trang web thương mại điện tử, vì mỗi giây chờ đợi có thể khiến khách hàng bỏ qua sản phẩm của bạn và chuyển sang các trang web cạnh tranh. Next.js cũng cho phép việc tối ưu hóa SEO (Search Engine Optimization) thông qua SSR và SSG. Bằng cách cho phép trang web hiển thị nội dung chính ngay từ khi truy cập trang, SSR giúp các công cụ tìm kiếm như Google và Bing hiểu được nội dung của trang web và cải thiện thứ hạng tìm kiếm của trang web. SSG cũng cho phép tạo các trang web tĩnh chứa dữ liệu được xử lý trước, giúp giảm tải cho máy chủ và tăng tốc độ tải trang. Ngoài ra, Next.js còn hỗ trợ các tính năng khác như pre-fetching và code splitting, giúp tăng tốc độ tải trang và giảm tải cho máy chủ.

***Tóm lại, Next.js là một công cụ rất hữu ích cho thiết kế các trang web thương mại điện tử. Nó cho phép xây dựng các trang web nhanh hơn, tải nhanh hơn và tối ưu hóa SEO tốt hơn.***

**Back-End**
 - NodeJS: Node.js là một nền tảng phát triển ứng dụng web được xây dựng trên nền tảng JavaScript, cho phép viết mã ứng dụng web chạy trên máy chủ (server-side). Node.js được thiết kế để có khả năng xử lý các yêu cầu từ nhiều người dùng cùng một lúc, đồng thời cũng cho phép xây dựng các ứng dụng web theo kiểu mã nguồn mở và có khả năng mở rộng. Vai trò của Node.js trong thiết kế website thương mại điện tử là rất quan trọng. Với Node.js, các lập trình viên có thể viết mã ứng dụng web server-side bằng ngôn ngữ JavaScript, giúp đơn giản hóa quá trình phát triển ứng dụng. Node.js cũng cho phép xử lý các yêu cầu đồng thời và có khả năng mở rộng, giúp ứng dụng web của bạn có thể xử lý hàng ngàn yêu cầu từ người dùng cùng một lúc. Node.js cũng cho phép phát triển các ứng dụng web theo kiểu mã nguồn mở, giúp cho cộng đồng lập trình viên có thể đóng góp vào các dự án, tạo nên một cộng đồng lớn và phát triển các ứng dụng web đa dạng và chất lượng cao. Ngoài ra, Node.js còn hỗ trợ nhiều thư viện và module cho phép các lập trình viên xây dựng các ứng dụng web có tính năng phức tạp và hiệu quả hơn. Ví dụ như Express.js, một framework phổ biến để xây dựng các ứng dụng web server-side.

***Tóm lại, Node.js là một công nghệ rất quan trọng trong thiết kế các trang web thương mại điện tử. Nó giúp đơn giản hóa quá trình phát triển ứng dụng, có khả năng xử lý nhiều yêu cầu đồng thời và mở rộng được, và hỗ trợ nhiều thư viện và module để xây dựng các ứng dụng web phức tạp.***
 
  - MongoDB: MongoDB là một hệ thống cơ sở dữ liệu phi quan hệ (NoSQL) mã nguồn mở, được thiết kế để lưu trữ và truy vấn các tài liệu dưới dạng đối tượng JSON. MongoDB có khả năng xử lý dữ liệu khối lượng lớn, cung cấp tính linh hoạt và có thể mở rộng để đáp ứng nhu cầu của các ứng dụng web thương mại điện tử.
 Một số ưu điểm của MongoDB trong thiết kế website thương mại điện tử bao gồm:

    -Dễ dàng mở rộng: MongoDB có khả năng mở rộng dữ liệu và khả năng xử lý tốt các tải cao. Điều này giúp cho các ứng dụng web thương mại điện tử có thể mở rộng dữ liệu và tải lên nhiều hơn mà không gặp phải những trở ngại về hiệu suất.

    -Tính linh hoạt: MongoDB không có cấu trúc cố định cho các bảng và cột giống như các hệ quản trị cơ sở dữ liệu quan hệ truyền thống. Thay vào đó, nó cho phép các nhà phát triển lưu trữ dữ liệu dưới dạng tài liệu JSON, giúp cho việc tạo và thay đổi các mẫu dữ liệu trở nên dễ dàng hơn.

    -Tốc độ truy vấn nhanh: MongoDB cho phép các truy vấn phức tạp và đa dạng về mặt nội dung và kích thước, cung cấp hiệu suất tốt hơn so với các hệ quản trị cơ sở dữ liệu quan hệ truyền thống.

***Tóm lại, MongoDB là một hệ quản trị cơ sở dữ liệu phi quan hệ phổ biến và có nhiều ưu điểm trong thiết kế website thương mại điện tử. Nó có khả năng mở rộng, tính linh hoạt, tốc độ truy vấn nhanh và hỗ trợ tốt cho các ứng dụng web***

## PHẦN II: MỤC TIÊU XÂY DỰNG WEBSITE:


### 1.Đối tượng của Website được xây dựng phục vụ hai đối tượng chính là Admin( nhà quản trị) và Khách hàng với các chức năng sau:

**Admin:**
  
  -Đăng nhập Website Xem, cập nhật, xoá thông tin sản phẩm.

  -Quản lí đơn đặt hàng Xem, trả lời ý kiến, góp ý và phản hồi của khách hàng hoặc xoá các thông tin đó từ khách hàng.

  -Xem, xoá các thông tin của khách hàng nhưng không được quyền thay đổi thông tin đó.

  -Cập nhật tin tức

**Khách hàng:**

Guest: Khách viếng thăm

  -Xem thông tin sản phẩm cũng như các tin tức khác

  -Đăng kí thành viên

User:

  -Đã có tài khoản

  -Có quyền đăng nhập, đăng xuất, đổi mật khẩu

-Đặt mua sản phẩm

2.Đặc điểm:

Xây dựng một hệ thống bán hàng trực tuyến đơn giản, thân thiện, dễ sử dụng, cho phép khác hàng xem thông tin và đặt hàng qua mạng, người quản trị quản lý các thông tin về sản phẩm cũng như người dùng

Website được thiết kế với

  -Giao diện hài hoà, thân thiện, giúp người dùng dễ dàng sử dụng.

  -Trang chủ sẽ hiển thị danh sách các sản phẩm mới nhất và bán chạy nhất giúp cho người dùng có thể dễ dàng hơn trong việc tìm kiếm.

  -Khách hàng có thể dễ dàng tìm thấy thông tin chi tiết các loại sản phẩm mà họ quan tâm.

  -Khách hàng có thể chọn mua các loại sản phẩm mà họ cần dựa trên khả năng tài chính và chức năng cần thiết bằng cách thêm vào giỏ hàng

  -Có chức năng đăng ký, đăng nhập.Khách hàng có thể gửi ý kiến phản hồi, góp ý đến Website để góp phần làm Website thêm phong phú và phát triển.Xây dựng một hệ thống bán sản phẩm trực tuyến đơn giản, thân thiện, dễ sử dụng, cho phép khác hàng xem thông tin và đặt hàng qua mạng, người quản trị quản lý các thông tin về sản phẩm cũng như người dùng.

**Các module:**

*Module sản phẩm:*

Hiển thị thông tin và phân loại sản phẩm trong gian hàng ảo. Sản phẩm hiển thị lên website sẽ được hiển thị đầy đủ thông tin về sản phẩm đó như: hình ảnh, tên sản phẩm, đặc điểm nổi bật của sản phẩm,giá,..

*Module giỏ hàng:*

Khi tham khảo đầy đủ thông tin về sản phẩm khách hàng có thể đặt mua sản phẩm ngay tại Website thông qua chức năng giỏ hàng mà không cần phải đến địa điểm giao dịch, giỏ hàng được làm mô phỏng như giỏ hàng trong thực tế có thể thêm, bớt, thanh toán tiền các sản phẩm đã mua. Khi chọn thanh toán giỏ hàng khách hàng phải ghi đầy đủ các thông tin cá nhân, thông tin này được hệ thống lưu trữ và xử lý.

*Module đăng ký thành viên và đăng nhập hệ thống*

Mỗi khách hàng giao dịch tại Website sẽ được quyền đăng ký môt tài khoản riêng. Tài khoản này sẽ được sử dụng khi hệ thống yêu cầu. Một tài khoản do khách hàng đăng ký sẽ lưu trữ các thông tin cá nhân của khách hàng.

*Module tìm kiếm sản phẩm, tin tức, tư vấn Khách hàng sẽ được cung cấp chức năng tìm kiếm trên Website.*

- Trang tin tức: Tư vấn cho khách hàng...
- Trang giới thiệu: Giới thiệu các thông tin về cửa hàng, phương châm bán hàng...
- Trang liên hệ: Khách hàng có thể liên hệ vớinhân viên bán hàng về các thắc mắc, ý kiến của mình.

*Module quản lý sản phẩm, đơn hàng:*

Người quản trị có thể cập nhật thông tin các mặt hàng, loại hàng, quản lý thông tin đơn hàng.

*Module khác*

## PHẦN III: PHÂN TÍCH HỆ THỐNG:

### 1.Các thông tin đầu ra đầu vào của hệ thống

**Thông tin đầu vào:**

  -Thông tin khách hàng

  -Thông tin sản phẩm

  -Thông tin về cửa hàng và các bài viết liên quan

  -Thông tin quảng cáo

  -Các phản hồi

  -Đơn đặt hàng

**Thông tin đầu ra:**

  -Chi tiết về sản phẩm

  -Hóa đơn

  -Các phản hồi

### 2.Tác nhân:

  -Khách hàng: User và Guest( Khách viếng thăm)

  -Admin: Người quản lý

<img width="406" alt="image" src="https://user-images.githubusercontent.com/68917523/225036534-3e8e09e5-0e79-46fb-8ac4-779575a3ccd3.png">

### 3.Biểu đồ Usecase tổng quát của hệ thống:

<img width="429" alt="image" src="https://user-images.githubusercontent.com/68917523/225037681-6dc8b22e-e15b-4630-87ca-7ba8be7ff633.png">

### 4.Biểu đồ tuần tự:

**a.Biểu đồ tuần tự cho use case đăng nhập**

<img width="353" alt="image" src="https://user-images.githubusercontent.com/68917523/225038179-654904d6-32c3-40f3-ae7d-8546c515c1d3.png">

**b.Biểu đồ tuần tự cho Use case thêm giỏ hàng**

<img width="369" alt="image" src="https://user-images.githubusercontent.com/68917523/225038464-823758f9-be27-43c3-b335-7fc313ec3398.png">

**c.Biểu đồ tuần tự Use case gửi đơn đặt hàng**

<img width="362" alt="image" src="https://user-images.githubusercontent.com/68917523/225038998-422e170e-81e9-4b00-a24f-64f9b6e6db5a.png">

### 5.Biểu đồ trạng thái 

**Biểu đồ trạng thái của đối tượng Giỏ hàng**

<img width="388" alt="image" src="https://user-images.githubusercontent.com/68917523/225039484-5a1142ea-1d95-4425-bd8b-310adb3b6709.png">

### 6.Biểu đồ lớp phân tích:

<img width="348" alt="image" src="https://user-images.githubusercontent.com/68917523/225039943-68353260-b6ce-4210-a3d7-67efdca843db.png">

