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

	@CreateDateColumn({ type: 'timestamp without time zone', default: new Date()})
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp without time zone' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamp without time zone' })
	deleted_at: Date;
}
