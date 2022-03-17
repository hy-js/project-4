DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
   -- OR
   -- id VARCHAR(100) UNIQUE NOT NULL,
   -- CONSTRAINT users_pkey PRIMARY KEY (id),
   id SERIAL PRIMARY KEY,
   firstname VARCHAR(250) NOT NULL,
   lastname VARCHAR(250) NOT NULL,
   email VARCHAR(250) NOT NULL,
   password VARCHAR(72) NOT NULL,
   created TIME DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts(
   post_id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   title VARCHAR(255) NOT NULL,
   content VARCHAR(1000) NOT NULL,
   created TIME DEFAULT now(),
   CONSTRAINT fk_users
      FOREIGN KEY(user_id)
         REFERENCES users(id)
         ON DELETE CASCADE
         ON UPDATE CASCADE
);

