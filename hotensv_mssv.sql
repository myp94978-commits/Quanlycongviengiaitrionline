-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2026 at 05:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotensv_mssv`
--

-- --------------------------------------------------------

--
-- Table structure for table `db_banners`
--

CREATE TABLE `db_banners` (
  `banner_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `position` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) DEFAULT 1,
  `trash` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `db_brands`
--

CREATE TABLE `db_brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `trash` tinyint(1) DEFAULT 0,
  `alias` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_brands`
--

INSERT INTO `db_brands` (`brand_id`, `brand_name`, `trash`, `alias`, `status`, `created_at`, `updated_at`) VALUES
(1, 'DALAT HASFRAM', 0, 'dalat-hasfarm', 1, '2024-08-30 00:07:11', '2024-08-30 00:07:11'),
(2, 'UNIFARM', 0, 'unifarm', 1, '2024-08-30 00:07:11', '2024-08-30 00:07:11'),
(3, 'VIET FLOWER', 0, 'viet-flower', 1, '2024-08-30 00:07:11', '2024-08-30 00:07:11');

-- --------------------------------------------------------

--
-- Table structure for table `db_categories`
--

CREATE TABLE `db_categories` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `parent_id` int(11) DEFAULT 0,
  `trash` tinyint(1) DEFAULT 0,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_categories`
--

INSERT INTO `db_categories` (`cat_id`, `cat_name`, `alias`, `parent_id`, `trash`, `status`, `created_at`, `updated_at`) VALUES
(1, 'HOA CẮT CÀNH', 'hoa-cat-canh', 0, 0, 1, '2024-08-30 00:08:06', '2024-08-30 00:08:06'),
(2, 'HOA TRỒNG CHẬU', 'hoa-trong-chau', 0, 0, 1, '2024-08-30 00:08:06', '2024-08-30 00:08:06'),
(3, 'HOA KHÔ', 'hoa-kho', 0, 0, 0, '2024-08-30 00:08:06', '2024-08-30 00:08:06'),
(4, 'HOA TRANG TRÍ', 'hoa-trang-tri', 0, 0, 1, '2024-08-30 00:08:06', '2024-08-30 00:08:06'),
(5, 'Tablet', 'tablet', 0, 0, 1, '2026-03-09 10:45:56', '2026-03-09 10:45:56'),
(6, 'Tablet1', 'tablet', 0, 0, 1, '2026-03-09 10:47:43', '2026-03-09 10:47:43'),
(7, 'Tablet11', 'tablet', 0, 0, 1, '2026-03-09 10:48:29', '2026-03-09 10:48:29'),
(8, 'Tablet11', 'tablet', 0, 0, 1, '2026-03-09 10:50:54', '2026-03-09 10:50:54'),
(9, 'Gaming Laptop', 'gaming-laptop', NULL, 1, 3, '2026-03-09 11:27:07', '2026-03-09 11:32:20'),
(10, 'Tablet11', 'tablet', 0, 0, 1, '2026-03-09 11:30:00', '2026-03-09 11:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `db_contacts`
--

CREATE TABLE `db_contacts` (
  `contact_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `trash` tinyint(1) DEFAULT 0,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_contacts`
--

INSERT INTO `db_contacts` (`contact_id`, `email`, `title`, `content`, `trash`, `status`, `created_at`, `updated_at`) VALUES
(1, 'customer@gmail.com', 'Liên hệ hỗ trợ duoc khong', 'Tôi muốn hỏi về đơn hàng', 1, 1, '2026-03-09 11:33:24', '2026-03-09 11:35:01'),
(2, 'customer@gmail.com', 'Liên hệ hỗ trợ', 'Tôi muốn hỏi về đơn hàng', 0, 1, '2026-03-09 11:33:54', '2026-03-09 11:33:54'),
(3, 'customer@gmail.com', 'Liên hệ hỗ trợ', 'Tôi muốn hỏi về đơn hàng', 0, 1, '2026-03-09 11:34:13', '2026-03-09 11:34:13'),
(4, 'customer@gmail.com', 'Liên hệ hỗ trợ', 'Tôi muốn hỏi về đơn hàng', 0, 1, '2026-03-09 11:34:21', '2026-03-09 11:34:21');

-- --------------------------------------------------------

--
-- Table structure for table `db_links`
--

CREATE TABLE `db_links` (
  `link_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `position` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `link` varchar(100) NOT NULL,
  `display_order` tinyint(4) NOT NULL,
  `trash` tinyint(1) DEFAULT 0,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_links`
--

INSERT INTO `db_links` (`link_id`, `title`, `position`, `image`, `link`, `display_order`, `trash`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Twitter', 'footer1', 'twitter.png', 'https://twitter.com', 4, 0, 1, '2024-08-30 00:22:57', '2026-03-09 11:36:58'),
(2, 'Sản Phẩm', 'navbar', '', 'cat/hoa-cat-canh', 2, 0, 1, '2024-08-30 00:22:57', '2024-08-31 18:11:01'),
(3, 'Giới Thiệu', 'navbar', '', 'page/2', 3, 0, 1, '2024-08-30 00:22:57', '2024-08-31 18:09:53'),
(4, 'Liên Hệ', 'navbar', '', 'page/5', 4, 0, 1, '2024-08-30 00:22:57', '2024-08-31 18:10:09'),
(5, 'Twitter', 'footer', 'twitter.png', 'https://twitter.com', 4, 0, 1, '2026-03-09 11:35:52', '2026-03-09 11:35:52'),
(6, 'Twitter', 'footer', 'twitter.png', 'https://twitter.com', 4, 1, 1, '2026-03-09 11:36:26', '2026-03-09 11:37:49');

-- --------------------------------------------------------

--
-- Table structure for table `db_orders`
--

CREATE TABLE `db_orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `customer_name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `total` float(10,2) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `trash` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_orders`
--

INSERT INTO `db_orders` (`order_id`, `user_id`, `customer_name`, `address`, `phone`, `email`, `total`, `note`, `status`, `trash`, `created_at`, `updated_at`) VALUES
(26, 5, 'Nguyen Van A', '456 Nguyen Trai, HCM', '0901234567', 'a@gmail.com', 25000000.00, 'Giao buổi chiều', 1, 0, '2026-03-12 03:53:03', '2026-03-12 04:06:41'),
(27, 5, 'Nguyen Van A', 'HCM', '0900000000', 'a@gmail.com', 500000.00, 'Giao buổi sáng', 1, 1, '2026-03-12 04:07:41', '2026-03-12 04:10:26');

-- --------------------------------------------------------

--
-- Table structure for table `db_order_details`
--

CREATE TABLE `db_order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `price` float(10,2) NOT NULL,
  `quantity` smallint(6) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_order_details`
--

