/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE EXTENSION "uuid-ossp";

    CREATE SCHEMA "auth";
    
    CREATE SCHEMA "post";
    
    CREATE TABLE "auth"."user" (
      "id" UUID NOT NULL default uuid_generate_v4(),
      "username" TEXT UNIQUE NOT NULL,
      constraint "auth_user_pkey" PRIMARY KEY (id)
    );
    
    CREATE TABLE "auth"."session" (
      "id" UUID NOT NULL,
      "expires_at" TIMESTAMPTZ NOT NULL,
      "user_id" UUID NOT NULL,
      constraint "auth_session_pkey" PRIMARY KEY (id),
      constraint "auth_session_user_id_fkey" foreign key ("user_id") references "auth"."user" on update cascade on delete cascade
    );
    
    CREATE TABLE "post"."thread" (
      "id" UUID NOT NULL default uuid_generate_v4(),
      "title" TEXT NOT NULL,
      "series" TEXT NOT NULL,
      "format" TEXT NOT NULL,
      "rental_code" TEXT,
      "description" TEXT,
      "body" TEXT,
      "upvotes" INTEGER,
      "created_at" TIMESTAMPTZ DEFAULT (now()),
      "updated_at" TIMESTAMPTZ DEFAULT (now()),
      "user_id" UUID NOT NULL,
      constraint "post_thread_pkey" PRIMARY KEY (id),
      constraint "post_thread_user_id_fkey" foreign key ("user_id") references "auth"."user" on update cascade on delete cascade
    );
    
    CREATE TABLE "post"."pokemon" (
      "id" UUID NOT NULL default uuid_generate_v4(),
      "species" TEXT NOT NULL,
      "ability" TEXT NOT NULL,
      "item" TEXT,
      "moves" TEXT[],
      "nature" TEXT NOT NULL,
      "hp_evs" SMALLINT,
      "atk_evs" SMALLINT,
      "def_evs" SMALLINT,
      "spa_evs" SMALLINT,
      "spd_evs" SMALLINT,
      "speed_evs" SMALLINT,
      "hp_ivs" SMALLINT,
      "atk_ivs" SMALLINT,
      "def_ivs" SMALLINT,
      "spa_ivs" SMALLINT,
      "spd_ivs" SMALLINT,
      "speed_ivs" SMALLINT,
      "extra_data" JSONB,
      "thread_id" UUID NOT NULL,
      constraint "post_pokemon_pkey" PRIMARY KEY (id),
      constraint "post_pokemon_thread_id_fkey" foreign key ("thread_id") references "post"."thread" on update cascade on delete cascade
    );
    
    CREATE TABLE "post"."comment" (
      "id" UUID NOT NULL default uuid_generate_v4(),
      "body" TEXT NOT NULL,
      "upvotes" INTEGER,
      "created_at" TIMESTAMPTZ DEFAULT (CURRENT_TIMESTAMP),
      "updated_at" TIMESTAMPTZ DEFAULT (now()),
      "user_id" UUID NOT NULL,
      "parent_comment_id" UUID,
      "thread_id" UUID NOT NULL,
      constraint "post_comment_pkey" PRIMARY KEY (id),
      constraint "post_comment_user_id_fkey" foreign key ("user_id") references "auth"."user" on update cascade on delete cascade,
      constraint "post_pokemon_parent_comment_id_fkey" foreign key ("parent_comment_id") references "post"."comment" on update cascade on delete cascade,
      constraint "post_comment_thread_id_fkey" foreign key ("thread_id") references "post"."thread" on update cascade on delete cascade
    );
  `)
};

exports.down = pgm => {
  pgm.sql(`
    -- Drop tables
    DROP TABLE IF EXISTS "post"."comment";
    DROP TABLE IF EXISTS "post"."pokemon";
    DROP TABLE IF EXISTS "post"."thread";
    DROP TABLE IF EXISTS "auth"."session";
    DROP TABLE IF EXISTS "auth"."user";
    
    -- Drop schemas
    DROP SCHEMA IF EXISTS "post" CASCADE;
    DROP SCHEMA IF EXISTS "auth" CASCADE;
    
    -- Drop extension
    DROP EXTENSION IF EXISTS "uuid-ossp";
  `)
};
