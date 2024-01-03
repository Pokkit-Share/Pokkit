import 'server-only';

import { connectDB } from '@/lib/database';

// Use this route to migrate data
export async function GET(request: Request) {
	try {
		const sql = await connectDB();
		console.log('db connected!');

		const response = await sql.transaction([
			sql`
			INSERT INTO "auth"."user" ("id", "username")
			VALUES
				('69ca1315-b9ca-4e62-aadb-7dfef923cf1a', 'user1'),
				('9dd2ed8c-f19d-42dc-b11e-0f9f5f623464', 'user2'),
				('96dc1455-38e6-41dc-9602-bf884942ff8c', 'user3');
			`,
			sql`
			INSERT INTO "post"."thread" ("id", "title", "series", "format", "rental_code", "description", "body", "upvotes", "user_id")
			VALUES
				('f0c71094-dbce-4e50-b143-36e791a04337', 'Ceruledge And Landorus', 'Pokemon Scarlet & Violet', 'Regulation B', '01BB5X', 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', 'Body 1', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a'),
				('99b2e008-25ed-403a-830d-01daef11daf4', 'Ceruledge And Landorus', 'Pokemon Scarlet & Violet', 'Regulation B', '01BB5X', null, 'Body 2', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a'),
				('9e2419a6-ba95-4186-b9fd-bf76ee370c9d', 'Ceruledge And Landorus', 'Pokemon Scarlet & Violet', 'Regulation B', '01BB5X', 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', 'Body 3', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a'),
				('46cfb007-ea14-4684-b4ea-27014bd5a5a8', 'Ceruledge And Landorus', 'Pokemon Scarlet & Violet', 'Regulation B', '01BB5X', 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', 'Body 4', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a'),
				('0a13e116-5dde-46fb-adaa-c61d5452540c', 'Ceruledge And Landorus', 'Pokemon Scarlet & Violet', 'Regulation B', '01BB5X', null, 'Body 5',  143,'69ca1315-b9ca-4e62-aadb-7dfef923cf1a'),
				('cc4191ac-f445-4e71-9235-96955d4ef08d', 'Ceruledge And Landorus', 'Pokemon Scarlet & Violet', 'Regulation B', '01BB5X', 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', 'Body 6', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a'),
				('608075ab-0b81-4e97-9b53-116e972573f0', 'Ceruledge And Landorus', 'Pokemon Scarlet & Violet', 'Regulation B', '01BB5X', 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', 'Body 7', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a'),
				('4e2d33a3-b822-4e7a-ae60-ee401e316bfe', 'Ceruledge And Landorus', 'Pokemon Scarlet & Violet', 'Regulation B', '01BB5X', null, 'Body 8', 143,'69ca1315-b9ca-4e62-aadb-7dfef923cf1a');
			`,
			sql`
			INSERT INTO "post"."pokemon" ("id", "species", "ability", "item", "moves", "nature", "hp_evs", "atk_evs", "def_evs", "spa_evs", "spd_evs", "speed_evs", "extra_data", "thread_id")
			VALUES
				('a6b9510e-692f-45ae-ac0f-b43f66e2e69d', 'Celebi', 'Natural Cure', 'Leftovers', ARRAY['Psychic', 'Giga Drain', 'Thunder Wave', 'Recover'], 'Bold', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('229eaaf0-dd33-445b-bee9-cb09095d9454', 'Landorus', 'Intimidate', 'Choice Scarf', ARRAY['Earthquake', 'U-turn', 'Stone Edge', 'Knock Off'], 'Jolly', 0, 252, 0, 0, 0, 252, '{"tera": "dark"}', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('f98bc98d-b1cd-44aa-aa6f-4cda966b4488', 'Jolteon', 'Volt Absorb', 'Choice Specs', ARRAY['Thunderbolt', 'Shadow Ball', 'Volt Switch', 'Hidden Power Ice'], 'Timid', 0, 0, 0, 252, 0, 252, '{"tera": "dark"}', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('73f3db1a-bf03-4e35-8a03-d7c74719db1e', 'Oranguru', 'Telepathy', 'Leftovers', ARRAY['Psychic', 'Focus Blast', 'Trick Room', 'Protect'], 'Quiet', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('24a8e24b-7ea0-4ebe-90ab-cfcbb1e1c1e3', 'Dragonite', 'Multiscale', 'Leftovers', ARRAY['Dragon Dance', 'Outrage', 'Earthquake', 'Roost'], 'Adamant', 252, 252, 4, 0, 0, 0, '{"tera": "dark"}', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('c7572d98-a188-4c3f-819a-1f54089f1a69', 'Ferrothorn', 'Iron Barbs', 'Leftovers', ARRAY['Stealth Rock', 'Leech Seed', 'Gyro Ball', 'Protect'], 'Relaxed', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('e52a3580-e610-4dbe-a012-e712ff6d1c5b', 'Celebi', 'Natural Cure', 'Leftovers', ARRAY['Psychic', 'Giga Drain', 'Thunder Wave', 'Recover'], 'Bold', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '99b2e008-25ed-403a-830d-01daef11daf4'),
				('50d76717-7d69-4f06-863a-eb2b0976a980', 'Landorus', 'Intimidate', 'Choice Scarf', ARRAY['Earthquake', 'U-turn', 'Stone Edge', 'Knock Off'], 'Jolly', 0, 252, 0, 0, 0, 252, '{"tera": "dark"}', '99b2e008-25ed-403a-830d-01daef11daf4'),
				('d2719624-a312-47db-a483-62bbffe3681a', 'Jolteon', 'Volt Absorb', 'Choice Specs', ARRAY['Thunderbolt', 'Shadow Ball', 'Volt Switch', 'Hidden Power Ice'], 'Timid', 0, 0, 0, 252, 0, 252, '{"tera": "dark"}', '99b2e008-25ed-403a-830d-01daef11daf4'),
				('7b6c28a6-cbc0-487e-9442-86ce0527aacf', 'Oranguru', 'Telepathy', 'Leftovers', ARRAY['Psychic', 'Focus Blast', 'Trick Room', 'Protect'], 'Quiet', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '99b2e008-25ed-403a-830d-01daef11daf4'),
				('8788cd74-f5d5-4e50-b380-c29f94d3e7c1', 'Togekiss', 'Serene Grace', 'Leftovers', ARRAY['Air Slash', 'Thunder Wave', 'Roost', 'Aura Sphere'], 'Modest',  252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '99b2e008-25ed-403a-830d-01daef11daf4'),
				('353788f0-f975-4a44-a1ea-6f453b60c1b2', 'Excadrill', 'Sand Rush', 'Focus Sash', ARRAY['Earthquake', 'Iron Head', 'Stealth Rock', 'Rapid Spin'], 'Jolly', 252, 252, 4, 0, 0, 0, '{"tera": "dark"}', '99b2e008-25ed-403a-830d-01daef11daf4'),
				('67339896-8814-409a-b811-2ac91e35d91b', 'Celebi', 'Natural Cure', 'Leftovers', ARRAY['Psychic', 'Giga Drain', 'Thunder Wave', 'Recover'], 'Bold', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '9e2419a6-ba95-4186-b9fd-bf76ee370c9d'),
				('ef941a64-bb05-4226-a9b1-011ac0e39397', 'Landorus', 'Intimidate', 'Choice Scarf', ARRAY['Earthquake', 'U-turn', 'Stone Edge', 'Knock Off'], 'Jolly', 0, 252, 0, 0, 0, 252, '{"tera": "dark"}', '9e2419a6-ba95-4186-b9fd-bf76ee370c9d'),
				('72430256-781e-4051-8ab5-6f621d1ceb30', 'Jolteon', 'Volt Absorb', 'Choice Specs', ARRAY['Thunderbolt', 'Shadow Ball', 'Volt Switch', 'Hidden Power Ice'], 'Timid', 0, 0, 0, 252, 0, 252, '{"tera": "dark"}', '9e2419a6-ba95-4186-b9fd-bf76ee370c9d'),
				('75ba7d2f-bc7e-4d51-9a56-11683eac95e8', 'Oranguru', 'Telepathy', 'Leftovers', ARRAY['Psychic', 'Focus Blast', 'Trick Room', 'Protect'], 'Quiet', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '9e2419a6-ba95-4186-b9fd-bf76ee370c9d'),
				('f1937c8c-244b-4da1-8590-4caaeae3ed73', 'Dragonite', 'Multiscale', 'Leftovers', ARRAY['Dragon Dance', 'Outrage', 'Earthquake', 'Roost'], 'Adamant', 252, 252, 4, 0, 0, 0, '{"tera": "dark"}', '9e2419a6-ba95-4186-b9fd-bf76ee370c9d'),
				('4bfb972e-a2fe-4840-b8ca-5409dfb4e684', 'Ferrothorn', 'Iron Barbs', 'Leftovers', ARRAY['Stealth Rock', 'Leech Seed', 'Gyro Ball', 'Protect'], 'Relaxed', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '9e2419a6-ba95-4186-b9fd-bf76ee370c9d'),
				('29d7b022-d81a-415a-a6a2-7f3bf9d81914', 'Celebi', 'Natural Cure', 'Leftovers', ARRAY['Psychic', 'Giga Drain', 'Thunder Wave', 'Recover'], 'Bold', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '46cfb007-ea14-4684-b4ea-27014bd5a5a8'),
				('eddae272-5730-450d-bf78-5b82549f6f6b', 'Landorus', 'Intimidate', 'Choice Scarf', ARRAY['Earthquake', 'U-turn', 'Stone Edge', 'Knock Off'], 'Jolly', 0, 252, 0, 0, 0, 252, '{"tera": "dark"}', '46cfb007-ea14-4684-b4ea-27014bd5a5a8'),
				('4e1a8e04-1482-455f-b2ce-bac0312651fb', 'Jolteon', 'Volt Absorb', 'Choice Specs', ARRAY['Thunderbolt', 'Shadow Ball', 'Volt Switch', 'Hidden Power Ice'], 'Timid', 0, 0, 0, 252, 0, 252, '{"tera": "dark"}', '46cfb007-ea14-4684-b4ea-27014bd5a5a8'),
				('1e0ef215-0678-4e7d-8f68-b761c8cba9ee', 'Oranguru', 'Telepathy', 'Leftovers', ARRAY['Psychic', 'Focus Blast', 'Trick Room', 'Protect'], 'Quiet', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '46cfb007-ea14-4684-b4ea-27014bd5a5a8'),
				('56fb98dd-5032-41f0-bcff-41909f865491', 'Togekiss', 'Serene Grace', 'Leftovers', ARRAY['Air Slash', 'Thunder Wave', 'Roost', 'Aura Sphere'], 'Modest', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '46cfb007-ea14-4684-b4ea-27014bd5a5a8'),
				('6757c20d-9125-4230-b04c-313c597ae03a', 'Excadrill', 'Sand Rush', 'Focus Sash', ARRAY['Earthquake', 'Iron Head', 'Stealth Rock', 'Rapid Spin'], 'Jolly', 252, 252, 4, 0, 0, 0, '{"tera": "dark"}', '46cfb007-ea14-4684-b4ea-27014bd5a5a8'),
				('3323ac2d-a0a8-48ed-824a-d89208603a24', 'Celebi', 'Natural Cure', 'Leftovers', ARRAY['Psychic', 'Giga Drain', 'Thunder Wave', 'Recover'], 'Bold', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '0a13e116-5dde-46fb-adaa-c61d5452540c'),
				('6eaab0de-ffb0-4147-8ddf-8acc7bc05fbf', 'Landorus', 'Intimidate', 'Choice Scarf', ARRAY['Earthquake', 'U-turn', 'Stone Edge', 'Knock Off'], 'Jolly', 0, 252, 0, 0, 0, 252, '{"tera": "dark"}', '0a13e116-5dde-46fb-adaa-c61d5452540c'),
				('97b91dd0-387b-4a81-9980-2ac509249b1b', 'Jolteon', 'Volt Absorb', 'Choice Specs', ARRAY['Thunderbolt', 'Shadow Ball', 'Volt Switch', 'Hidden Power Ice'], 'Timid', 0, 0, 0, 252, 0, 252, '{"tera": "dark"}', '0a13e116-5dde-46fb-adaa-c61d5452540c'),
				('26712af9-f9bc-42e5-9519-1aa28bec9668', 'Oranguru', 'Telepathy', 'Leftovers', ARRAY['Psychic', 'Focus Blast', 'Trick Room', 'Protect'], 'Quiet', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '0a13e116-5dde-46fb-adaa-c61d5452540c'),
				('c4d594db-2895-4110-b81d-b61f09567d47', 'Dragonite', 'Multiscale', 'Leftovers', ARRAY['Dragon Dance', 'Outrage', 'Earthquake', 'Roost'], 'Adamant', 252, 252, 4, 0, 0, 0, '{"tera": "dark"}', '0a13e116-5dde-46fb-adaa-c61d5452540c'),
				('8ebb8674-42c0-4f6c-9313-0a1347a1ce20', 'Ferrothorn', 'Iron Barbs', 'Leftovers', ARRAY['Stealth Rock', 'Leech Seed', 'Gyro Ball', 'Protect'], 'Relaxed', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '0a13e116-5dde-46fb-adaa-c61d5452540c'),
				('bd68d6db-23d3-45db-8c32-1fcf5b5a5d0c', 'Celebi', 'Natural Cure', 'Leftovers', ARRAY['Psychic', 'Giga Drain', 'Thunder Wave', 'Recover'], 'Bold', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', 'cc4191ac-f445-4e71-9235-96955d4ef08d'),
				('188124e2-6316-4c9b-a7f8-e6439855d14f', 'Landorus', 'Intimidate', 'Choice Scarf', ARRAY['Earthquake', 'U-turn', 'Stone Edge', 'Knock Off'], 'Jolly', 0, 252, 0, 0, 0, 252, '{"tera": "dark"}', 'cc4191ac-f445-4e71-9235-96955d4ef08d'),
				('bfc3f0e7-326c-4648-8ea4-ed6b14062b3c', 'Jolteon', 'Volt Absorb', 'Choice Specs', ARRAY['Thunderbolt', 'Shadow Ball', 'Volt Switch', 'Hidden Power Ice'], 'Timid', 0, 0, 0, 252, 0, 252, '{"tera": "dark"}', 'cc4191ac-f445-4e71-9235-96955d4ef08d'),
				('593b2919-299f-4b55-a8a0-b40241ece998', 'Oranguru', 'Telepathy', 'Leftovers', ARRAY['Psychic', 'Focus Blast', 'Trick Room', 'Protect'], 'Quiet', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', 'cc4191ac-f445-4e71-9235-96955d4ef08d'),
				('15abbe3a-6963-4fd0-b58e-628b520c330c', 'Togekiss', 'Serene Grace', 'Leftovers', ARRAY['Air Slash', 'Thunder Wave', 'Roost', 'Aura Sphere'], 'Modest', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', 'cc4191ac-f445-4e71-9235-96955d4ef08d'),
				('591b65ba-ff32-4742-8e7b-6e9768ddbe99', 'Excadrill', 'Sand Rush', 'Focus Sash', ARRAY['Earthquake', 'Iron Head', 'Stealth Rock', 'Rapid Spin'], 'Jolly', 252, 252, 4, 0, 0, 0, '{"tera": "dark"}', 'cc4191ac-f445-4e71-9235-96955d4ef08d'),
				('f27b7c6d-dac4-482b-95d8-edbf7fc6f0ba', 'Celebi', 'Natural Cure', 'Leftovers', ARRAY['Psychic', 'Giga Drain', 'Thunder Wave', 'Recover'], 'Bold', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '608075ab-0b81-4e97-9b53-116e972573f0'),
				('b03afe9e-448a-4999-b682-2d5c474b7865', 'Landorus', 'Intimidate', 'Choice Scarf', ARRAY['Earthquake', 'U-turn', 'Stone Edge', 'Knock Off'], 'Jolly', 0, 252, 0, 0, 0, 252, '{"tera": "dark"}', '608075ab-0b81-4e97-9b53-116e972573f0'),
				('cfb28b8e-e3ce-47b6-b413-1c318b52dd6a', 'Jolteon', 'Volt Absorb', 'Choice Specs', ARRAY['Thunderbolt', 'Shadow Ball', 'Volt Switch', 'Hidden Power Ice'], 'Timid', 0, 0, 0, 252, 0, 252, '{"tera": "dark"}', '608075ab-0b81-4e97-9b53-116e972573f0'),
				('5277d24c-b1bf-48b9-b21a-bd2005e8daab', 'Oranguru', 'Telepathy', 'Leftovers', ARRAY['Psychic', 'Focus Blast', 'Trick Room', 'Protect'], 'Quiet', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '608075ab-0b81-4e97-9b53-116e972573f0'),
				('344a0cb6-f647-417b-b8ee-f62c11cba8e0', 'Dragonite', 'Multiscale', 'Leftovers', ARRAY['Dragon Dance', 'Outrage', 'Earthquake', 'Roost'], 'Adamant', 252, 252, 4, 0, 0, 0, '{"tera": "dark"}', '608075ab-0b81-4e97-9b53-116e972573f0'),
				('f7e20c6c-3f46-4730-9e04-df4e3cc50bfd', 'Ferrothorn', 'Iron Barbs', 'Leftovers', ARRAY['Stealth Rock', 'Leech Seed', 'Gyro Ball', 'Protect'], 'Relaxed', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '608075ab-0b81-4e97-9b53-116e972573f0'),
				('3058ae60-9b4e-4a89-ac77-694b220b09d0', 'Celebi', 'Natural Cure', 'Leftovers', ARRAY['Psychic', 'Giga Drain', 'Thunder Wave', 'Recover'], 'Bold', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '4e2d33a3-b822-4e7a-ae60-ee401e316bfe'),
				('7c29e64f-ae4f-4ba1-8986-39fc181501b1', 'Landorus', 'Intimidate', 'Choice Scarf', ARRAY['Earthquake', 'U-turn', 'Stone Edge', 'Knock Off'], 'Jolly', 0, 252, 0, 0, 0, 252, '{"tera": "dark"}', '4e2d33a3-b822-4e7a-ae60-ee401e316bfe'),
				('d4fab6df-6d20-42da-915a-c95c53a879b6', 'Jolteon', 'Volt Absorb', 'Choice Specs', ARRAY['Thunderbolt', 'Shadow Ball', 'Volt Switch', 'Hidden Power Ice'], 'Timid', 0, 0, 0, 252, 0, 252, '{"tera": "dark"}', '4e2d33a3-b822-4e7a-ae60-ee401e316bfe'),
				('834315ec-af2b-46aa-9712-8d0c149156ef', 'Oranguru', 'Telepathy', 'Leftovers', ARRAY['Psychic', 'Focus Blast', 'Trick Room', 'Protect'], 'Quiet', 252, 0, 252, 0, 0, 0, '{"tera": "dark"}', '4e2d33a3-b822-4e7a-ae60-ee401e316bfe'),
				('b736921a-3e5f-4315-8cee-5ea76510ef66', 'Togekiss', 'Serene Grace', 'Leftovers', ARRAY['Air Slash', 'Thunder Wave', 'Roost', 'Aura Sphere'], 'Modest', 252, 0, 252, 4, 252, 0, '{"tera": "dark"}', '4e2d33a3-b822-4e7a-ae60-ee401e316bfe'),
				('c47d04a8-8e12-4f0a-ae6c-5028fe5b3583', 'Excadrill', 'Sand Rush', 'Focus Sash', ARRAY['Earthquake', 'Iron Head', 'Stealth Rock', 'Rapid Spin'], 'Jolly', 252, 252, 4, 0, 0, 0, '{"tera": "dark"}', '4e2d33a3-b822-4e7a-ae60-ee401e316bfe');
			`,
			sql`
			INSERT INTO "post"."comment" ("id", "body", "upvotes", "user_id", "parent_comment_id", "thread_id")
			VALUES
				('a7caa899-9d82-4279-bf96-933c3d0c2f8e', 'Comment 1', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a', NULL, 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('456cb252-0c63-4db8-9407-478a5d57679a', 'Comment 2', 143, '9dd2ed8c-f19d-42dc-b11e-0f9f5f623464', '456cb252-0c63-4db8-9407-478a5d57679a', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('a76a9954-e91a-4c82-91fe-b4a6e8c30c57', 'Comment 3', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a', '456cb252-0c63-4db8-9407-478a5d57679a', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('00fd49a8-9923-4e2b-907c-28d9ac3bc99b', 'Comment 4', 143, '9dd2ed8c-f19d-42dc-b11e-0f9f5f623464', 'a76a9954-e91a-4c82-91fe-b4a6e8c30c57', 'f0c71094-dbce-4e50-b143-36e791a04337'),
				('97b22b8a-360a-4e8f-b9ec-b9f57f04e7bb', 'Comment 5', 143, '69ca1315-b9ca-4e62-aadb-7dfef923cf1a', null, 'f0c71094-dbce-4e50-b143-36e791a04337');
			
			`,
		]);
		return Response.json(response);
	} catch (err) {
		console.log(err);
		return Response.json({ msg: 'err' });
	}
}
