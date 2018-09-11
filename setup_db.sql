SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `congregations` (
  `id` int(11) NOT NULL,
  `number` int(11) DEFAULT NULL,
  `name` text,
  `modify_date` varchar(20) DEFAULT NULL,
  `deleted` varchar(1) NOT NULL DEFAULT 'F'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `lectures` (
  `id` int(11) NOT NULL,
  `number` int(11) DEFAULT NULL,
  `title` text,
  `modify_date` varchar(20) DEFAULT NULL,
  `deleted` varchar(1) NOT NULL DEFAULT 'F'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `prepared_lectures` (
  `speaker_id` int(11) NOT NULL,
  `lecture_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `speaker_id` int(11) DEFAULT NULL,
  `lecture_id` int(11) DEFAULT NULL,
  `event_date` varchar(20) DEFAULT NULL,
  `event_time` varchar(10) DEFAULT NULL,
  `note` text,
  `modify_date` varchar(20) DEFAULT NULL,
  `deleted` varchar(1) NOT NULL DEFAULT 'F'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `settings` (
  `parameter` varchar(100) NOT NULL,
  `value` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `speakers` (
  `id` int(11) NOT NULL,
  `congregation_id` int(11) DEFAULT NULL,
  `first_name` text,
  `last_name` text,
  `phone` text,
  `email` text,
  `privilege` text,
  `note` text,
  `modify_date` varchar(20) DEFAULT NULL,
  `deleted` varchar(1) NOT NULL DEFAULT 'F'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `access_privilege` varchar(1) NOT NULL DEFAULT 'F'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `congregations`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `lectures`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `settings`
  ADD PRIMARY KEY (`parameter`),
  ADD UNIQUE KEY `parameter` (`parameter`);

ALTER TABLE `speakers`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `congregations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `lectures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `speakers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `settings` VALUES ('DEFAULT_EVENT_TIME', '10:00');

COMMIT;
