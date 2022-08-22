CREATE TABLE users (
	id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	image_url VARCHAR(255) DEFAULT 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE table chats (
	id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
	chat_name VARCHAR(50) NOT NULL,
	is_group_chat BOOLEAN DEFAULT false,
	latest_message UUID,
	group_admin UUID,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	FOREIGN KEY (group_admin) REFERENCES users(id)
);

CREATE table messages (
	id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
	sender UUID NOT NULL,
	chat UUID NOT NULL,
	content TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	FOREIGN KEY (sender) REFERENCES users(id),
	FOREIGN KEY (chat) REFERENCES chats(id)
);

ALTER TABLE chats ADD FOREIGN KEY (latest_message) REFERENCES messages(id);

CREATE table chat_user (
	chat_id UUID NOT NULL,
	user_id UUID NOT NULL,
	FOREIGN KEY (chat_id) REFERENCES chats(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);
