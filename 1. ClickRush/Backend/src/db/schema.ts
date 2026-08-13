//Idhar tables define honge

import { pgTable, uuid, varchar, text, boolean, timestamp, integer} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', {length: 20}).notNull(),
    lastName: varchar('last_name', {length: 20}),
    userName: varchar('user_name', {length: 30}).unique(),
    email: varchar('email', {length: 322}).notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    password: varchar('password', {length: 66}),
    salt: text('salt'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

export const gamesTable = pgTable('games', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(()=> usersTable.id),       //games.user_id == users.id
    score: integer('score').notNull(),
    playedAt: timestamp('played_at').defaultNow().notNull()
})