INSERT INTO `db_order_details` (`order_detail_id`, `order_id`, `product_id`, `product_name`, `product_image`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(15, 26, 4, 'Laptop Asus', 'asus.jpg', 100000.00, 2, '2026-03-12 03:53:03', '2026-03-12 03:53:03'),
(16, 26, 6, 'Chuột Logitech', 'mouse.jpg', 300000.00, 1, '2026-03-12 03:53:03', '2026-03-12 03:53:03'),
(17, 27, 4, 'Laptop Asus', 'asus.jpg', 100000.00, 2, '2026-03-12 04:07:41', '2026-03-12 04:07:41'),
(18, 27, 6, 'Chuột Logitech', 'mouse.jpg', 300000.00, 1, '2026-03-12 04:07:41', '2026-03-12 04:07:41');

-- --------------------------------------------------------

--
-- Table structure for table `db_pages`
--

CREATE TABLE `db_pages` (
  `page_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `trash` tinyint(1) DEFAULT 0,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_pages`
--

INSERT INTO `db_pages` (`page_id`, `title`, `content`, `created_by`, `trash`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Giới thiệu', 'Ra đời năm 2019, OmiCare một lĩnh vực hoạt động của công ty cổ phần OmiCare - Hệ sinh thái chăm sóc sức khỏe theo tiêu chuẩn Nhật Bản đầu tiên tại Việt Nam.\r\n\r\nTrải qua 10 năm hoạt động, am hiểu sâu sắc nền y tế Nhật Bản, những thành viên sáng lập OmiCare nung nấu trong mình sứ mệnh “Mang những sản phẩm tinh hoa, có tính chất đột phá trong lĩnh vực y tế, chăm sóc sức khỏe, sắc đẹp của Nhật Bản về cho người Việt”.\r\n\r\nVới lợi thế là đối tác của hơn 200 tập đoàn, công ty Dược tại Nhật, các sản phẩm của OmiCare phân phối là các sản phẩm thuộc lĩnh vực Dược mỹ phẩm, thực phẩm chức năng, vật tư y tế, thực phẩm gia tăng giá trị sức khỏe. Tiêu chí lựa chọn của OmiCare là những sản phẩm tinh hoa, có tính đột phá trong công nghệ của Nhật Bản, mang lại những trải nghiệm và giá trị mới cho người Việt.\r\n\r\nHiện tại, các sản phẩm nhập khẩu chính hãng từ Nhật do OmiCare phân phối đang được hơn 200 đại lý ở khắp 63 tỉnh thành giới thiệu tới người tiêu dùng Việt', 1, 0, 1, '2024-08-30 00:21:55', '2024-12-16 03:12:22'),
(2, 'Chính sách đại lý', 'Nội dung mục chính sách :\r\n\r\nVới lợi thế là đối tác của hơn 200 tập đoàn, công ty Dược tại Nhật, các sản phẩm của OmiCare phân phối là các sản phẩm thuộc lĩnh vực Dược mỹ phẩm, thực phẩm chức năng, vật tư y tế, thực phẩm gia tăng giá trị sức khỏe. Tiêu chí lựa chọn của OmiCare là những sản phẩm tinh hoa, có tình đột phá trong công nghệ của Nhật Bản, mang lại những trải nghiệm và giá trị mới cho người Việt.\r\n\r\nHiện tại, các sản phẩm nhập khẩu chính hãng từ Nhật do OmiCare phân phối đang được hơn 200 đại lý ở khắp 63 tỉnh thành giới thiệu tới người tiêu dùng Việt. Với mong muốn mở rộng thị trường, OmiCare liên tục tuyển đại lý, nhà phân phối và cộng tác viên trên toàn quốc để cùng hợp tác phát triển, mang lại những sản  tốt nhất cho người Việt.\r\n\r\n1: Chính sách Đại lý, Nhà phân phối\r\n\r\nKhi trở thành Đại lý, Nhà phân phối của OmiCare Bạn sẽ được hưởng vô vàn những ưu đãi về chính sách giá, hình ảnh, đào tạo kiến thức, đào tạo kỹ năng...để phát triển bền vững:\r\n\r\nCấp giấy chứng nhận Đại lý từ OmiCare\r\nCấp catalogue,Tờ rơi, bảng giá theo sản phẩm\r\nCấp các hình ảnh sản phẩm, hàng mẫu (nếu có)\r\nĐăng tải thông tin đại lý,NPP lên website và fanpage của OmiCare\r\nHỗ trợ kiến thức sản phẩm, kiến thức kinh doanh\r\nChiết khấu tối đa trên giá bán.\r\nHỗ trợ đổi trả hàng hóa theo chính sách từng ngành hàng và sản phẩm.\r\nĐiều kiện để trở thành Đại lý, Nhà Phân phối.\r\n\r\nDoanh số tháng đạt chỉ tiêu OmiCare đề ra, Các tháng sau ít nhất 50%\r\nKhông nhập sản phẩm từ các đơn vị khách (xách tay)\r\nKhông bán hàng giả, hàng nhái, hàng kém chất lượng\r\nKhông tư vấn, quảng cáo sai lệch về sản phẩm cho người tiêu dùng\r\nKhông yêu cầu kinh nghiệm hay cửa hàng kinh doanh\r\n2: Chính sách Cộng tác viên\r\n\r\nKhi trở thành cộng tác viên của OmiCare bạn sẽ được hưởng những chính sách hỗ trợ của Omi để việc kinh doanh của bạn thuận lợi nhất:\r\n\r\nMua hàng với “Giá lẻ”, khi nào tổng chiết khấu đạt 1.000.000, các bạn chính thức trở thành CTV và nhận về phần chiết khấu 1.000.000 này,CTV sẽ được chiết khấu 10- 20% ( tùy sản phẩm) giá trị đơn hàng trên giá bán lẻ.\r\nTừ đơn hàng sau, các bạn áp dụng giá CTV cho tất cả các đơn hàng.\r\nFreeship cho đơn hàng từ 1 triệu trở lên.\r\n3: Chính sách vận chuyển và thời gian giao hàng\r\n\r\nThời gian giao hàng phụ thuộc vào từng đơn vị vận chuyển và khoảng cách địa lý.\r\n\r\nĐối với khách hàng ở nội thành Hà Nội,Nếu đơn đặt trước 8h sáng thì đơn hàng sẽ được giao đến khách hàng trong ngày, Đơn phát sinh sau 8h sáng có thể đên vào chiều tối hoạc sáng ngày hôm sau.\r\nĐối với Khách hàng ở khu vực Miền Bắc, thời gian nhận hàng dự kiến là 2ngày. Nếu khách hàng cần gấp có thể lên đơn trước 15h ngày hôm trước để nhận hàng vào ngày kế tiếp.\r\nĐối với các khu vực Miền Nam, Miền Tây thời gian giao hàng dự kiến 2-3 ngày\r\nChính sách giao hàng cho CTV,Đại lý\r\n\r\nĐối với Đại lý/NPP Công ty sẽ giao hàng về địa chỉ kho hàng của Đại lý/NPP chỉ định,sau đó Đại lý/NPP tự giao cho khách hàng của mình.\r\nĐối với CTV,chỉ cần lên đơn khách hàng rồi gửi thông tin qua,công ty sẽ tự đóng gói và giao hàng cho khách hàng của CTV, trường hợp CTV muốn tự giao hàng có thể qua kho công ty nhận hàng hoạc Công ty gửi hàng về địa chỉ của CTV để CTV tự vận hành,chi phí vận chuyển sau đó CTV sẽ phải tự chi trả.', 1, 0, 1, '2024-08-30 00:21:55', '2024-12-16 03:13:21'),
(3, 'Hướng dẫn mua hàng', 'Hướng dẫn cách mua hàng trên website.', 1, 0, 1, '2024-08-30 00:21:55', '2024-08-30 00:21:55'),
(4, 'Hệ thống đại lý', 'Nhập vị trí để tìm cửa hàng gần nhất....\r\n\r\nChọn tỉnh/thành phố\r\n\r\nChọn quận/huyện\r\nOmi Pharma Green Stars: Kiot 101, tòa 21B5, Green Stars, 234 Phạm Văn Đồng, Bắc Từ Liêm, Hà Nội\r\nOmi Pharma Vincom Center Metropolis: B1-09, tầng B1, TTTM Vincom Center Metropolis, số 29 Liễu Giai, phường Ngọc Khánh, quận Ba Đình, Hà Nội\r\nOmi Pharma Vincom Mega Mall Smart City: L1-02B, tầng 1, TTTM Vincom Mega Mall Smart City, phường Tây Mỗ, quận Nam Từ Liêm, Hà Nội\r\nOmi Pharma Vincom Times City: TN-15, tầng B1, TTTM Vincom Mega Mall Times City, 458 Minh Khai, Hai Bà Trưng, Hà Nội', 1, 0, 1, '2024-08-30 00:21:55', '2024-12-16 03:14:09'),
(5, 'Điều khoản sử dụng', 'Nội dung điều khoản...', 1, 0, 1, '2026-03-09 12:04:22', '2026-03-09 12:04:22'),
(6, 'Điều khoản sử dụng 1-........', 'Nội dung điều khoản...', 1, 1, 1, '2026-03-09 12:04:58', '2026-03-09 12:12:34'),
(7, 'Điều khoản sử dụng', 'Nội dung điều khoản...', 1, 0, 1, '2026-03-09 12:05:45', '2026-03-09 12:05:45'),
(8, 'Điều khoản sử dụng 1', 'Nội dung điều khoản...', 1, 0, 1, '2026-03-09 12:06:04', '2026-03-09 12:06:04'),
(9, 'Điều khoản sử dụng 1', 'Nội dung điều khoản...', 1, 0, 1, '2026-03-09 12:11:31', '2026-03-09 12:11:31');

-- --------------------------------------------------------

--
-- Table structure for table `db_posts`
--

CREATE TABLE `db_posts` (
  `post_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) DEFAULT 1,
  `trash` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_posts`
--

INSERT INTO `db_posts` (`post_id`, `title`, `content`, `topic_id`, `author_id`, `created_at`, `updated_at`, `status`, `trash`) VALUES
(1, 'Cách chọn laptop gaming1', 'Nội dung bài viết...', 1, 1, '2026-03-09 19:16:30', '2026-03-09 19:16:51', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `db_products`
--

CREATE TABLE `db_products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `alias` varchar(100) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `detail` text DEFAULT NULL,
  `price` float(10,2) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `trash` tinyint(1) DEFAULT 0,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `launch_date` datetime NOT NULL DEFAULT current_timestamp(),
  `tag` varchar(255) NOT NULL,
  `view` int(11) DEFAULT 50,
  `sale_price` float DEFAULT NULL,
  `summary` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_products`
--

INSERT INTO `db_products` (`product_id`, `product_name`, `alias`, `cat_id`, `brand_id`, `detail`, `price`, `image`, `trash`, `status`, `created_at`, `updated_at`, `launch_date`, `tag`, `view`, `sale_price`, `summary`) VALUES
(4, 'Bó Hoa Hồng Đỏ Lãng Mạn Mới', 'baa-hoa-haeong-aaeo-laang-maaan-maeoi', 2, 2, '', 300.00, 'hinhsp_ (4).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'hoahong, do', 0, 0, '                Bó hoa hồng đỏ tươi thắm, biểu tượng của tình yêu mãnh liệt            '),
(6, 'Giỏ Hoa Chúc Mừng Sang Trọng', 'gio-hoa-chuc-mung-sang-trong', 1, 1, 'Thành phần: Hoa lan vàng, hướng dương, hồng phấn, baby trắng và lá phụ.\r\n\r\nKiểu dáng: Giỏ mây tròn cao cấp, phối màu rực rỡ.\r\n\r\nÝ nghĩa: Thể hiện sự tươi mới, thịnh vượng, may mắn và lời chúc tốt đẹp.\r\n\r\nPhù hợp: Khai trương, chúc mừng, tân gia.\r\n\r\nCó thể ghi kèm thiệp chúc mừng theo yêu cầu.', 113.00, 'hinhsp_ (6).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'giohoa, chucmung, hot', 50, 90, 'Giỏ hoa tươi phối hợp nhiều loại như lan, hồng, hướng dương, mang thông điệp chúc mừng'),
(7, 'Hoa Cắm Bình Trang Trí Nhà', 'hoa-cam-binh-trang-tri-nha', 1, 1, 'Thành phần: Cẩm chướng, hồng pastel, lavender khô và lá bạc.\r\n\r\nBình hoa: Gốm sứ cao cấp màu trắng ngà.\r\n\r\nKích thước: Cao 35cm, rộng 25cm.\r\n\r\nPhong cách: Vintage, nhẹ nhàng, thanh lịch.\r\n\r\nPhù hợp: Trang trí phòng ngủ, bàn làm việc, quầy lễ tân, quán café.', 167.00, 'hinhsp_ (7).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'hot, hoacuoi, giohoa', 150, 120, 'Bình hoa cắm sẵn với tone màu pastel nhẹ nhàng, phù hợp để trang trí phòng khách'),
(11, 'Tên sản phẩm 10', 'ten-san-pham-10', 1, 1, 'Chi tiết sản phẩm 10 ... dummy text', 119.00, 'hinhsp_ (11).jpg', 1, 0, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(12, 'Tên sản phẩm 11', 'ten-san-pham-11', 1, 1, 'Chi tiết sản phẩm 11 ... dummy text', 214.00, 'hinhsp_ (12).jpg', 1, 0, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(14, 'Tên sản phẩm 13', 'ten-san-pham-13', 1, 1, 'Chi tiết sản phẩm 13 ... dummy text', 148.00, 'hinhsp_ (14).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'hot', 51, NULL, NULL),
(15, 'Tên sản phẩm 14', 'ten-san-pham-14', 1, 1, 'Chi tiết sản phẩm 14 ... dummy text', 184.00, 'hinhsp_ (15).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(16, 'Tên sản phẩm 15', 'ten-san-pham-15', 1, 1, 'Chi tiết sản phẩm 15 ... dummy text', 295.00, 'hinhsp_ (16).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(17, 'Tên sản phẩm 16', 'ten-san-pham-16', 1, 1, 'Chi tiết sản phẩm 16 ... dummy text', 245.00, 'hinhsp_ (17).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(18, 'Tên sản phẩm 17', 'ten-san-pham-17', 1, 1, 'Chi tiết sản phẩm 17 ... dummy text', 150.00, 'hinhsp_ (18).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'hot', 50, NULL, NULL),
(19, 'Tên sản phẩm 18', 'ten-san-pham-18', 1, 1, 'Chi tiết sản phẩm 18 ... dummy text', 229.00, 'hinhsp_ (19).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(20, 'Tên sản phẩm 19', 'ten-san-pham-19', 1, 1, 'Chi tiết sản phẩm 19 ... dummy text', 276.00, 'hinhsp_ (20).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 200, NULL, NULL),
(21, 'Tên sản phẩm 20', 'ten-san-pham-20', 1, 1, 'Chi tiết sản phẩm 20 ... dummy text', 177.00, 'hinhsp_ (21).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'hot', 50, NULL, NULL),
(22, 'Tên sản phẩm 21', 'ten-san-pham-21', 1, 1, 'Chi tiết sản phẩm 21 ... dummy text', 248.00, 'hinhsp_ (22).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(23, 'Tên sản phẩm 22', 'ten-san-pham-22', 1, 1, 'Chi tiết sản phẩm 22 ... dummy text', 226.00, 'hinhsp_ (23).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(24, 'Tên sản phẩm 23', 'ten-san-pham-23', 1, 1, 'Chi tiết sản phẩm 23 ... dummy text', 296.00, 'hinhsp_ (24).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(25, 'Tên sản phẩm 24', 'ten-san-pham-24', 1, 1, 'Chi tiết sản phẩm 24 ... dummy text', 229.00, 'hinhsp_ (25).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(26, 'Tên sản phẩm 25', 'ten-san-pham-25', 1, 1, 'Chi tiết sản phẩm 25 ... dummy text', 295.00, 'hinhsp_ (26).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(27, 'Tên sản phẩm 26', 'ten-san-pham-26', 1, 1, 'Chi tiết sản phẩm 26 ... dummy text', 290.00, 'hinhsp_ (27).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'hot', 50, NULL, NULL),
(28, 'Tên sản phẩm 27', 'ten-san-pham-27', 1, 1, 'Chi tiết sản phẩm 27 ... dummy text', 204.00, 'hinhsp_ (28).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'hot', 50, NULL, NULL),
(29, 'Tên sản phẩm 28', 'ten-san-pham-28', 1, 1, 'Chi tiết sản phẩm 28 ... dummy text', 107.00, 'hinhsp_ (29).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(31, 'Tên sản phẩm 30', 'ten-san-pham-30', 1, 1, 'Chi tiết sản phẩm 30 ... dummy text', 230.00, 'hinhsp_ (31).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(32, 'Tên sản phẩm 31', 'ten-san-pham-31', 1, 1, 'Chi tiết sản phẩm 31 ... dummy text', 209.00, 'hinhsp_ (32).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(33, 'Tên sản phẩm 32', 'ten-san-pham-32', 1, 1, 'Chi tiết sản phẩm 32 ... dummy text', 126.00, 'hinhsp_ (33).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', 'hot', 50, NULL, NULL),
(34, 'Tên sản phẩm 33', 'ten-san-pham-33', 1, 1, 'Chi tiết sản phẩm 33 ... dummy text', 291.00, 'hinhsp_ (34).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(35, 'Tên sản phẩm 34', 'ten-san-pham-34', 1, 1, 'Chi tiết sản phẩm 34 ... dummy text', 213.00, 'hinhsp_ (35).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(36, 'Tên sản phẩm 35', 'ten-san-pham-35', 1, 1, 'Chi tiết sản phẩm 35 ... dummy text', 283.00, 'hinhsp_ (36).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(37, 'Tên sản phẩm 36', 'ten-san-pham-36', 1, 1, 'Chi tiết sản phẩm 36 ... dummy text', 102.00, 'hinhsp_ (37).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(38, 'Tên sản phẩm 37', 'ten-san-pham-37', 1, 1, 'Chi tiết sản phẩm 37 ... dummy text', 229.00, 'hinhsp_ (38).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(39, 'Tên sản phẩm 38', 'ten-san-pham-38', 1, 1, 'Chi tiết sản phẩm 38 ... dummy text', 183.00, 'hinhsp_ (39).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(40, 'Tên sản phẩm 39', 'ten-san-pham-39', 1, 1, 'Chi tiết sản phẩm 39 ... dummy text', 155.00, 'hinhsp_ (40).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(41, 'Tên sản phẩm 40', 'ten-san-pham-40', 1, 1, 'Chi tiết sản phẩm 40 ... dummy text', 268.00, 'hinhsp_ (41).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(42, 'Tên sản phẩm 41', 'ten-san-pham-41', 1, 1, 'Chi tiết sản phẩm 41 ... dummy text', 109.00, 'hinhsp_ (42).jpg', 1, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(43, 'Tên sản phẩm 42', 'ten-san-pham-42', 1, 1, 'Chi tiết sản phẩm 42 ... dummy text', 254.00, 'hinhsp_ (43).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(44, 'Tên sản phẩm 43', 'ten-san-pham-43', 1, 1, 'Chi tiết sản phẩm 43 ... dummy text', 154.00, 'hinhsp_ (44).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(45, 'Tên sản phẩm 44', 'ten-san-pham-44', 1, 1, 'Chi tiết sản phẩm 44 ... dummy text', 213.00, 'hinhsp_ (45).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(46, 'Tên sản phẩm 45', 'ten-san-pham-45', 1, 1, 'Chi tiết sản phẩm 45 ... dummy text', 242.00, 'hinhsp_ (46).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(47, 'Tên sản phẩm 46', 'ten-san-pham-46', 1, 1, 'Chi tiết sản phẩm 46 ... dummy text', 116.00, 'hinhsp_ (47).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(48, 'Tên sản phẩm 47', 'ten-san-pham-47', 1, 1, 'Chi tiết sản phẩm 47 ... dummy text', 232.00, 'hinhsp_ (48).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(49, 'Tên sản phẩm 48', 'ten-san-pham-48', 1, 1, 'Chi tiết sản phẩm 48 ... dummy text', 258.00, 'hinhsp_ (49).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(50, 'Tên sản phẩm 49', 'ten-san-pham-49', 1, 1, 'Chi tiết sản phẩm 49 ... dummy text', 287.00, 'hinhsp_ (50).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(51, 'Tên sản phẩm 50', 'ten-san-pham-50', 1, 1, 'Chi tiết sản phẩm 50 ... dummy text', 245.00, 'hinhsp_ (51).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(52, 'Tên sản phẩm 51', 'ten-san-pham-51', 1, 1, 'Chi tiết sản phẩm 51 ... dummy text', 226.00, 'hinhsp_ (52).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(53, 'Tên sản phẩm 52', 'ten-san-pham-52', 1, 1, 'Chi tiết sản phẩm 52 ... dummy text', 180.00, 'hinhsp_ (53).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(54, 'Tên sản phẩm 53', 'ten-san-pham-53', 1, 1, 'Chi tiết sản phẩm 53 ... dummy text', 161.00, 'hinhsp_ (54).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(55, 'Tên sản phẩm 54', 'ten-san-pham-54', 1, 1, 'Chi tiết sản phẩm 54 ... dummy text', 156.00, 'hinhsp_ (55).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(56, 'Tên sản phẩm 55', 'ten-san-pham-55', 1, 1, 'Chi tiết sản phẩm 55 ... dummy text', 128.00, 'hinhsp_ (56).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(57, 'Tên sản phẩm 56', 'ten-san-pham-56', 1, 1, 'Chi tiết sản phẩm 56 ... dummy text', 264.00, 'hinhsp_ (57).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(58, 'Tên sản phẩm 57', 'ten-san-pham-57', 1, 1, 'Chi tiết sản phẩm 57 ... dummy text', 119.00, 'hinhsp_ (58).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(59, 'Tên sản phẩm 58', 'ten-san-pham-58', 1, 1, 'Chi tiết sản phẩm 58 ... dummy text', 118.00, 'hinhsp_ (59).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(60, 'Tên sản phẩm 59', 'ten-san-pham-59', 1, 1, 'Chi tiết sản phẩm 59 ... dummy text', 225.00, 'hinhsp_ (60).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(61, 'Tên sản phẩm 60', 'ten-san-pham-60', 1, 1, 'Chi tiết sản phẩm 60 ... dummy text', 272.00, 'hinhsp_ (61).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(62, 'Tên sản phẩm 61', 'ten-san-pham-61', 1, 1, 'Chi tiết sản phẩm 61 ... dummy text', 119.00, 'hinhsp_ (62).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(63, 'Tên sản phẩm 62', 'ten-san-pham-62', 1, 1, 'Chi tiết sản phẩm 62 ... dummy text', 115.00, 'hinhsp_ (63).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(64, 'Tên sản phẩm 63', 'ten-san-pham-63', 1, 1, 'Chi tiết sản phẩm 63 ... dummy text', 217.00, 'hinhsp_ (64).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(65, 'Tên sản phẩm 64', 'ten-san-pham-64', 1, 1, 'Chi tiết sản phẩm 64 ... dummy text', 236.00, 'hinhsp_ (65).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(66, 'Tên sản phẩm 65', 'ten-san-pham-65', 1, 1, 'Chi tiết sản phẩm 65 ... dummy text', 254.00, 'hinhsp_ (66).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(67, 'Tên sản phẩm 66', 'ten-san-pham-66', 1, 1, 'Chi tiết sản phẩm 66 ... dummy text', 187.00, 'hinhsp_ (67).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(68, 'Tên sản phẩm 67', 'ten-san-pham-67', 1, 1, 'Chi tiết sản phẩm 67 ... dummy text', 239.00, 'hinhsp_ (68).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(69, 'Tên sản phẩm 68', 'ten-san-pham-68', 1, 1, 'Chi tiết sản phẩm 68 ... dummy text', 193.00, 'hinhsp_ (69).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(70, 'Tên sản phẩm 69', 'ten-san-pham-69', 1, 1, 'Chi tiết sản phẩm 69 ... dummy text', 266.00, 'hinhsp_ (70).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(71, 'Tên sản phẩm 70', 'ten-san-pham-70', 1, 1, 'Chi tiết sản phẩm 70 ... dummy text', 192.00, 'hinhsp_ (71).jpg', 0, 0, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(72, 'Tên sản phẩm 71', 'ten-san-pham-71', 1, 1, 'Chi tiết sản phẩm 71 ... dummy text', 289.00, 'hinhsp_ (72).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(73, 'Tên sản phẩm 72', 'ten-san-pham-72', 1, 1, 'Chi tiết sản phẩm 72 ... dummy text', 119.00, 'hinhsp_ (73).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(74, 'Tên sản phẩm 73', 'ten-san-pham-73', 1, 1, 'Chi tiết sản phẩm 73 ... dummy text', 176.00, 'hinhsp_ (74).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(75, 'Tên sản phẩm 74', 'ten-san-pham-74', 1, 1, 'Chi tiết sản phẩm 74 ... dummy text', 203.00, 'hinhsp_ (75).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(76, 'Tên sản phẩm 75', 'ten-san-pham-75', 1, 1, 'Chi tiết sản phẩm 75 ... dummy text', 101.00, 'hinhsp_ (76).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(77, 'Tên sản phẩm 76', 'ten-san-pham-76', 1, 1, 'Chi tiết sản phẩm 76 ... dummy text', 130.00, 'hinhsp_ (77).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(78, 'Tên sản phẩm 77', 'ten-san-pham-77', 1, 1, 'Chi tiết sản phẩm 77 ... dummy text', 166.00, 'hinhsp_ (78).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(79, 'Tên sản phẩm 78', 'ten-san-pham-78', 1, 1, 'Chi tiết sản phẩm 78 ... dummy text', 244.00, 'hinhsp_ (79).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(80, 'Tên sản phẩm 79', 'ten-san-pham-79', 1, 1, 'Chi tiết sản phẩm 79 ... dummy text', 200.00, 'hinhsp_ (80).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(81, 'Tên sản phẩm 80', 'ten-san-pham-80', 1, 1, 'Chi tiết sản phẩm 80 ... dummy text', 254.00, 'hinhsp_ (81).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(82, 'Tên sản phẩm 81', 'ten-san-pham-81', 1, 1, 'Chi tiết sản phẩm 81 ... dummy text', 181.00, 'hinhsp_ (82).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(83, 'Tên sản phẩm 82', 'ten-san-pham-82', 1, 1, 'Chi tiết sản phẩm 82 ... dummy text', 238.00, 'hinhsp_ (83).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(84, 'Tên sản phẩm 83', 'ten-san-pham-83', 1, 1, 'Chi tiết sản phẩm 83 ... dummy text', 104.00, 'hinhsp_ (84).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(85, 'Tên sản phẩm 84', 'ten-san-pham-84', 1, 1, 'Chi tiết sản phẩm 84 ... dummy text', 151.00, 'hinhsp_ (85).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(86, 'Tên sản phẩm 85', 'ten-san-pham-85', 1, 1, 'Chi tiết sản phẩm 85 ... dummy text', 209.00, 'hinhsp_ (86).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(87, 'Tên sản phẩm 86', 'ten-san-pham-86', 1, 1, 'Chi tiết sản phẩm 86 ... dummy text', 236.00, 'hinhsp_ (87).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(88, 'Tên sản phẩm 87', 'ten-san-pham-87', 1, 1, 'Chi tiết sản phẩm 87 ... dummy text', 184.00, 'hinhsp_ (88).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(89, 'Tên sản phẩm 88', 'ten-san-pham-88', 1, 1, 'Chi tiết sản phẩm 88 ... dummy text', 124.00, 'hinhsp_ (89).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(91, 'Tên sản phẩm 90', 'ten-san-pham-90', 1, 1, 'Chi tiết sản phẩm 90 ... dummy text', 187.00, 'hinhsp_ (91).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(92, 'Tên sản phẩm 91', 'ten-san-pham-91', 1, 1, 'Chi tiết sản phẩm 91 ... dummy text', 252.00, 'hinhsp_ (92).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(93, 'Tên sản phẩm 92', 'ten-san-pham-92', 1, 1, 'Chi tiết sản phẩm 92 ... dummy text', 190.00, 'hinhsp_ (93).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(94, 'Tên sản phẩm 93', 'ten-san-pham-93', 1, 1, 'Chi tiết sản phẩm 93 ... dummy text', 211.00, 'hinhsp_ (94).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(95, 'Tên sản phẩm 94', 'ten-san-pham-94', 1, 1, 'Chi tiết sản phẩm 94 ... dummy text', 121.00, 'hinhsp_ (95).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(96, 'Tên sản phẩm 95', 'ten-san-pham-95', 1, 1, 'Chi tiết sản phẩm 95 ... dummy text', 171.00, 'hinhsp_ (96).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(97, 'Tên sản phẩm 96', 'ten-san-pham-96', 1, 1, 'Chi tiết sản phẩm 96 ... dummy text', 216.00, 'hinhsp_ (97).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(98, 'Tên sản phẩm 97', 'ten-san-pham-97', 1, 1, 'Chi tiết sản phẩm 97 ... dummy text', 151.00, 'hinhsp_ (98).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(99, 'Tên sản phẩm 98', 'ten-san-pham-98', 1, 1, 'Chi tiết sản phẩm 98 ... dummy text', 236.00, 'hinhsp_ (99).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(100, 'Tên sản phẩm 99', 'ten-san-pham-99', 1, 1, 'Chi tiết sản phẩm 99 ... dummy text', 283.00, 'hinhsp_ (100).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(101, 'Tên sản phẩm 100', 'ten-san-pham-100', 1, 1, 'Chi tiết sản phẩm 100 ... dummy text', 108.00, 'hinhsp_ (101).jpg', 0, 1, '2024-08-30 00:17:05', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(102, 'Tên sản phẩm 1', 'ten-san-pham-1', 1, 1, 'Chi tiết sản phẩm 1 ... dummy text', 250.00, 'hinhsp_ (102).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 52, NULL, NULL),
(103, 'Tên sản phẩm 2', 'ten-san-pham-2', 1, 1, 'Chi tiết sản phẩm 2 ... dummy text', 169.00, 'hinhsp_ (103).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(104, 'Tên sản phẩm 3', 'ten-san-pham-3', 1, 1, 'Chi tiết sản phẩm 3 ... dummy text', 226.00, 'hinhsp_ (104).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(105, 'Tên sản phẩm 4', 'ten-san-pham-4', 1, 1, 'Chi tiết sản phẩm 4 ... dummy text', 222.00, 'hinhsp_ (105).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(106, 'Tên sản phẩm 5', 'ten-san-pham-5', 1, 1, 'Chi tiết sản phẩm 5 ... dummy text', 236.00, 'hinhsp_ (106).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(107, 'Tên sản phẩm 6', 'ten-san-pham-6', 1, 1, 'Chi tiết sản phẩm 6 ... dummy text', 272.00, 'hinhsp_ (107).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(108, 'Tên sản phẩm 7', 'ten-san-pham-7', 1, 1, 'Chi tiết sản phẩm 7 ... dummy text', 137.00, 'hinhsp_ (108).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(109, 'Tên sản phẩm 8', 'ten-san-pham-8', 1, 1, 'Chi tiết sản phẩm 8 ... dummy text', 169.00, 'hinhsp_ (109).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(110, 'Tên sản phẩm 9', 'ten-san-pham-9', 1, 1, 'Chi tiết sản phẩm 9 ... dummy text', 286.00, 'hinhsp_ (110).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(111, 'Tên sản phẩm 10', 'ten-san-pham-10', 1, 1, 'Chi tiết sản phẩm 10 ... dummy text', 273.00, 'hinhsp_ (111).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(112, 'Tên sản phẩm 11', 'ten-san-pham-11', 1, 1, 'Chi tiết sản phẩm 11 ... dummy text', 151.00, 'hinhsp_ (112).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(113, 'Tên sản phẩm 12', 'ten-san-pham-12', 1, 1, 'Chi tiết sản phẩm 12 ... dummy text', 217.00, 'hinhsp_ (113).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(114, 'Tên sản phẩm 13', 'ten-san-pham-13', 1, 1, 'Chi tiết sản phẩm 13 ... dummy text', 209.00, 'hinhsp_ (114).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 51, NULL, NULL),
(115, 'Tên sản phẩm 14', 'ten-san-pham-14', 1, 1, 'Chi tiết sản phẩm 14 ... dummy text', 158.00, 'hinhsp_ (115).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(116, 'Tên sản phẩm 15', 'ten-san-pham-15', 1, 1, 'Chi tiết sản phẩm 15 ... dummy text', 149.00, 'hinhsp_ (116).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(117, 'Tên sản phẩm 16', 'ten-san-pham-16', 1, 1, 'Chi tiết sản phẩm 16 ... dummy text', 287.00, 'hinhsp_ (117).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(118, 'Tên sản phẩm 17', 'ten-san-pham-17', 1, 1, 'Chi tiết sản phẩm 17 ... dummy text', 181.00, 'hinhsp_ (118).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(119, 'Tên sản phẩm 18', 'ten-san-pham-18', 1, 1, 'Chi tiết sản phẩm 18 ... dummy text', 240.00, 'hinhsp_ (119).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(120, 'Tên sản phẩm 19', 'ten-san-pham-19', 1, 1, 'Chi tiết sản phẩm 19 ... dummy text', 112.00, 'hinhsp_ (120).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(121, 'Tên sản phẩm 20', 'ten-san-pham-20', 1, 1, 'Chi tiết sản phẩm 20 ... dummy text', 193.00, 'hinhsp_ (121).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(122, 'Tên sản phẩm 21', 'ten-san-pham-21', 1, 1, 'Chi tiết sản phẩm 21 ... dummy text', 296.00, 'hinhsp_ (122).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(123, 'Tên sản phẩm 22', 'ten-san-pham-22', 1, 1, 'Chi tiết sản phẩm 22 ... dummy text', 107.00, 'hinhsp_ (123).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(124, 'Tên sản phẩm 23', 'ten-san-pham-23', 1, 1, 'Chi tiết sản phẩm 23 ... dummy text', 102.00, 'hinhsp_ (124).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(125, 'Tên sản phẩm 24', 'ten-san-pham-24', 1, 1, 'Chi tiết sản phẩm 24 ... dummy text', 206.00, 'hinhsp_ (125).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(126, 'Tên sản phẩm 25', 'ten-san-pham-25', 1, 1, 'Chi tiết sản phẩm 25 ... dummy text', 221.00, 'hinhsp_ (126).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(127, 'Tên sản phẩm 26', 'ten-san-pham-26', 1, 1, 'Chi tiết sản phẩm 26 ... dummy text', 273.00, 'hinhsp_ (127).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(128, 'Tên sản phẩm 27', 'ten-san-pham-27', 1, 1, 'Chi tiết sản phẩm 27 ... dummy text', 223.00, 'hinhsp_ (128).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(129, 'Tên sản phẩm 28', 'ten-san-pham-28', 1, 1, 'Chi tiết sản phẩm 28 ... dummy text', 212.00, 'hinhsp_ (129).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(130, 'Tên sản phẩm 29', 'ten-san-pham-29', 1, 1, 'Chi tiết sản phẩm 29 ... dummy text', 166.00, 'hinhsp_ (130).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(131, 'Tên sản phẩm 30', 'ten-san-pham-30', 1, 1, 'Chi tiết sản phẩm 30 ... dummy text', 166.00, 'hinhsp_ (131).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(132, 'Tên sản phẩm 31', 'ten-san-pham-31', 1, 1, 'Chi tiết sản phẩm 31 ... dummy text', 166.00, 'hinhsp_ (132).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(133, 'Tên sản phẩm 32', 'ten-san-pham-32', 1, 1, 'Chi tiết sản phẩm 32 ... dummy text', 164.00, 'hinhsp_ (133).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(134, 'Tên sản phẩm 33', 'ten-san-pham-33', 1, 1, 'Chi tiết sản phẩm 33 ... dummy text', 157.00, 'hinhsp_ (134).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(135, 'Tên sản phẩm 34', 'ten-san-pham-34', 1, 1, 'Chi tiết sản phẩm 34 ... dummy text', 107.00, 'hinhsp_ (135).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(136, 'Tên sản phẩm 35', 'ten-san-pham-35', 1, 1, 'Chi tiết sản phẩm 35 ... dummy text', 283.00, 'hinhsp_ (136).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(137, 'Tên sản phẩm 36', 'ten-san-pham-36', 1, 1, 'Chi tiết sản phẩm 36 ... dummy text', 139.00, 'hinhsp_ (137).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(138, 'Tên sản phẩm 37', 'ten-san-pham-37', 1, 1, 'Chi tiết sản phẩm 37 ... dummy text', 194.00, 'hinhsp_ (138).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(139, 'Tên sản phẩm 38', 'ten-san-pham-38', 1, 1, 'Chi tiết sản phẩm 38 ... dummy text', 292.00, 'hinhsp_ (139).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(140, 'Tên sản phẩm 39', 'ten-san-pham-39', 1, 1, 'Chi tiết sản phẩm 39 ... dummy text', 237.00, 'hinhsp_ (140).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(141, 'Tên sản phẩm 40', 'ten-san-pham-40', 1, 1, 'Chi tiết sản phẩm 40 ... dummy text', 264.00, 'hinhsp_ (141).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(142, 'Tên sản phẩm 41', 'ten-san-pham-41', 1, 1, 'Chi tiết sản phẩm 41 ... dummy text', 179.00, 'hinhsp_ (142).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(143, 'Tên sản phẩm 42', 'ten-san-pham-42', 1, 1, 'Chi tiết sản phẩm 42 ... dummy text', 144.00, 'hinhsp_ (143).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(144, 'Tên sản phẩm 43', 'ten-san-pham-43', 1, 1, 'Chi tiết sản phẩm 43 ... dummy text', 169.00, 'hinhsp_ (144).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(145, 'Tên sản phẩm 44', 'ten-san-pham-44', 1, 1, 'Chi tiết sản phẩm 44 ... dummy text', 187.00, 'hinhsp_ (145).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(146, 'Tên sản phẩm 45', 'ten-san-pham-45', 1, 1, 'Chi tiết sản phẩm 45 ... dummy text', 242.00, 'hinhsp_ (146).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(147, 'Tên sản phẩm 46', 'ten-san-pham-46', 1, 1, 'Chi tiết sản phẩm 46 ... dummy text', 124.00, 'hinhsp_ (147).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(148, 'Tên sản phẩm 47', 'ten-san-pham-47', 1, 1, 'Chi tiết sản phẩm 47 ... dummy text', 189.00, 'hinhsp_ (148).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(149, 'Tên sản phẩm 48', 'ten-san-pham-48', 1, 1, 'Chi tiết sản phẩm 48 ... dummy text', 131.00, 'hinhsp_ (149).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(150, 'Tên sản phẩm 49', 'ten-san-pham-49', 1, 1, 'Chi tiết sản phẩm 49 ... dummy text', 220.00, 'hinhsp_ (150).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(151, 'Tên sản phẩm 50', 'ten-san-pham-50', 1, 1, 'Chi tiết sản phẩm 50 ... dummy text', 256.00, 'hinhsp_ (151).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(152, 'Tên sản phẩm 51', 'ten-san-pham-51', 1, 1, 'Chi tiết sản phẩm 51 ... dummy text', 294.00, 'hinhsp_ (152).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(153, 'Tên sản phẩm 52', 'ten-san-pham-52', 1, 1, 'Chi tiết sản phẩm 52 ... dummy text', 266.00, 'hinhsp_ (153).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(154, 'Tên sản phẩm 53', 'ten-san-pham-53', 1, 1, 'Chi tiết sản phẩm 53 ... dummy text', 156.00, 'hinhsp_ (154).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(155, 'Tên sản phẩm 54', 'ten-san-pham-54', 1, 1, 'Chi tiết sản phẩm 54 ... dummy text', 176.00, 'hinhsp_ (155).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(156, 'Tên sản phẩm 55', 'ten-san-pham-55', 1, 1, 'Chi tiết sản phẩm 55 ... dummy text', 169.00, 'hinhsp_ (156).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(157, 'Tên sản phẩm 56', 'ten-san-pham-56', 1, 1, 'Chi tiết sản phẩm 56 ... dummy text', 136.00, 'hinhsp_ (157).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(158, 'Tên sản phẩm 57', 'ten-san-pham-57', 1, 1, 'Chi tiết sản phẩm 57 ... dummy text', 123.00, 'hinhsp_ (158).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(159, 'Tên sản phẩm 58', 'ten-san-pham-58', 1, 1, 'Chi tiết sản phẩm 58 ... dummy text', 291.00, 'hinhsp_ (159).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(160, 'Tên sản phẩm 59', 'ten-san-pham-59', 1, 1, 'Chi tiết sản phẩm 59 ... dummy text', 184.00, 'hinhsp_ (160).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(161, 'Tên sản phẩm 60', 'ten-san-pham-60', 1, 1, 'Chi tiết sản phẩm 60 ... dummy text', 175.00, 'hinhsp_ (161).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(162, 'Tên sản phẩm 61', 'ten-san-pham-61', 1, 1, 'Chi tiết sản phẩm 61 ... dummy text', 108.00, 'hinhsp_ (162).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(163, 'Tên sản phẩm 62', 'ten-san-pham-62', 1, 1, 'Chi tiết sản phẩm 62 ... dummy text', 287.00, 'hinhsp_ (163).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(164, 'Tên sản phẩm 63', 'ten-san-pham-63', 1, 1, 'Chi tiết sản phẩm 63 ... dummy text', 100.00, 'hinhsp_ (164).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(165, 'Tên sản phẩm 64', 'ten-san-pham-64', 1, 1, 'Chi tiết sản phẩm 64 ... dummy text', 204.00, 'hinhsp_ (165).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(166, 'Tên sản phẩm 65', 'ten-san-pham-65', 1, 1, 'Chi tiết sản phẩm 65 ... dummy text', 180.00, 'hinhsp_ (166).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(167, 'Tên sản phẩm 66', 'ten-san-pham-66', 1, 1, 'Chi tiết sản phẩm 66 ... dummy text', 285.00, 'hinhsp_ (167).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(168, 'Tên sản phẩm 67', 'ten-san-pham-67', 1, 1, 'Chi tiết sản phẩm 67 ... dummy text', 104.00, 'hinhsp_ (168).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(169, 'Tên sản phẩm 68', 'ten-san-pham-68', 1, 1, 'Chi tiết sản phẩm 68 ... dummy text', 239.00, 'hinhsp_ (169).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(170, 'Tên sản phẩm 69', 'ten-san-pham-69', 1, 1, 'Chi tiết sản phẩm 69 ... dummy text', 136.00, 'hinhsp_ (170).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(171, 'Tên sản phẩm 70', 'ten-san-pham-70', 1, 1, 'Chi tiết sản phẩm 70 ... dummy text', 231.00, 'hinhsp_ (171).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(172, 'Tên sản phẩm 71', 'ten-san-pham-71', 1, 1, 'Chi tiết sản phẩm 71 ... dummy text', 287.00, 'hinhsp_ (172).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(173, 'Tên sản phẩm 72', 'ten-san-pham-72', 1, 1, 'Chi tiết sản phẩm 72 ... dummy text', 280.00, 'hinhsp_ (173).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(174, 'Tên sản phẩm 73', 'ten-san-pham-73', 1, 1, 'Chi tiết sản phẩm 73 ... dummy text', 265.00, 'hinhsp_ (174).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(175, 'Tên sản phẩm 74', 'ten-san-pham-74', 1, 1, 'Chi tiết sản phẩm 74 ... dummy text', 247.00, 'hinhsp_ (175).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(176, 'Tên sản phẩm 75', 'ten-san-pham-75', 1, 1, 'Chi tiết sản phẩm 75 ... dummy text', 221.00, 'hinhsp_ (176).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(177, 'Tên sản phẩm 76', 'ten-san-pham-76', 1, 1, 'Chi tiết sản phẩm 76 ... dummy text', 283.00, 'hinhsp_ (177).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(178, 'Tên sản phẩm 77', 'ten-san-pham-77', 1, 1, 'Chi tiết sản phẩm 77 ... dummy text', 241.00, 'hinhsp_ (178).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(179, 'Tên sản phẩm 78', 'ten-san-pham-78', 1, 1, 'Chi tiết sản phẩm 78 ... dummy text', 232.00, 'hinhsp_ (179).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(180, 'Tên sản phẩm 79', 'ten-san-pham-79', 1, 1, 'Chi tiết sản phẩm 79 ... dummy text', 137.00, 'hinhsp_ (180).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(181, 'Tên sản phẩm 80', 'ten-san-pham-80', 1, 1, 'Chi tiết sản phẩm 80 ... dummy text', 189.00, 'hinhsp_ (181).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(182, 'Tên sản phẩm 81', 'ten-san-pham-81', 1, 1, 'Chi tiết sản phẩm 81 ... dummy text', 234.00, 'hinhsp_ (182).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(183, 'Tên sản phẩm 82', 'ten-san-pham-82', 1, 1, 'Chi tiết sản phẩm 82 ... dummy text', 154.00, 'hinhsp_ (183).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(184, 'Tên sản phẩm 83', 'ten-san-pham-83', 1, 1, 'Chi tiết sản phẩm 83 ... dummy text', 226.00, 'hinhsp_ (184).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(185, 'Tên sản phẩm 84', 'ten-san-pham-84', 1, 1, 'Chi tiết sản phẩm 84 ... dummy text', 225.00, 'hinhsp_ (185).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(186, 'Tên sản phẩm 85', 'ten-san-pham-85', 1, 1, 'Chi tiết sản phẩm 85 ... dummy text', 247.00, 'hinhsp_ (186).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(187, 'Tên sản phẩm 86', 'ten-san-pham-86', 1, 1, 'Chi tiết sản phẩm 86 ... dummy text', 111.00, 'hinhsp_ (187).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(188, 'Tên sản phẩm 87', 'ten-san-pham-87', 1, 1, 'Chi tiết sản phẩm 87 ... dummy text', 277.00, 'hinhsp_ (188).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(189, 'Tên sản phẩm 88', 'ten-san-pham-88', 1, 1, 'Chi tiết sản phẩm 88 ... dummy text', 120.00, 'hinhsp_ (189).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(190, 'Tên sản phẩm 89', 'ten-san-pham-89', 1, 1, 'Chi tiết sản phẩm 89 ... dummy text', 246.00, 'hinhsp_ (190).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(191, 'Tên sản phẩm 90', 'ten-san-pham-90', 1, 1, 'Chi tiết sản phẩm 90 ... dummy text', 149.00, 'hinhsp_ (191).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(192, 'Tên sản phẩm 91', 'ten-san-pham-91', 1, 1, 'Chi tiết sản phẩm 91 ... dummy text', 280.00, 'hinhsp_ (192).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(193, 'Tên sản phẩm 92', 'ten-san-pham-92', 1, 1, 'Chi tiết sản phẩm 92 ... dummy text', 227.00, 'hinhsp_ (193).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(194, 'Tên sản phẩm 93', 'ten-san-pham-93', 1, 1, 'Chi tiết sản phẩm 93 ... dummy text', 211.00, 'hinhsp_ (194).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(195, 'Tên sản phẩm 94', 'ten-san-pham-94', 1, 1, 'Chi tiết sản phẩm 94 ... dummy text', 194.00, 'hinhsp_ (195).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(196, 'Tên sản phẩm 95', 'ten-san-pham-95', 1, 1, 'Chi tiết sản phẩm 95 ... dummy text', 121.00, 'hinhsp_ (196).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(197, 'Tên sản phẩm 96', 'ten-san-pham-96', 1, 1, 'Chi tiết sản phẩm 96 ... dummy text', 239.00, 'hinhsp_ (197).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(198, 'Tên sản phẩm 97', 'ten-san-pham-97', 1, 1, 'Chi tiết sản phẩm 97 ... dummy text', 263.00, 'hinhsp_ (198).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(199, 'Tên sản phẩm 98', 'ten-san-pham-98', 1, 1, 'Chi tiết sản phẩm 98 ... dummy text', 281.00, 'hinhsp_ (199).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(200, 'Tên sản phẩm 99', 'ten-san-pham-99', 1, 1, 'Chi tiết sản phẩm 99 ... dummy text', 148.00, 'hinhsp_ (200).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(201, 'Tên sản phẩm 100', 'ten-san-pham-100', 1, 1, 'Chi tiết sản phẩm 100 ... dummy text', 238.00, 'hinhsp_ (201).jpg', 0, 1, '2024-08-30 00:17:23', '2026-03-06 09:21:26', '2024-12-16 16:33:06', '', 50, NULL, NULL),
(209, 'San pham 23-1', 'san-pham-23-1', 2, 2, 'chi tiet', 200.00, 'hinhsp_ (209).jpg', 0, 1, '2024-12-25 00:18:16', '2026-03-06 09:21:26', '2024-12-25 14:17:00', 'natural', 50, NULL, NULL),
(210, 'san phẩm 12-12', 'san-pham-12-12', 1, 2, 'chi tiet', 100.00, 'hinhsp_ (210).jpg', 0, 1, '2024-12-25 00:22:27', '2026-03-06 09:21:26', '2024-12-25 14:22:00', 'natural', 50, NULL, NULL),
(211, 'sản phẩm 12-2-2', 'saaan-phaaam-12-2-2', 1, 1, 'kjk', 1000.00, 'hinhsp_ (211).jpg', 0, 1, '2024-12-25 00:28:23', '2026-03-06 09:21:26', '2024-12-25 14:28:00', 'natural', 50, NULL, NULL),
(212, 'Hoa mùa hè', 'hoa-maea-hae', 1, 1, 'kkk', 100.00, 'hinhsp_ (212).jpg', 0, 1, '2024-12-25 01:00:15', '2026-03-06 09:21:26', '2024-12-25 15:00:00', 'natural', 50, NULL, NULL),
(213, 'Hoa mùa hè', 'hoa-maea-hae', 1, 1, 'kkk', 100.00, 'hinhsp_ (213).jpg', 0, 1, '2024-12-25 01:00:15', '2026-03-06 09:21:26', '2024-12-25 15:00:00', 'natural', 50, NULL, NULL),
(214, 'san pham moi', 'san-pham-moi', 1, 1, 'detail', 100.00, 'hinhsp_ (214).jpg', 0, 1, '2025-10-09 04:26:10', '2026-03-06 09:21:26', '2025-10-31 17:50:00', 'hot', 0, 0, 'summary'),
(215, 'san pham moi  ngay 9-10', 'san-pham-moi-ngay-9-10', 4, 1, 'san pham moi  ngay 9-10 detail', 200.00, 'hinhsp_ (215).jpg', 0, 1, '2025-10-09 04:27:18', '2026-03-06 09:21:26', '2025-10-31 18:27:00', 'new', 0, 0, 'san pham moi  ngay 9-10 summary'),
(216, 'san pham ngay 12-10', 'san-pham-ngay-12-10', 4, 1, 'detail', 100.00, '1772788996047-474494636.jpg', 0, 1, '2025-10-11 22:46:18', '2026-03-06 09:23:16', '2025-10-12 12:46:00', 'new', 0, 0, 'summary');

-- --------------------------------------------------------

--
-- Table structure for table `db_topics`
--

CREATE TABLE `db_topics` (
  `topic_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) DEFAULT 1,
  `trash` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_topics`
--

INSERT INTO `db_topics` (`topic_id`, `name`, `description`, `created_at`, `updated_at`, `status`, `trash`) VALUES
(1, 'topic1', 'Nội dung topic...', '2026-03-09 19:15:48', '2026-03-09 19:15:48', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `db_users`
--

CREATE TABLE `db_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `trash` tinyint(1) DEFAULT 0,
  `email` varchar(100) NOT NULL,
  `user_type` enum('user','admin') DEFAULT 'user',
  `admin_level` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `avatar` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_users`
--

INSERT INTO `db_users` (`user_id`, `username`, `fullname`, `pass`, `status`, `trash`, `email`, `user_type`, `admin_level`, `created_at`, `updated_at`, `avatar`) VALUES
(1, 'hoa', 'ctmai', '$2y$10$rkOnncE00g4CvXunjg8aXuCBf.0wyMiL9yRoXBE2baaRwsDvArjlS', 1, 0, 'doudou366@gmail.com', 'admin', NULL, '2024-09-07 05:47:42', '2026-03-09 10:44:07', ''),
(2, 'trung', 'nguyen van trung', '$2y$10$83iIuq/7.7GMwIo/G04qaOSiJ7k2BAwKKTcq7KFXukOF6He9a308W', 1, 0, 'titosbi@yahoo.com', 'admin', NULL, '2024-09-07 07:31:12', '2024-09-07 08:21:46', ''),
(3, 'abc', 'abc', '$2y$10$l.Hn40bpYIp5SbMFPt/d0O1CBRaF2JaU31m4F9MDTZsEbAi3ThZou', 1, 0, 'titosbi@1yahoo.com', 'user', NULL, '2024-09-07 07:40:26', '2024-09-07 07:40:26', ''),
(4, 'mai1', 'mai1', '$2y$10$o5.r725h8pClPki59aflKOPPvBlbikdlICiJFXJWZ5eOccWps3Gfm', 1, 0, 'chuthimai@hitu.edu.vn', 'admin', NULL, '2024-09-12 00:24:42', '2025-10-12 10:04:12', ''),
(5, 'maihoaxuan', 'mai hoa xuan', '$2y$10$tpkmYOidW/wH.S6M.mDaDu4.enrRQ2MBCrYewXCic9R4Wp0zYywz2', 1, 0, 'maihoaxuan@yahoo.com', 'user', NULL, '2024-12-31 15:28:13', '2024-12-31 15:28:13', NULL),
(6, 'thuxem', 'mai bong an tet', '$2y$10$LfcxZ1ZxMyVJDmvFitg1nODzvhUw1gASPzr14maAErY2clyy6PKcK', 1, 0, 'thuxem10000@yahoo.com', 'user', NULL, '2024-12-31 15:40:55', '2025-01-01 02:47:44', 'file_67750bbed06c62.02457487.png'),
(7, 'thuxem1', 'thu xem', '$2y$10$CiU2emR0vs0dhod.DhmYIuPSku.pSloATEDmgyf5YoUwBrTd9XHWG', 1, 0, 'thuxem1@yahoo.com', 'user', NULL, '2024-12-31 15:42:02', '2024-12-31 15:42:02', NULL),
(8, 'mai', 'mai hoa', '$2y$10$AvNfYgw9HYlgwtZZ9UcuROW2DAJj0S41n/mrxsY29zpixPRYp./j6', 1, 0, 'abc@yahoo.com', 'user', NULL, '2025-10-12 02:36:06', '2025-10-12 02:36:06', NULL),
(9, 'mai1122', 'mai hoa minh', '$2y$10$zjkjS4fLD7HCpLGOpRQZYuspTyw4BQAFG7lw3ssVxy01poN6x8YVy', 1, 0, 'abc1@yahoo.com', 'admin', NULL, '2025-10-12 02:37:50', '2025-10-12 10:03:28', NULL),
(10, 'mai123', 'Mai Nguyen moi', '$2b$10$ngE.fu3NqR1yFdHob5kzGOwIhw4zqIDcwiiKfIzOHTizm1uOf1MRy', 1, 0, 'mai@gmail.com', 'admin', NULL, '2026-03-06 13:03:42', '2026-03-10 02:09:54', 'avatar.jpg'),
(11, 'mai12345', 'Mai Nguyen 1', '$2b$10$aoCbymXeoYEltUL7hhJUUu0NBt6ccsobKJ1TOV5tCrgPRdSjQxcTy', 1, 0, 'mai1@gmail.com', 'user', NULL, '2026-03-06 13:11:23', '2026-03-06 13:11:23', 'avatar.jpg'),
(12, 'mai123457', 'Mai Nguyen 17', '$2b$10$rDObpPjjSZxd4fgrZsIyneW1KrlelbisH34wsWKcDL/Vcltrh6GVa', 1, 0, 'mai17@gmail.com', 'user', NULL, '2026-03-06 13:40:41', '2026-03-06 13:40:41', 'avatar.jpg'),
(13, 'mai123456789', 'Mai Nguyen4567', '$2b$10$1oc1V3lj7Km6AGGh0lHqO.2HB8.b3Mpju50lDp9MX9fxWUTY4XOXK', 1, 0, 'mai456789@gmail.com', 'user', NULL, '2026-03-09 10:41:14', '2026-03-09 10:41:14', 'avatar.jpg'),
(14, 'mai123ooo', 'Mai Nguyen', '$2b$10$rIcY7.QLKBCOKidnJ.U/E.i1vrOwDfejl0SzgNr5CeGu.7y82yxi.', 1, 0, 'mai333333@gmail.com', 'user', NULL, '2026-03-10 02:27:12', '2026-03-10 02:27:12', 'avatar.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `db_banners`
--
ALTER TABLE `db_banners`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `db_brands`
--
ALTER TABLE `db_brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `db_categories`
--
ALTER TABLE `db_categories`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `db_contacts`
--
ALTER TABLE `db_contacts`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `db_links`
--
ALTER TABLE `db_links`
  ADD PRIMARY KEY (`link_id`);

--
-- Indexes for table `db_orders`
--
ALTER TABLE `db_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `db_order_details`
--
ALTER TABLE `db_order_details`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `db_pages`
--
ALTER TABLE `db_pages`
  ADD PRIMARY KEY (`page_id`);

--
-- Indexes for table `db_posts`
--
ALTER TABLE `db_posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `db_products`
--
ALTER TABLE `db_products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `cat_id` (`cat_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `db_topics`
--
ALTER TABLE `db_topics`
  ADD PRIMARY KEY (`topic_id`);

--
-- Indexes for table `db_users`
--
ALTER TABLE `db_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `db_banners`
--
ALTER TABLE `db_banners`
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `db_brands`
--
ALTER TABLE `db_brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `db_categories`
--
ALTER TABLE `db_categories`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `db_contacts`
--
ALTER TABLE `db_contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `db_links`
--
ALTER TABLE `db_links`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `db_orders`
--
ALTER TABLE `db_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `db_order_details`
--
ALTER TABLE `db_order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `db_pages`
--
ALTER TABLE `db_pages`
  MODIFY `page_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `db_posts`
--
ALTER TABLE `db_posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `db_products`
--
ALTER TABLE `db_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT for table `db_topics`
--
ALTER TABLE `db_topics`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `db_users`
--
ALTER TABLE `db_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `db_order_details`
--
ALTER TABLE `db_order_details`
  ADD CONSTRAINT `db_order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `db_orders` (`order_id`),
  ADD CONSTRAINT `db_order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `db_products` (`product_id`);

--
-- Constraints for table `db_posts`
--
ALTER TABLE `db_posts`
  ADD CONSTRAINT `db_posts_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `db_topics` (`topic_id`),
  ADD CONSTRAINT `db_posts_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `db_users` (`user_id`);

--
-- Constraints for table `db_products`
--
ALTER TABLE `db_products`
  ADD CONSTRAINT `db_products_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `db_categories` (`cat_id`),
  ADD CONSTRAINT `db_products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `db_brands` (`brand_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
