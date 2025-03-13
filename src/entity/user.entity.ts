import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'character varying', length: 255, nullable: false })
	first_name: string;

	@Column({ type: 'character varying', length: 255, nullable: false })
	last_name: string;

	@Column({ type: 'character varying', length: 255, nullable: false })
	email: string;

	@Column({ type: 'character varying', length: 255, nullable: false })
	password: string;

	@CreateDateColumn({ type: 'time without time zone' })
	created_at: Date;

	@UpdateDateColumn({ type: 'time without time zone' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'time without time zone' })
	deleted_at: Date;
}
